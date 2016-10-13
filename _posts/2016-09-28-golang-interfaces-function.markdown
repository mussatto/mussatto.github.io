---
layout: post
title:  "Golang Interface - Function"
date:   2016-09-28 00:00:00
categories: golang interface function programming
---

In this post I will show briefly how to use type interface on function in Golang.

The idea is to have a defined callback of function to be passed as parameter.

In this example we will define a function that does some work with data, and then output the data in different ways in the console depending on the callback passed.

### The setup

```go

package abstraction

type AfterWorkCallback func(data []int) string

func Work(data []int, callback AfterWorkCallback){
	//Do Work
	for index, value := range data{
		data[index] = value + index
	}

	callback(data)
}

```


### The test

```go

func Print(data []int) string {
	fmt.Println("data is: " + fmt.Sprint(data))
	responseString := ""

	for _, val := range data {
		responseString = responseString + " " + fmt.Sprint(val)
	}

	return responseString
}

func PrintReverse(data []int) string {

	fmt.Println("data is: " + fmt.Sprint(data))
	responseString := ""

	for i := len(data) - 1; i >= 0; i-- {
		responseString = responseString + " " + fmt.Sprint(data[i])
	}

	return responseString
}

```

function_test.go:

```go

package abstraction

import (
	"testing"
	"fmt"
)

func TestWork(t *testing.T) {

	input := []int{}
	input2 := []int{}
	for i:=0; i<10; i++{
		input = append(input, i)
		input2 = append(input2, i)
	}

	fmt.Println("Print output:")
	fmt.Println(Work(input, Print))

	fmt.Println("PrintReverse output:")
	fmt.Println(Work(input2, PrintReverse))
}


```


### The Code

[Github Link](https://github.com/mussatto/golab/tree/master/abstraction)
