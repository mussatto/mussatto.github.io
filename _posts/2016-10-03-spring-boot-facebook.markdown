---
layout: post
title:  "Spring boot Facebook"
date:   2016-10-03 00:00:00
categories: spring springboot facebook login auth
---

In this post how to perform oauth2 authentication on spring boot and facebook.

### Setup

The project is a web application, with root context set to permitAll, showing a static html and a rest controller with a secure path, and a insecure path.

### The SpringBootApplication

This java class will contain the security config, and starts the spring boot application:

```java

package com.mussatto;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@SpringBootApplication
@EnableOAuth2Sso
public class BoilerplateApplication  extends WebSecurityConfigurerAdapter {

    public static void main(String[] args) {
        SpringApplication.run(BoilerplateApplication.class, args);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .antMatcher("/**")
                .authorizeRequests()
                .antMatchers("/", "/greeting", "/webjars/**")
                .permitAll()
                .anyRequest()
                .authenticated();
    }
}

```

### The Controllers

We configured in the BoilerplateApplication class three unsecured paths: /, /greeting, /webjars/**

So lets create the controller that maps into the /greeting path:


```java

package com.mussatto.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @RequestMapping("/greeting")
    public String greeting(@RequestParam(value = "name", defaultValue = "World") String name) {
        return "HelloController " + name;
    }

    @RequestMapping("/secured")
    public String secured(@RequestParam(value = "name", defaultValue = "World") String name) {
        return "Secured this is - " + name;
    }
}

```

### Setting the OAuth2 application parameters

Create a file in src/resources/application.yml with the values:

```yaml
security:
  oauth2:
    client:
      clientId: 159293077858421
      clientSecret: 40efe22a7191ebad9b2107718269e3c1
      accessTokenUri: https://graph.facebook.com/oauth/access_token
      userAuthorizationUri: https://www.facebook.com/dialog/oauth
      tokenName: oauth_token
      authenticationScheme: query
      clientAuthenticationScheme: form
    resource:
      userInfoUri: https://graph.facebook.com/me
```

### The tests

Open a terminal and type the command:

```shell
~/dev/src/spring-boot-boilerplate $ mvn spring-boot:run
```

When the server starts,  open up a browser and type in the links:

[http://localhost:8080/greeting?name=satto](http://localhost:8080/greeting?name=satto)

[http://localhost:8080/secured?name=satto](http://localhost:8080/secured?name=satto)

When you hit the secured link, you will be redirected to facebook to login there.

After you login, you will be able to see the hello message.

### The code

[Github Link](https://github.com/mussatto/spring-boot-boilerplate-oauth2)
