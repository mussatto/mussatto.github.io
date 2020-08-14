---
layout: post
title:  "Kotlin - coroutine "
date:   2020-08-12 13:00:00
categories: kotlin coroutine parallel list
---

"Stuff I always forget how to do and have to google it"

## Processing a list in parallel on Kotlin using coroutines, using 2 threads:

Obs: Remember to close the context!

```kotlin
val list = listOf("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O")
val context = Executors.newFixedThreadPool(1).asCoroutineDispatcher()
runBlocking {
    list.forEach {
        launch(context) {
            val time = measureTimeMillis {
                delay(3000) // this frees up the thread to other tasks
                // Thread.sleep(3000) // this does NOT free up the thread to other tasks
                println("Finished $it - ${now()}")
            }

            println("$it took $time milliseconds")
        }
    }
}
context.close()
```

## Processing list in parallel using coroutineScope instead runBlocking of and joining everything afterwards:

Obs: suspend is necessary!

```kotlin

suspend fun processListWithCoroutineScope() {
    val list = listOf("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O")
    val context = Executors.newFixedThreadPool(3).asCoroutineDispatcher()

    coroutineScope {

        val job = launch {
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

        job.join()
    }

    context.close()

    println("Exit! But only after everything else finished.")
}

```

## Perform Http Get with list in parallel with coroutines on Kotlin, using 7 threads:

```kotlin
val wordsToQuery = listOf( "kotlin", "coroutine", "banana", "apple", "something", "bol.com", "mussatto.github.io")
val context = Executors.newFixedThreadPool(7).asCoroutineDispatcher()
val client = HttpClient()
runBlocking {
    wordsToQuery.forEach {
        launch(context) {
            println("Started:${now()}")
            val resp = client.get<String>("https://www.google.com/search?q=$it")
            println("Finished:${now()}")
        }
    }
}
context.close()
```


Source code: [Here](https://github.com/mussatto/kotlinlab/blob/master/src/test/kotlin/mussatto/lab/CoroutineLabTest.kt)

===