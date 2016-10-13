---
layout: post
title:  "Java - Threads"
date:   2016-10-14 00:00:00
categories: java threads
---

This post contains samples and considerations about the basics of Java Threads, excluding the executors framework (executors framework will be in a future post).

The code will cover the two ways to create and run threads and a small test on how to start them.

### Extend Thread

The first way to create a thread is extending the Thread class and overriding the run method:

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

The second way to create e thread is to implement the Runnable interface.

This is the recommended way to create a Thread since it, since its less tightly coupled and is more flexible since Java doesn't allow multiple inheritance.

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

### Java 8 Lambda class

This is a new feature / way to create a inner class that implements the Runnable interface.

Does the same thing as the method above.

```java

Runnable task = () -> {
    System.out.println("I am saying hello in a Java 8 style");
};

```

Which is the same as:

```java
Runnable task = new Runnable() {
    @Override
    public void run() {
        System.out.println("I am saying hello in a Java");
    }
};

```

### Test code

For the test code lets create a class with a main method that starts each implementation.

An attention point here is that we have to call the start method. If we call the run method its going to be a blocking call.

For the SayHelloImplement, we must create a new Thread object and pass the SayHelloImplement object as the constructor argument.

```java
package com.thread;


public class ThreadStarter {

    public static void main(String[] args){
        SayHelloExtend extend = new SayHelloExtend();
        extend.start();

        SayHelloImplement implement = new SayHelloImplement();
        Thread thread = new Thread(implement);

        thread.start();

        // Java 8 style
        Runnable task = () -> {
            System.out.println("I am saying hello in a Java 8 style");
        };

        Thread newJavaWayThread = new Thread(task);

        newJavaWayThread.start();

        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}

```

### Thread States

Just for reference, I will add here the thread states:

-  NEW - A thread that has not yet started is in this state.
-  RUNNABLE - A thread executing in the Java virtual machine is in this state.
-  BLOCKED - A thread that is blocked waiting for a monitor lock is in this state.
-  WAITING - A thread that is waiting indefinitely for another thread to perform a particular action is in this state.
-  TIMED_WAITING - A thread that is waiting for another thread to perform an action for up to a specified waiting time is in this state.
-  TERMINATED - A thread that has exited is in this state.

### Useful links

[Oracle documentation on threads and process](https://docs.oracle.com/javase/tutorial/essential/concurrency/procthread.html)

[Thread Javadoc](https://docs.oracle.com/javase/7/docs/api/java/lang/Thread.html)

### The code

[Link to Github](https://github.com/mussatto/JavaLab/tree/master/src/main/java/com/thread)
