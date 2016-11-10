---
layout: post
title:  "Golang - Append two arrays or slices"
date:   2016-11-09 00:00:00
categories: golang append arrays slices
---

Appending is a really common operation when programming, but how do we append two arrays / slices in Golang?

Well, first lets try the regular way:

```go
myStringSlice := []string{"first", "second", "third"}
myStringSlice = append(myStringSlice, []string{"fourth", "fift"})
```

This error pops up:

```shell
cannot use []string literal (type []string) as type string in append
```

Then how do we do this? We could iterate with a for, but it doesn't look nice.

The alternative option is to append by adding the "..." syntax after the array / slice:

```go
myStringSlice := []string{"first", "second", "third"}

//ERROR!
//myStringSlice = append(myStringSlice, []string{"fourth", "fift"})

myStringSlice = append(myStringSlice, []string{"fourth", "fift"}...)
myStringSlice = append(myStringSlice, "sixth", "seventh")
fmt.Println(myStringSlice))
```

### Under the hood

Pretty much "..." is syntax for variadic arguments in Go, aka it changes an slice into a multiple arguments in the function call

### The code

[Github Link](https://github.com/mussatto/golab/blob/master/slices/append.go)
