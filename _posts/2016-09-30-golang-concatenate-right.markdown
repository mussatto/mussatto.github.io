---
layout: post
title:  "Golang - right way to concatenate"
date:   2016-09-29 00:00:00
categories: golang channel programming
---

In this post I will describe how to concatenate string in the "right" (performatic) way.

The code will perform a loop that appends some information in the current string

### The Setup

{% highlight go %}

package strings

import "bytes"

const maxIterations = 100000

func ConcatenateWrong() string {
	myVar := ""
	for i := 0; i < maxIterations; i++ {
		myVar = myVar + GenerateRandom()
	}
	return myVar
}

func ConcatenateRight() string {
	var buffer bytes.Buffer
	for i := 0; i < maxIterations; i++ {
		buffer.WriteString(GenerateRandom())
	}
	return buffer.String()
}

{% endhighlight %}

### The test

{% highlight go %}

package strings

import (
	"fmt"
	"testing"
	"time"
)

func TestConcatenate(t *testing.T) {
	start := time.Now()
	ConcatenateWrong()
	elapsed := time.Since(start)
	fmt.Printf("ConcatenateWrong - Elapsed time is %s\n", elapsed)
	//fmt.Println(wrong)

	start = time.Now()
	ConcatenateRight()
	elapsed = time.Since(start)
	fmt.Printf("ConcatenateRight - Elapsed time is %s\n", elapsed)
	//fmt.Println(right)
}


{% endhighlight %}

The Output:

{% highlight shell %}
/home/mussatto/dev/go-1.7/bin/go test -v github.com/mussatto/golab/strings -run ^TestConcatenate$
ConcatenateWrong - Elapsed time is 918.970641ms
ConcatenateRight - Elapsed time is 12.987911ms
ok  	github.com/mussatto/golab/strings	0.937s

{% endhighlight %}

As we can see, there is a perceptive difference of performace when using there two different approachs (~920ms vs ~13ms)

### WHY?

When we concatenate using the plus "+" operation, it instantiates (creates) a new variable with the concatenated value.

As the string grows, it becomes a costly operation to create / alloc / instantiate the new variable and destroy the old one.

With buffer.WriteString, the old variable is not destroyed and only the passed value is appended. Without the need to create the performace is better.

### The code
[https://github.com/mussatto/golab/tree/master/strings](https://github.com/mussatto/golab/tree/master/strings)
