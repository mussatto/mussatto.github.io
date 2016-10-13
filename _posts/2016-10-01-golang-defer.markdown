---
layout: post
title:  "Golang - Defer"
date:   2016-10-01 00:00:00
categories: golang defer
---

In this post I will describe how defer works with a small sample code.

### The example

Defer pretty much adds a command in a stack to be executed after a function call before it returns.

The stack works in LIFO (last in first out)

We will add two print to console commands in defer, just to see how the calls are handled.

And then check it again in a loop.

```go

package golab

import "fmt"

//Defer1
func defer1() {
	defer fmt.Println("this is going to be printed after return")
	defer fmt.Println("this is a second command in defer")

	fmt.Println("this is A")
	fmt.Println("this is B")
}

func defer2() {
	//since its LIFO, should print 3210
	for i := 0; i < 4; i++ {
		defer fmt.Println(i)
	}

}

```


### The Test

```go

package golab

import "testing"

func TestDefer1(T *testing.T) {
	defer1()
}

func TestDefer2(T *testing.T) {
	defer2()
}

```


### The Output

```go
/home/mussatto/dev/go-1.7/bin/go test -v github.com/mussatto/golab/defer -run ^TestDefer1$
this is A
this is B
this is a second command in defer
this is going to be printed after return
ok  	github.com/mussatto/golab/defer	0.001s
```


### The code
[Github Link](https://github.com/mussatto/golab/tree/master/defer)

### Helpful links

[Golang Blog](https://blog.golang.org/defer-panic-and-recover)
