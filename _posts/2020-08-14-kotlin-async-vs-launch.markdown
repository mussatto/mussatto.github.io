---
layout: post
title:  "Kotlin - async vs launch and returning value"
date:   2020-08-14 13:00:00
categories: kotlin async launch
---

"Stuff I always forget how to do and have to google it"

The main difference between async vs launch is that async can return a value and launch cannot

## On Async statement

```kotlin

runBlocking {
    val job = async {
        println("Running on the background!")
        Thread.sleep(1000)
        "this is done!"
    }

    println("Response is ${job.await()}")
}

```

This will print "Response is this is done!"

## Similar thing on Launch statement

```kotlin

runBlocking {
    val job = launch {
        println("Running on the background!")
        Thread.sleep(1000)
        // "this is done!" -> useless statement :(
    }

    // -- await() doesn't work :(
    // println("Response is ${job.await()}") 
    job.join()
}

```

## How to return a value from launch statement

It is some extra work but can be done, check previous channels post about this:

[Returning Values From Launch](http://mussatto.github.io/kotlin/channel/coroutine/consumer/queue/2020/08/13/kotlin-channels.html)

Source code: [Here](https://github.com/mussatto/kotlinlab/blob/master/src/test/kotlin/mussatto/lab/AsyncLaunchTest.kt)