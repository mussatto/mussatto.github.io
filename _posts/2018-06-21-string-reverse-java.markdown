---
layout: post
title:  "Java - Reverse String"
date:   2018-06-21 12:00:00
categories: java string reverse
---

Reverse a string is a common exercise and this is a simple Java solution

The algorithm is the following:

- Split the String into an array with all the characters
- Reverse the array
- Join the array again


```java
public static String reverse(String s1){
        if(isNull(s1)){
            return null;
        }
        List<String> charList = asList(s1.split(""));
        Collections.reverse(charList);
        return String.join("", charList);
}
```

Tests:

```java
@Test
public void reverse1(){
    String entry = "ABCDEF";
    String expected = "FEDCBA";
    String result = StringReverser.reverse(entry);
    assertEquals(expected, result);
}

@Test
public void reverseNull(){
    String entry = null;
    String expected = null;
    String result = StringReverser.reverse(entry);
    assertEquals(expected, result);
}

@Test
public void reverseEmpty(){
    String entry = "";
    String expected = "";
    String result = StringReverser.reverse(entry);
    assertEquals(expected, result);
}
```


Source code: [Reverse Class](https://github.com/mussatto/JavaExercises/blob/master/src/main/java/mussatto/com/strings/StringReverser.java)
Source code: [Reverse Test](https://github.com/mussatto/JavaExercises/blob/master/src/test/java/mussatto/com/strings/StringReverserTest.java)