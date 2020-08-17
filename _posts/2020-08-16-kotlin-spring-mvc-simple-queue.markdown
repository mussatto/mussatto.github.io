---
layout: post
title:  "Kotlin - Spring MVC queueing requests with channel"
date:   2020-08-16 13:00:00
categories: kotlin spring mvc queue channel
---

## Why?

One common thing I have on my projects is when the application scales up some kind of async processing needs to be done.

The steps for this are usually:

- Check the request for proper Authority and Roles
- Request is Validated
- The request is put into some queue (JMS, RabbitMQ, Pubsub) and an uuid for this request is given to the client
- Some other background process (or even application) reads from the queue and process it
- The response is sent to a response queue
- The client fetches the response using the uuid

I always hated is setting up the queueing system since it requires a lot of operation investment. Setting up a dedicated server, choosing the queueing system, installing it, etc.

In some workplaces/companies setting up this system could take MONTHS, even YEARS.

I decided to work on this simple POC just to see if it is possible to implement some dumb queue using channels.

There are many downsides of this:
- everything is in memory, if the system goes down you loose all the non processed messages!
- no retry
- no error mitigation

## How?

I will use: Kotlin + Channels + Spring MVC

## Create a Spring Component to hold the channel

```kotlin

@Component
class ChannelComponent {
    val channelMessage = Channel<String>(5)

    @PreDestroy
    fun preDestroy(){
        channelMessage.close()
        println("channel closed")
    }
}


```

## Create a Spring Component to read from the channel

To emulate a slow and complex process I will add a Thread.sleep.

```kotlin

@Component
class ChannelListenerBean(val channelComponent: ChannelComponent): InitializingBean {
    override fun afterPropertiesSet() {
        GlobalScope.launch{
            for(message in channelComponent.channelMessage){
                // THIS IS SLOOOOOW, that is why we need an async process!
                Thread.sleep(5000)
                println("The message is $message")
            }
        }
    }
}

```

## Create the Controller to receive messages

Yea, not really REST but this is good enough for testing.

```kotlin

@RestController
class TestController(val channelComponent: ChannelComponent) {

    @GetMapping("/async")
    fun ShouldProcessAsync(@RequestParam message: String): String {

        runBlocking {
            channelComponent.channelMessage.send("Sending Message!")
            println("Message sent!")
        }

        return "Enqueued!"
    }
}

```

## Test it using curl... or postman... or the browser

```bash

curl http://localhost:8080/async?message=I_AM_AWESOME

```

You should see a couple of messages on the console stating "Message sent!", and after 5 seconds "The message is I_AM_AWESOME"

If you trigger the curl more than 5 times, you should see that the request is stuck for a while - this indicates that the "Queue" is full.

## Tuning up by setting more readers / workers in parallel

First create a class for workers and give it a name for tracing:

```kotlin

class ChannelWorkerReader(val channel: Channel<String>, val workerName:String){
    suspend fun doIt(){
        for (message in channel) {
            // THIS IS SLOOOOOW, that is why we need an async process!
            Thread.sleep(5000)
            println("${workerName}: The message is $message")
        }
    }
}

```

Second spawn one coroutine/thread per defined worker:

```kotlin

@Component
class ChannelListenerWorkersBean(val channelComponent: ChannelComponent,
                          @Value("\${channel.workers:3}") val numberOfWorkers:Int): InitializingBean {
    override fun afterPropertiesSet() {

        val workerPool = Executors.newFixedThreadPool(numberOfWorkers).asCoroutineDispatcher()
        for(i in 1..numberOfWorkers) {
            val workerName = "worker $i"
            println("Starting worker $workerName")
            val worker = ChannelWorkerReader(channelComponent.channelMessage, workerName)
            GlobalScope.launch(workerPool) {
                worker.doIt()
            }
        }
    }
}

```

## Testing.... again

If we use curl really fast (not really really fast, just 8+ times before 5 seconds), you should see that on the 9th request, it will take a while to get the response.

This happens because the first 3 requests are read by workers thus freeing up the channel, then the next 5 requests fill up the channel which locks it on the channelComponent.channelMessage.send method on the controller.

## Summary

Yep, it works - has many downsides, is not production ready but can be done.

## Ideas to improve

There are many ways of improving this, but from the top of my head:

- Add some persistency so we don't loose messages in case of malfunction
- Tweak queue (channel) size
- Expose the queue in some other faster protocol
- Add a way of proper data streaming

Source code: [Here](https://github.com/mussatto/PocAsyncChannel)