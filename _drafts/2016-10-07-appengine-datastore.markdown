---
layout: post
title:  "Java - AppEngine datastore + objectify"
date:   2016-10-07 00:00:00
categories: java appengine datastore objectify tutorial
---

This is a tutorial about how to setup objectify in a java google AppEngine project in order to access datastore.

### Add dependencies

```groovy

compile group: 'com.googlecode.objectify', name: 'objectify', version: '5.1.13'
compile 'com.google.appengine:appengine:+'
compile group: 'com.google.appengine', name: 'appengine-api-1.0-sdk', version: '1.9.42'

```

### Create a mapped entity

```java

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

@Entity
public class Comment {
    @Id
    private Long id;
    private String author;
    private String text;
    private String postID;
    @Index
    private Date date;

    public Comment() {
    }

    public Comment(String author, String text, String postID) {
        this.author = author;
        this.text = text;
        this.postID = postID;
        this.date = new Date();
    }

    public Long getId() {
        return id;
    }

    public String getAuthor() {
        return author;
    }

    public String getText() {
        return text;
    }

    public String getPostID() {
        return postID;
    }

    public Date getDate() {
        return date;
    }
}

```

### Create a OfyService, and register the entities once

```java

import com.googlecode.objectify.Objectify;
import com.googlecode.objectify.ObjectifyService;
public class OfyService {
    static {
        ObjectifyService.register(Comment.class);
    }
    public static Objectify ofy(){
        return ObjectifyService.ofy();
    }
}

```

### Add the Objectify Filter to web.xml

```xml

<filter>
    <filter-name>ObjectifyFilter</filter-name>
    <filter-class>com.googlecode.objectify.ObjectifyFilter</filter-class>
</filter>
<filter-mapping>
    <filter-name>ObjectifyFilter</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>

```

### Create a Servlet

In this servlet, I will read the JSON content, parse it and create the entity from the parameters.

```java

public class CommentServlet extends HttpServlet {

    @Override
    public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {
        Util.addCorsHeader(resp);
        List<Comment> comments = OfyService.ofy().load().type(Comment.class).order("-date").list();
        resp.setContentType("application/json");
        PrintWriter writer = resp.getWriter();
        Gson gson = new Gson();
        writer.write(gson.toJson(comments));
    }

    @Override
    public void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {
        String jsonPost = Util.readInputText(req);

        Map<String, Object> result = new Gson().fromJson(jsonPost, Map.class);

        String author = (String) result.get("author");
        String text = (String) result.get("text");
        String postID = (String) result.get("postID");

        Comment comment = new Comment(author, text, postID);
        OfyService.ofy().save().entity(comment).now();

        Util.responseOkJSON(resp);
    }

}

```

### The sample code

[https://github.com/mussatto/mussatto_appengine](https://github.com/mussatto/mussatto_appengine)
