---
title: How to push the file(>=100M) to github
tags: git
article_header:
  type: cover
---





> Now days I want to push some file of '.weight' to github. But almost all of them are over the maximum size(100M) of Github. Here is my solution to cope with this problem: 

Ref：
https://towardsdatascience.com/uploading-large-files-to-github-dbef518fa1a
https://blog.csdn.net/Tyro_java/article/details/53440666

### Step1.Install git-lfs

1. 先在web建立一个空仓库

2. 然后建立跟仓库名一样的文件夹，并执行初始化命令：`git init`

3. 然后执行`git lfs install`

4. 然后添加你要上传的文件名或后缀名：`git lfs track '*.zip'`

5. 然后就把生成的

   ```
   .gitattributes
   ```

   先传到远程仓库

   1. `git add .gitattributes`
   2. `git commit -m 'large - init file'`
   3. `git push -u origin master` # 第一次要这样执行，后面再传就`git push`就行。

6. 然后就可以正常添加上传大文件了！

   1. `git add bigfile.zip`
   2. `git commit -m 'upload Big file.'`
   3. `git push` # 第一次要这样执行，后面再传就`git push`就行。

------

- 删除远程仓库文件，但本地文件不删除，如

  ```
  bigfile.zip
  ```

  - `git rm bigfile.zip`
  - `git commit -m 'rm bigfile.zip'`
  - `git push`

[End]()

{:.info}  
