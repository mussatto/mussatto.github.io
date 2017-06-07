---
layout: post
title:  "Java 8 - New Features : Lambda"
date:   2017-06-06 22:00:00
categories: java 8 new features
---

This post has the intention of exploring new Java 8 features like Lambda.

#### Lambda Expressions
Is a feature already present in other languages, and this enables us to write more readable code in Java.
Grants us the hability to express more with less lines of code.

#### Variables in Lambda
An important thing to say is that variables used in lambda should be final. 
This means for example that the following is NOT allowed:

```java
Integer mySum =0;
numbers.forEach( i -> mySum = mySum+ i); //Not allowed!
```

So in practice, we are not allowed to change the object, but we can change the state of the object:

Example - sum all integers of an list using forEach

```java
package lab.j8;

public class Counter {

    private long sum=0;

    public void add(int value){
        this.sum += value;
    }

    public long getSum() {
        return sum;
    }
}
```

Then this is allowed:

```java
Counter counter = new Counter();
numbers.forEach( i -> counter.add(i));
```
or written in another, using object reference:

```java
Counter counter = new Counter();
numbers.forEach(counter::add);
System.out.println(counter.getSum());
```

### What is a lambda class in practice?

If we check the forEach javadoc, we are going to see the following:

```java
default void forEach(Consumer<? super T> action) {
    Objects.requireNonNull(action);
    for (T t : this) {
        action.accept(t);
    }
}
```

And accept is a method from the Consumer interface.

So, behind the scenes the lambda class is the same as:

```java
Counter newCounter = new Counter();
numbers.forEach(new Consumer<Integer>(){
    @Override
    public void accept(Integer integer) {
        newCounter.add(integer);
    }
});
System.out.println(newCounter.getSum());
```
Which ends up being a nicer way to write inner classes (there are differences, but is not to be considered in this post)


### From java / oracle definition:
Lambda expressions let you express instances of single-method interfaces (referred to as functional interfaces) more compactly.

### The code repo

[Github Link](https://github.com/mussatto/java8lab/blob/master/src/test/java/lab/j8/LambdaTest.java)