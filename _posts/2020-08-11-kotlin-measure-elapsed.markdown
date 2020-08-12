---
layout: post
title:  "Kotlin - calculate time elapsed"
date:   2020-08-11 13:00:00
categories: kotlin time elapsed
---

# From the series "Stuff I always forget how to do and have to google"

## Calculate elapsed in millis in kotlin:

```kotlin

val elapsed = measureTimeMillis {
    Thread.sleep(1000L)
}
assertThat(elapsed).isGreaterThan(1000L)

```

## Calculate elapsed in seconds, nano seconds, milliseconds:

```kotlin
val elapsed = measureTime {
    Thread.sleep(1100L)
}
assertThat(elapsed.inSeconds).isGreaterThan(1.0)

println("micro=${elapsed.inMicroseconds}, nano=${elapsed.inNanoseconds}, milli=${elapsed.inMilliseconds}")
```

Obs: Needs @ExperimentalTime annotation

Source code: [Here](https://github.com/mussatto/kotlinlab/blob/master/src/test/kotlin/mussatto/lab/KotlinElapsedTest.kt)