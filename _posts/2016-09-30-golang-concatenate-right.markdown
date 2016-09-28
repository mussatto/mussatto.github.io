---
layout: post
title:  "Golang - right way to concatenate"
date:   2016-09-29 00:00:00
categories: golang channel programming
---

### WAT?

In this post I will describe how to concatenate string in the "right" (performatic) way.

The code will perform a loop that appends some information in the current string

### The Setup



### The test


### WHY?

When we concatenate using the plus "+" operation, it instantiates (creates) a new variable with the concatenated value.

As the string grows, it becomes a costly operation to create / alloc / instantiate the new variable and destroy the old one.

With buffer.write, the old variable is not destroyed and only the passed value is appended. Without the need to create the performace is better.

### The code
