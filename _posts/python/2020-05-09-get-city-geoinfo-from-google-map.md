---
title: Use python to get geodata from Google Map of a concrete city
tags: Python GoogleMap
article_header:
  type: cover
---





> I refer to the index of googleplaces : https://googlemaps.github.io/google-maps-services-python/docs/index.html
>
> You could also find a lot of other useful function there.



## Install the google maps

```shell
pip install -U googlemaps
```



## Initiate Google Map Client

```python
# make sure in your env, there are necessary libs.

import googlemaps

import time

import pandas as pd

google_maps_key = '{your token here}'

gmaps = googlemaps.Client(google_maps_key)
```

## Get data from Google Map 

What I want to tell readers and it really makes me confused for quite a long time is : <u>Google Map can provide **at most 60 results** once!!!!</u>

No way can change this rule except you are willing to pay for its service.

What's more, pls remember to add `time.sleep(5)` between every `next page` request(because every page there are only at most 20 results and you can only request next page at most 3 times. That is why we can only get at most 60 results)

```python
###########################gmaps.places####################################
#  _add_result_to_df is used to add the most 60 results to the dataframe 
# @ data_df,there is a limitation in Google_map, so it is really a pity to get all the data from 
# @ data_df: the dataframe used to save detailed information
# @ params: 
def _add_result_to_df(data_df,params):
    while  True:
        x = gmaps.places(**params)
        # print (x['results'][0]['name'])
        print (len(x['results']))
        time.sleep(2)
        if 'next_page_token' in x:
            params['page_token'] = x['next_page_token']
            for item in x['results']:
                data_df = data_df.append({'name': item['name'], 'lat': item['geometry']['location']['lat'],
                 'lng': item['geometry']['location']['lng'],'type':params['query']}, ignore_index=True)
        else:
            for item in x['results']:
                data_df = data_df.append({'name': item['name'], 'lat': item['geometry']['location']['lat'], 
                'lng': item['geometry']['location']['lng'],'type':params['query']}, ignore_index=True)
            break
    return data_df
    
# query_google_map is used to search for a concrete text like "school in Copenhagen"
# @ query_text: the content of what you want to search 
# TIP: the maxium length is 60 limited by GoogleMap
def query_google_map(query_text):
    data = pd.DataFrame(columns=['name','lat','lng','type'])
    params = {
        'query': query_text
    }
    data = _add_result_to_df(data,params)
    return data

# ######################gmaps.places_autocomplete####################################
def _add_detail_and_sum_result(data_detail,data_sum,params):
    count = 0
    while  True:
        x = gmaps.places_autocomplete(**params)
        print(x)
        count += len(x)
        # print (x['results'][0]['name'])
        time.sleep(2)
        if 'next_page_token' in x:
            params['page_token'] = x['next_page_token']
            for item in x:
                data_detail = data_detail.append(
                    {'name':item['description'],
                    'type':params['input_text'],
                    'lat_based':params['location']['lat'],
                    'lng_based':params['location']['lng']}, ignore_index=True)
        else:
            for item in x:
                data_detail = data_detail.append(
                    {'name':item['description'],
                    'type':params['input_text'],
                    'lat_based':params['location']['lat'],
                    'lng_based':params['location']['lng']}, ignore_index=True)
            break

    data_sum = data_sum.append(
                    {
                        'lat_based':params['location']['lat'],
                        'lng_based':params['location']['lng'],
                        'type':params['input_text'],
                        'sum':count
                    },ignore_index=True
                )
    return data_detail,data_sum    

# query_with_lat_lng_radius_type is used 
def places_autocomplete_with_lat_lng_radius_type(lat,lng,radius,query_text):
    data_detail = pd.DataFrame(columns=['name','type','lat_based','lng_based'])
    data_sum = pd.DataFrame(columns=['lat_based','lng_based','type','sum'])
    params = {
        'input_text': query_text,
        'location':{"lat": lat, "lng": lng},
        'radius': radius,
        'strict_bounds':True
    }
    data_detail,data_sum = _add_detail_and_sum_result(data_detail,data_sum,params)
    return data_detail,data_sum


# ############################gmaps.places####################################
# the type of google_map:https://developers.google.com/maps/documentation/places/web-service/supported_types
def _add_result_to_df_unique(data_df,params):
    while  True:
        x = gmaps.places(**params)
        time.sleep(2)
        if 'next_page_token' in x:
            params['page_token'] = x['next_page_token']
            for item in x['results']:
                temp_list = {
                    'name': item['name'], 
                    'lat': item['geometry']['location']['lat'],
                    'lng': item['geometry']['location']['lng'],
                    'type':params['query']
                    }
                if not ((data_df['name'] == temp_list['name'])&(data_df['lat'] == temp_list['lat'])&(data_df['lng'] == temp_list['lng'])).any():
                    data_df = data_df.append(temp_list, ignore_index=True)
        else:
            for item in x['results']:
                temp_list = {
                    'name': item['name'], 
                    'lat': item['geometry']['location']['lat'],
                    'lng': item['geometry']['location']['lng'],
                    'type':params['query']
                    }
                if not ((data_df['name'] == temp_list['name'])&(data_df['lat'] == temp_list['lat'])&(data_df['lng'] == temp_list['lng'])).any():
                    data_df = data_df.append(temp_list, ignore_index=True)
            break
    return data_df

# data = pd.DataFrame(columns=['name','lat','lng','type'])
def query_place_with_lat_lng_type(lat,lng,result_data):
    params = {
        'query': address_type,
        'location':{"lat": lat, "lng": lng}
    }
    result_data = _add_result_to_df_unique(result_data,params)
    return result_data


# ########################gmaps.places_nearby############################
def _add_nearby_result_to_df(result_data,params):
    while  True:
        x = gmaps.places_nearby(**params)
        time.sleep(2)
        if 'next_page_token' in x:
            params['page_token'] = x['next_page_token']
            for item in x['results']:
                temp_list = {
                    'name': item['name'], 
                    'lat': item['geometry']['location']['lat'],
                    'lng': item['geometry']['location']['lng'],
                    'type':item['types']
                    }
                if not ((result_data['name'] == temp_list['name'])&(result_data['lat'] == temp_list['lat'])&(result_data['lng'] == temp_list['lng'])).any():
                    result_data = result_data.append(temp_list, ignore_index=True)
        else:
            for item in x['results']:
                temp_list = {
                    'name': item['name'], 
                    'lat': item['geometry']['location']['lat'],
                    'lng': item['geometry']['location']['lng'],
                    'type':item['types']
                    }
                if not ((result_data['name'] == temp_list['name'])&(result_data['lat'] == temp_list['lat'])&(result_data['lng'] == temp_list['lng'])).any():
                    result_data = result_data.append(temp_list, ignore_index=True)
            break
    return result_data



def nearby_with_lat_lng_radius(lat,lng,radius,result_data):
    params = {
        'radius': radius,
        'location':{"lat": lat, "lng": lng}
    }
    result_data = _add_nearby_result_to_df(result_data,params)
    return result_data

```

## Send Request and write to Csv

```python
df_search_result = pd.DataFrame(columns=['name','lat','lng','type'])
# df_search_result = nearby_with_lat_lng_radius(55.708,12.569,300,df_search_result)
# df_search_result = nearby_with_lat_lng_radius(55.657,12.568,300,df_search_result)

for i in range(101,1000):
    # print(df_geo.loc[i,:][2],df_geo.loc[i,:][1])
    print(i)
    df_search_result = nearby_with_lat_lng_radius(df_geo.loc[i,:][2],df_geo.loc[i,:][1],300,df_search_result)
    if (i%100==0 and i != 0):
        time.sleep(5)
        print("len:",len(df_search_result))
        df_search_result.to_csv("search_result_101_1000.csv",index=False,mode='w+')
        print('write success!')
```



The example I got is :

![image-20210509194449665](https://raw.githubusercontent.com/gggdttt/ImageBeds/master/image-20210509194449665.png)