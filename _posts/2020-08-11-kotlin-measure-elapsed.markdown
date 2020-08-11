---
layout: post
title:  "Kotlin - calculate time elapsed"
date:   2020-08-11 13:00:00
categories: kotlin time elapsed
---

Calculate elapsed in millis:

```kotlin

val elapsed = measureTimeMillis {
            Thread.sleep(1000L)
        }
        assertThat(elapsed).isGreaterThan(1000L)

```

Calculate elapsed in seconds, nano seconds, milliseconds:

```kotlin
val elapsed = measureTime {
            Thread.sleep(1100L)
        }
        assertThat(elapsed.inSeconds).isGreaterThan(1.0)

        println("micro=${elapsed.inMicroseconds}, nano=${elapsed.inNanoseconds}, milli=${elapsed.inMilliseconds}")
```

Source code: [Here](https://github.com/mussatto/JavaExercises/blob/master/src/main/java/mussatto/com/strings/Anagram.java)