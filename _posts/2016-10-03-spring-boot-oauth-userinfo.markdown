---
layout: post
title:  "Spring boot OAuth userInfo"
date:   2016-10-03 00:00:00
categories: spring springboot facebook login auth
---

In this post I will describe how to get user info from the SpringSecurityCore context when using OAuth2 as authentication in the website.

### Setup

Following the last post's code, I will add more code about how to get the logged user's info:

```java

    @RequestMapping("/secured")
    public String secured() {
        OAuth2Authentication oAuth2Authentication = (OAuth2Authentication) SecurityContextHolder.getContext() .getAuthentication();
        Authentication userAuthentication = oAuth2Authentication.getUserAuthentication();
        System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>>>");
        Map<String, String> details = (Map<String, String>) userAuthentication.getDetails();
        System.out.println(details);
        return "Hello, " + details.get("name");
    }

```

Then login on [http://localhost:8080/secured](http://localhost:8080/secured) and it will get your name on facebook.

### The code

[https://github.com/mussatto/spring-boot-boilerplate-oauth2](https://github.com/mussatto/spring-boot-boilerplate-oauth2)
