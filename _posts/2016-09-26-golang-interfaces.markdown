---
layout: post
title:  "Golang Interfaces"
date:   2016-09-26 00:00:00
categories: golang channel programming
---

### WAT?

In this post I will describe how Golang interfaces work.

The idea is: an animal, and a Dog that behaves as an animal.

### The interface

Here, we are defining which functions are required to a type to work as a Animal:

{% highlight go %}

package abstraction

import "fmt"

type Animal interface {
	Talk() string
}

{% endhighlight %}

### The Dog

In order to Dog to work as an Animal, the only thing you have to do is have the function with the same name (Talk), with the same parameters:

{% highlight go %}

type Dog struct {
	name string
}

func (dog Dog) Talk() string{
	return "woof woof"
}

{% endhighlight %}

### The Cat

The same for a cat:

{% highlight go %}

type Cat struct{
	name string
}

func (cat Cat) Talk() string{
	return "meow"
}

{% endhighlight %}

### The test

Lets instantiate a lot of Dogs and Cats, and see if Go allows us to use Dogs and Cats as animals:

{% highlight go %}

func createAnimals() []Animal{
	return []Animal{ Dog{"snoopy"}, Cat{"mousty"}, Dog{"rex"}, Cat{"garfield"}, Cat{"fat garfield"}, Dog{"toto"} }
}

func MakeAnimalsTalk(){
	for _, animal := range createAnimals(){
		fmt.Println(animal.Talk())
	}
}

{% endhighlight %}

### The test 2

{% highlight go %}

package abstraction

import "testing"

func TestMakeAnimalsTalk(t *testing.T) {
	MakeAnimalsTalk()
}

{% endhighlight %}

### The output

{% highlight shell %}

/home/mussatto/dev/go-1.7/bin/go test -v github.com/mussatto/golab/abstraction -run ^TestMakeAnimalsTalk$
woof woof
meow
woof woof
meow
meow
woof woof

{% endhighlight %}


### The Code

Check the code in: [https://github.com/mussatto/golab/tree/master/abstraction](https://github.com/mussatto/golab/tree/master/abstraction)
