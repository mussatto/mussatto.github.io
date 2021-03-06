---
layout: post
title:  "Golang Interfaces"
date:   2016-09-26 00:00:00
categories: golang interfaces programming
---

In this post I will describe briefly how Golang interfaces work.

### The interface

The main idea we for this sample is: an animal, a Dog and a Cat that behaves as an animal.

Here, we are defining which functions are required to a type to work as a Animal:

```go

package abstraction

import "fmt"

type Animal interface {
	Talk() string
}

```

### The Dog

In order to Dog to work as an Animal, the only thing you have to do is have the function with the same name (Talk), with the same parameters:

```go

type Dog struct {
	name string
}

func (dog Dog) Talk() string{
	return "woof woof"
}

```

### The Cat

The same for a cat:

```go

type Cat struct{
	name string
}

func (cat Cat) Talk() string{
	return "meow"
}

```

### The test

Lets instantiate a lot of Dogs and Cats, and see if Go allows us to use Dogs and Cats as Animal:

```go

func createAnimals() []Animal{
	return []Animal{ Dog{"snoopy"}, Cat{"mousty"}, Dog{"rex"}, Cat{"garfield"}, Cat{"fat garfield"}, Dog{"toto"} }
}

func MakeAnimalsTalk(){
	for _, animal := range createAnimals(){
		fmt.Println(animal.Talk())
	}
}

```

### The test 2

```go

package abstraction

import "testing"

func TestMakeAnimalsTalk(t *testing.T) {
	MakeAnimalsTalk()
}

```

### The output

```shell

/home/mussatto/dev/go-1.7/bin/go test -v github.com/mussatto/golab/abstraction -run ^TestMakeAnimalsTalk$
woof woof
meow
woof woof
meow
meow
woof woof

```


### The Code

[Github Link](https://github.com/mussatto/golab/tree/master/abstraction)
