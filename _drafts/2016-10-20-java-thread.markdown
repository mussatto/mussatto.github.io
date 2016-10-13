---
layout: post
title:  "Java - Threads"
date:   2016-10-13 00:00:00
categories: java threads
---

This post I will show the basics of Java Threads, excluding the executors framework (executors framework will be in a future post).



### Extend Thread

```java

package com.thread;


public class SayHelloExtend extends Thread {
    @Override
    public void run(){
        System.out.println("I am extending a thread!");
    }
}

```

### Implement Runnable

```java

package com.thread;

public class SayHelloImplement implements Runnable{
    private int i;
    public SayHelloImplement(){

    }
    public SayHelloImplement(int i){
        this.i = i;
    }
    public void run() {
        System.out.println("I am implementing Runnable:"+i);
    }

}

```


### Thread States

-  NEW - A thread that has not yet started is in this state.
-  RUNNABLE - A thread executing in the Java virtual machine is in this state.
-  BLOCKED - A thread that is blocked waiting for a monitor lock is in this state.
-  WAITING - A thread that is waiting indefinitely for another thread to perform a particular action is in this state.
-  TIMED_WAITING - A thread that is waiting for another thread to perform an action for up to a specified waiting time is in this state.
-  TERMINATED - A thread that has exited is in this state.
