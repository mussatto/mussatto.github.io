---
layout: post
title:  "Java - Hot code Swapping on Spring Boot"
date:   2016-11-02 00:00:00
categories: java hot swap swapping reload code spring
---

One of the worst pains in Java is having to stop / start a server at each simple change in the code (reload it).

Pretty much all IDEs provide support for hot code swapping with A LOT of limitations.

To do hot code swapping you must enable debug and then connect from the IDE to the given port:

```shell
-Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=1044
```

But what if we want to make more drastic changes in the code?

Well, there is JRebel (a paid solution) and spring loaded (free). So I will cover the free tool =)

So how do we set this up in gradle and Intellij?


Well, first we need to add springloaded to the buildscript:

```groovy
buildscript {
    repositories {
        mavenCentral()
    }
    dependencies {
        classpath("org.springframework.boot:spring-boot-gradle-plugin:1.4.1.RELEASE")
        classpath 'org.springframework:springloaded:1.2.6.RELEASE'
    }
}
```

Then we add the idea plugin:

```groovy
apply plugin: 'idea'
```

Then we configure the plugin:

```groovy
idea {
    module {
        inheritOutputDirs = false
        outputDir = file("$buildDir/classes/main/")
    }
}
```

Then add or refresh the gradle configurations in Intellij, and enable "Make project automatically" so you don't have to press CTRL+F9 each time you want to reload code.

## Setting up on eclipse


I personally didn't try this step, but I will leave this as a reference =)

Right click Project -> Run As -> Run Configurations… -> Java Application -> YOUR_PROJECT → Arguments

-javaagent:/path/to/springloaded-1.2.6.RELEASE.jar -noverify

Click apply an then run

## Limitations


Spring loaded doesn't have paid support.

As far as I know, it only supports spring boot.


## The code


[Link to Github](https://github.com/mussatto/spring-boot-jpa-login-boilerplate/blob/master/build.gradle)

## Docs / links

[Spring loaded Github](https://github.com/spring-projects/spring-loaded)

[Spring Boot docs about howto-hotswapping](http://docs.spring.io/spring-boot/docs/current/reference/html/howto-hotswapping.html)

[Blog post about eclipse setup](http://blog.netgloo.com/2014/05/21/hot-swapping-in-spring-boot-with-eclipse-sts/)

[Blog post about eclipse setup 2](http://vitalflux.com/configure-springloaded-eclipse-dynamic-web-project/)

[JRebel](http://zeroturnaround.com/software/jrebel/)
