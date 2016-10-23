---
layout: post
title:  "Golang - panic capture / recover"
date:   2016-10-22 00:00:00
categories: golang go panic capture recover
---

This post will cover a small sample about how to capture or recover from panic in Golang.

Lets check this scenario:

```go
var secondVar interface{}
secondVar = 10
//....
//some code
secondString = secondVar.(string)
```

What happens in this case?

```shell
  panic: interface conversion: interface is int, not string
```

And when this happens, your program crashes and shuts down. And this can be bad.

Golang has a recover command / function that allows you to capture this behaviour using a defer:

```go
defer func() {
		if r := recover(); r != nil {
			fmt.Println("Recovered in f", r)
		}
	}()
```

And now this is printed:

```shell
Recovered in f interface conversion: interface is int, not string
```

This is a nice tool to have when handling APIs to print nicer messages and avoid system crashes.

### The code

Check the sample code in:
[https://github.com/mussatto/golab/tree/master/cast](https://github.com/mussatto/golab/tree/master/cast)
