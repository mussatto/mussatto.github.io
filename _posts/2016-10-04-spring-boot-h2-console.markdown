---
layout: post
title:  "Spring boot h2 console"
date:   2016-10-04 00:00:00
categories: spring springboot h2 console database
---

In this post how to to setup H2 database with web console on spring boot.

### Setup

First, lets add some dependencies in the pom.xml

{% highlight xml %}

<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
</dependency>

{% endhighlight %}

Then lets add a new managed bean.

{% highlight java %}

@Bean
public ServletRegistrationBean h2servletRegistration() {
    ServletRegistrationBean registration = new ServletRegistrationBean(new WebServlet());
    registration.addUrlMappings("/console/*");
    return registration;
}

{% endhighlight %}

Then the database's connection URI and login information:

{% highlight properties %}

spring.datasource.url=jdbc:h2:mem:AZ;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect

{% endhighlight %}

### The code

[https://github.com/mussatto/spring-boot-boilerplate-oauth2](https://github.com/mussatto/spring-boot-boilerplate-oauth2)
