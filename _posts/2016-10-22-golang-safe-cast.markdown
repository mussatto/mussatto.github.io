---
layout: post
title:  "Golang - safe cast"
date:   2016-10-22 00:00:00
categories: golang go safe cast
---

Lets say you have an interface in Golang, and for some reason you want to cast it.

How do we do that?

```go
var myVar interface{}
...
myVar = secondVar.(string)
```

But what happens when myVar is not a string?

Well, this happens:

```shell
  panic: interface conversion: interface is int, not string
```

Pretty much, the program does a panic and the whole executable shuts exits and shutdown.

Luckily, there is a safe / safer way to avoid system panic when casting in golanguage:

```go
var firstVar interface{}
firstVar = "this is a string"

firstString, ok := firstVar.(string)

if (!ok) {
	fmt.Printf("firstString is not a string, do something about it! Value:'%v'\n", firstString)
}
```

Now, if its not a string, an message will be printed in the console.

Lets create a small test code to check the result:

```go
var firstVar interface{}
var secondVar interface{}
secondVar = 10
firstVar = "this is a string"

firstString, ok := firstVar.(string)

if (!ok) {
	fmt.Printf("firstString is not a string, do something about it! Value:'%v'\n", firstString)
}

secondString, ok := secondVar.(string)

if (!ok) {
	fmt.Printf("secondString is not a string, do something about it! Value:'%v'\n", secondString)
}
```

And the output is:

```shell
secondString is not a string, do something about it! Value:''
```

### The code

Check the sample code in:
[https://github.com/mussatto/golab/tree/master/cast](https://github.com/mussatto/golab/tree/master/cast)
