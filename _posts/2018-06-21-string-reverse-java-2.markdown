---
layout: post
title:  "Java - Reverse String - alternate"
date:   2018-06-21 13:00:00
categories: java string reverse
---

This is an alternate solution for reversing Strings in java

The algorithm:

- Split the String into an array with all the characters
- Iterate throught the array, starting from the last position and adding into a new string


```java
public static String reverse(String s1) {
    if(isNull(s1)){
        return null;
    }
    StringBuilder stringBuilder = new StringBuilder();
    String[] splitted = s1.split("");
    for (int i = splitted.length - 1; i >= 0; i--) {
        stringBuilder.append(splitted[i]);
    }
    return stringBuilder.toString();
}
```

Tests:

```java
@Test
public void reverse1(){
    String entry = "ABCDEF";
    String expected = "FEDCBA";
    String result = StringReverserByConcat.reverse(entry);
    assertEquals(expected, result);
}

@Test
public void reverseNull(){
    String entry = null;
    String expected = null;
    String result = StringReverserByConcat.reverse(entry);
    assertEquals(expected, result);
}

@Test
public void reverseEmpty(){
    String entry = "";
    String expected = "";
    String result = StringReverserByConcat.reverse(entry);
    assertEquals(expected, result);
}
```


Source code: [Reverse Class](https://github.com/mussatto/JavaExercises/blob/master/src/main/java/mussatto/com/strings/StringReverserByConcat.java)
Source code: [Reverse Test](https://github.com/mussatto/JavaExercises/blob/master/src/test/java/mussatto/com/strings/StringReverserByConcatTest.java)