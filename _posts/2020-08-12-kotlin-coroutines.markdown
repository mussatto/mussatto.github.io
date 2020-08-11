---
layout: post
title:  "Kotlin - coroutines list in parallel"
date:   2020-08-12 13:00:00
categories: kotlin time elapsed
---

# DRAFT 

Processing a list in parallel on Kotlin using coroutines:

```kotlin

val list = listOf("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O")
val context = Executors.newFixedThreadPool(1).asCoroutineDispatcher()
runBlocking {
    list.forEach {
        launch(context) {
            val time = measureTimeMillis {
                delay(3000) // this frees up the thread to other tasks
                println("Finished $it - ${now()}")
            }

            println("$it took $time milliseconds")
        }
    }
}
context.close()

```


Source code: [Here](https://github.com/mussatto/kotlinlab/blob/master/src/test/kotlin/mussatto/lab/CoroutineLabTest.kt)