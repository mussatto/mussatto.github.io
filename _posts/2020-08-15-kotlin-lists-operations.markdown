---
layout: post
title:  "Kotlin - lists operations"
date:   2020-08-13 13:00:00
categories: kotlin lists operations
---

This is a small collection of useful list functions to use on Kotlin.

## Lists used in this examples

```kotlin

val myModels = listOf(
            MyModel(1,"Abraham"),
            MyModel(2, "Bruno"),
            MyModel(3, "Carlos"),
            MyModel(4, "Daniel"),
            MyModel(5, "Eduard"),
            MyModel(6, "Fabio"),
            MyModel(7, "Akira"),
            MyModel(8, "Alberto")
    )

    val myModels2 = listOf(
            MyModel(9, "Maria"),
            MyModel(10, "Julia"),
            MyModel(11, "Rebeca")
    )

    val listOfLists = listOf(myModels, myModels2)

    val myModelsMutable = mutableListOf(
            MyModel(1,"Abraham"),
            MyModel(2, "Bruno"),
            MyModel(3, "Carlos"),
            MyModel(4, "Daniel"),
            MyModel(5, "Eduard"),
            MyModel(6, "Fabio"),
            MyModel(7, "Akira"),
            MyModel(8, "Alberto")
    )

```

## Filter out items

```kotlin
val filtered = myModels.filter { it.name.startsWith("A") }
assertThat(filtered).hasSize(3)
assertThat(filtered[0].name).isEqualTo("Abraham")
println(filtered)
//[MyModel(id=1, name=Abraham), MyModel(id=7, name=Akira), MyModel(id=8, name=Alberto)]

```

## Filter out items and retrieve a list of attributes from the objects

```kotlin

val filtered = myModels.filter { it.name.startsWith("A") }.map { it.id }
assertThat(filtered).hasSize(3)
assertThat(filtered[0]).isEqualTo(1)
println(filtered)

//[1, 7, 8]

```

## Filter out by index

```kotlin

val filtered = myModels.filterIndexed() { index, myModel -> index % 2 ==0}.map { it.id }
assertThat(filtered).hasSize(4)
assertThat(filtered[0]).isEqualTo(1)
println(filtered)
//[1, 3, 5, 7]

```

## Search by one attribute on the list (using binarySearch)

```kotlin

val filteredIndex1 = myModelsMutable.map { it.name }.binarySearch("Abraham")
// filter using ID of given model
val filteredIndex2 = myModelsMutable.binarySearch(MyModel(3,"Bruno"), compareBy {it.id})
assertThat(filteredIndex1).isEqualTo(0) // index
assertThat(filteredIndex2).isEqualTo(2) // compared by id, it matches Carlos
println(filteredIndex1)
println(filteredIndex2)

// 0
// 0

```

## Transform list of lists into a big list (flatten)

```kotlin

val bigList = listOfLists.flatten()
assertThat(bigList).hasSize(11)
println(bigList)
// [MyModel(id=1, name=Abraham), MyModel(id=2, name=Bruno), MyModel(id=3, name=Carlos), MyModel(id=4, name=Daniel), MyModel(id=5, name=Eduard), MyModel(id=6, name=Fabio), MyModel(id=7, name=Akira), MyModel(id=8, name=Alberto), MyModel(id=9, name=Maria), MyModel(id=10, name=Julia), MyModel(id=11, name=Rebeca)]

```


Source code: [Here](https://github.com/mussatto/kotlinlab/blob/master/src/test/kotlin/mussatto/lab/ListsOperationsTest)