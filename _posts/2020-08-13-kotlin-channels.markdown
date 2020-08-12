---
layout: post
title:  "Kotlin - channels"
date:   2020-08-13 13:00:00
categories: kotlin time elapsed
---

# From the series "Stuff I always forget how to do and have to google"

## Step 1 - create channel reader or processor (in parallel)

```kotlin
private fun CoroutineScope.createProcessorJob(channel: Channel<String>): Job {
    return launch {
        //process untill channel closed
        for (message in channel) {
            println("PROCESSOR: processing ->$message<-")
            Thread.sleep(500)
        }
        println("OMG, THE CHANNEL IS CLOSED!")
    }
}
```
## Step 2 - create channel sender or producer (in parallel)

```kotlin
private fun CoroutineScope.sendListToChannel(list: List<String>, channel: Channel<String>): MutableList<Job> {
    val senderJobs = mutableListOf<Job>()
    list.forEach {
        val job = launch {
            channel.send("Hey processor, process $it")
            println("Sending super duper fast, until the capacity is hit.")
        }
        senderJobs.add(job)

    }
    return senderJobs
}
```

## Orchestrate everything

```kotlin
val list = listOf("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O")
val channel = Channel<String>(5)
// wait for the whole test to finish
runBlocking {

    coroutineScope{
        val processorJob = createProcessorJob(channel)
        val senderJobs = sendListToChannel(list, channel)
        senderJobs.joinAll()
        channel.close()
        processorJob.join()
    }

}
```


Source code: [Here](https://github.com/mussatto/kotlinlab/blob/master/src/test/kotlin/mussatto/lab/ChannelTest.kt)