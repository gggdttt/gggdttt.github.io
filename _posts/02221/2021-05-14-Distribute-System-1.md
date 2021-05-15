---
title: Distributed Systems: Models and Design
tags: Distributed Systems
article_header:
  type: cover

---



## Distributed Systems: Models and Design

### 1.What is an architectural model of a distributed system?

An **architectural  model**  is  concerned  with  the placement  of  its  components and the relationships between them.

Like :

* client-server systems
* peer-to-peer systems

The architecture  of  a  system  is its  structure  in  terms  of  separately  specified components and their interrelationships.



### 2.What is a fundamental model of a distributed system?

Fundamental  models are  concerned  with  a  **more abstract  description**  of  the properties that are common in all of the architectural models.

**Fundamental** building blocks (and 4 key questions):

* Communicating entities: what are the entities that are communicating in the distributed system? 

* Communication  paradigms: how  do  these  entities  communicate,  or, more specifically, what communication paradigm is used? 

* Roles   and   responsibilities: what   (potentially   changing)   roles   and responsibilities do these entities have in the overall architecture? 

* Placement: how are these entities mapped on to the physical distributed infrastructure (i.e. , what is their placement)



###  3.What is the difference between an architectural model and a fundamental model of a distributed system?

> Architectural model would be more concrete including placement and relationships of components.
>
> But fundamental model would be an abstract description over fundamental model.



### 4.What is a process in a distributed system?

**Communicating entities** are processes.

In  most  distributed  environments,  processes  are  supplemented  by **threads**  (lightweight  processes),  so,  strictly  speaking,  it  is  threads  that are endpoints of communication.

### 5.What is a communication paradigm?

3 types of communication paradigm (cont.):

* interprocess communication 
  * low level support for communication between processes in the distributed system,   including   message-passing   primitives,   socket   programming, multicast communication

* remote invocation

  * most  common  communication  paradigm,  based  on  a two-way  exchange between  communicating  entities  and  resulting  in  the calling  of  a  remote operation (procedure or method)

* indirect communication

  communication is indirect, through a third entity, allowing a strong degree of decoupling between senders and receivers, in particular:

  * **space uncoupling**: senders do not need to know who they are sending to
  * **time  uncoupling**:  senders  and  receivers  do  not  need  to  exist  at  the same time

### 6.Can you name some examples of different communication paradigms?

![image-20210514233804085](https://raw.githubusercontent.com/gggdttt/ImageBeds/master/image-20210514233804085.png)

### 7.What is a client server system?

![image-20210514234255155](https://raw.githubusercontent.com/gggdttt/ImageBeds/master/image-20210514234255155.png)

### 8.What is a P2P system?

* All the processes involved in a task or activity play similar roles, interacting cooperatively as peers  without any  distinction  between  client and  server  processes  or  the  computers  that they run on.
* In  practical  terms, all  peers  run  the  same program and offer the same set of interfaces to each other.

> The aim  of  the  P2P  architecture  is to  exploit  the  resources  (both  data  and hardware)  in  a  large  number  of  participating  computers  for  the  fulfilment  of  a given task or activity.

### 9.What is the main difference between client server systems and P2P systems, in terms of architectural style?

In C-S system all clients connect to the server but in p2p all peers could provide service.

### 10.What is the difference between synchronous and asynchronous distributed systems?

SYN:

* the time  to  execute  each  step  of  a  process  has  known  lower  and  upper bounds

* each message  transmitted  over  a  channel  is received  within  a  known bounded time

* each process has a local clock whose drift rate from real time has a known bound

ASY:

* process execution speeds: each step may take an arbitrarily long time

* message  transmission  delays:  a  message  may  be  received  after  an arbitrarily long time
* clock drift rates: the drift rate of a clock is arbitrary

Differences:

* whether have a message transmission delay
* whether local clock is precise
* the time of executing each step

### 11.Can you describe some design challenges for distributed systems?

* Heterogeneity of Components (差异性)

  * Enormous differences in resources across tiers
  * Many programming languages, OSes, platforms, networks, ...
  * Specialized hardware

* Openness

  * The openness  of  a  computer  system  is the  characteristic  that  determines whether the system can be extended and 

    re-implemented in various ways.

  * In distributed  systems  it  is  determined  primarily  by  the degree  to  which  new resource  sharing  services  can  be  added  and  be  made  available  for  use  by  a variety of client programs

  * Open distributed systems may be extended

* Scalability

  * A  system  is scalable  if it  will  remain  effective  when  there  is  a  significant increase in the number of resources and the number of users 
  * The Internet  provides  an  illustration  of  a  distributed  system  in  which the number of computers and services has increased dramatically

* Security

  ![image-20210515014524456](https://raw.githubusercontent.com/gggdttt/ImageBeds/master/image-20210515014524456.png)

  

### 12.What is failure model in distributed systems?

The **failure  model**  defines *<u>the  ways  in  which  failures  may  occur</u>*  in  order  to provide an understanding of **the effects of failures**.

### 13.Can you name some examples of taxonomy of failures?

* Omission  failures:  a  process  or  communication  channel  fails  to  perform actions that it is supposed to do

  ![image-20210515014903258](https://raw.githubusercontent.com/gggdttt/ImageBeds/master/image-20210515014903258.png)

* Arbitrary failures: any type of error may occur

* Timing failures: applicable in synchronous distributed systems

### 14.What is transparency? (similar question for all the other design challenges)

* Concurrency

  * Both  services  and  applications  provide  resources  that  can  be  shared  by different clients in a distributed system
  * There  is  therefore  a  possibility  that several clients   will   attempt   to   access   a shared resource at the same time
  * Each   resource   (servers,   Web   resources objects in applications, ...) must be designed to be safe in a concurrent environment

* Transparency

  *  The   concealment   from   the   user   and   the   application programmer of the separation of components in a distributed system, so that the system  is perceived  as  a  whole  rather  than  a  collection  of  independent components.
  * Aim: to  make  certain  aspects  of  distribution invisible  to  the  application programmer  so  that  they  need  only  be  concerned  with the  design  of  their particular application

  