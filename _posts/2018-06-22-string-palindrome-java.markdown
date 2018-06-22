---
layout: post
title:  "Java - Palindrome String"
date:   2018-06-22 12:00:00
categories: java string palindrome
---

Another common Java exercise is to verify is a String is a Palindrome

The algorithm is:

- Split the String into an array with all the characters
- Reverse the array
- Join the array again
- Check if the reversed string is equal to the input


Reversing the array

```java
public class StringReverser {
    public static String reverse(String s1){
        if(isNull(s1)){
            return null;
        }
        List<String> charList = asList(s1.split(""));
        Collections.reverse(charList);
        return String.join("", charList);
    }
}
```

Palindrome class
```java
public class Palindrome {

    public static boolean isPalindrome(String s1){
        if(isNull(s1)){
            return false;
        }
        String reversed = StringReverser.reverse(s1);
        return reversed.equals(s1);
    }
}

```



Source code: [Palindrome](https://github.com/mussatto/JavaExercises/blob/master/src/main/java/mussatto/com/strings/Palindrome.java)