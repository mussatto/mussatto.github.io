---
layout: post
title:  "Java - getParameter vs getAttribute"
date:   2016-10-06 00:00:00
categories: getParameter getAttribute java jsp servlet
---

In this post I will write a little bit about the difference between getParameter vs getAttribute in javax.servlet.http.HttpServletRequest in Java.

### getParameter

getParameter processes http request parameters.

Its the stuff that is passed from the client to the server, so it can only return a String value:

### getAttribute

getAttribute is intented to be used for server side only.

Lets say you want to pass an attribute from the servlet to the JSP, you use HttpServletRequest.setAttribute.

Then in the JSP you read it using getAttribute:

### Example code

RootServlet.java:
```java

package mussatto.servlet;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@SuppressWarnings("serial")
public class RootServlet extends HttpServlet {

    @Override
    public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {
        addCorsHeader(resp);
        String name = req.getParameter("name");

        if(name==null || name.equals(""))
            req.setAttribute("message", "World");
        else
            req.setAttribute("message", name);

        req.getRequestDispatcher("/hello.jsp").forward(req, resp);
    }

    private void addCorsHeader(HttpServletResponse response){
        response.addHeader("Access-Control-Allow-Origin", "*");
        response.addHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, HEAD");
        response.addHeader("Access-Control-Allow-Headers", "X-PINGOTHER, Origin, X-Requested-With, Content-Type, Accept");
        response.addHeader("Access-Control-Max-Age", "1728000");
    }
}

```

hello.jsp:

```html

<%-- //[START all]--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html>
<head>
    <link type="text/css" rel="stylesheet" href="/stylesheets/main.css"/>
</head>

<body>
    Hello <%= request.getAttribute("message") %>
</body>
</html>
<%-- //[END all]--%>


```

### Helpful Links

[Oracle HttpServletRequest docl](http://docs.oracle.com/javaee/6/api/javax/servlet/http/HttpServletRequest.html)

### The code

[Github Link](https://github.com/mussatto/mussatto_appengine)

PS: In case the build with gradle fails, check my next post (Appengine compilation error)
