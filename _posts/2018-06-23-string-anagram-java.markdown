---
layout: post
title:  "Java - Anagram String"
date:   2018-06-23 12:00:00
categories: java string anagram
---

Another common Java exercise is to verify if two Strings are anagrams

The algoritm is:

- For both Strings: Remove special characters (!,'.)
- For both Strings: Split the String into array of characters
- For both Strings: Create a Character Map, with key = char, value = number of occurences of char
- Iterate the array of characters and calculate the CharacterMap
- Verify if both Maps are equal


To remove the special characters we can use regex:

```java

public class SpecialCharRemover {

    public static String removeSpecial(String s1){
        if(isNull(s1)){
            return null;
        }
        return s1.replaceAll("[^\\w\\s]","");
    }
}

```

Creating character map

```java

public class CharMap {

    public static Map<String, Integer> getCharMap(String s){
        if(isNull(s)){
            return new HashMap<>();
        }
        Map<String, Integer> charMap = new HashMap<>();
        for(String curr : asList(s.split(""))){
            if(charMap.containsKey(curr)){
                charMap.put(curr, charMap.get(curr) + 1);
            }else{
                charMap.put(curr, 1);
            }
        }

        return charMap;
    }
}

```

wrapping it all up

```java


public class Anagram {

    public static boolean isAnagram(String s1, String s2){
        if(isNull(s1) || isNull(s2)){
            return false;
        }
        Map<String, Integer> charMap1 = CharMap.getCharMap(SpecialCharRemover.removeSpecial(s1));
        Map<String, Integer> charMap2 = CharMap.getCharMap(SpecialCharRemover.removeSpecial(s2));

        if(charMap1.keySet().size() != charMap2.keySet().size()){
            return false;
        }

        for(String curr : charMap1.keySet()){
            if(!charMap1.get(curr).equals(charMap2.get(curr))){
                return false;
            }
        }
        return true;
    }
}


```

Source code: [Here](https://github.com/mussatto/JavaExercises/blob/master/src/main/java/mussatto/com/strings/Anagram.java)