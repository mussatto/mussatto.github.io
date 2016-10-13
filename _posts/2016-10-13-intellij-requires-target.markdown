---
layout: post
title:  "Intellij - javacTask error"
date:   2016-10-13 00:00:00
categories: javacTask error Intellij requires
---

I got this annoying error on Intellij community in a Java project when trying to run a main class:

```shell
Error:java: javacTask: source release 1.8 requires target release 1.8
```

This was triggered after I implemented a few things that exists only in Java 8.

In the "Project Structure" I had changed already to Language Level 8, so it didn't triggered any errors in the editor.

In order to fix this problem, you must have a JDK 8 installed and then set the bytecode to version 1.8:

Go to: File -> Settings -> Build, Execution, Deployment -> Compiler -> Java Compiler

And change Target bytecode version to 1.8

If you are using gradle, also remember to set:

```groovy
sourceCompatibility = 1.8
targetCompatibility = 1.8
```

In build.gradle
