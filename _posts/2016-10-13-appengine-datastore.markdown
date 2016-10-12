---
layout: post
title:  "Java - AppEngine datastore + objectify"
date:   2016-10-13 00:00:00
categories: java appengine datastore objectify tutorial
---

Appengine and datastore is a great cloud provider to try out new projects. It supports Java, Python and Go and has a great free layer.

This is a tutorial about how to setup the objectify framework in a java google AppEngine project in order to access datastore in a Java + gradle project.

An entity representing a Comment without relationships will be created.

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

For this, I used an static block to register only once the class.

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

    private static final Logger log = Logger.getLogger(CommentServlet.class.getName());

    @Override
    public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {
        log.info("CommentServlet.doGet");
        String postID = req.getParameter("postID");
        log.info("CommentServlet.postID=" + postID);
        Util.addCorsHeader(resp);
        List<Comment> comments;

        if (postID != null && !postID.equals("")) {
            comments = OfyService.ofy().load().type(Comment.class).filter("postID", postID).order("-date").list();
        } else {
            comments = OfyService.ofy().load().type(Comment.class).order("-date").list();
        }
        resp.setContentType("application/json");
        PrintWriter writer = resp.getWriter();
        Gson gson = new Gson();
        writer.write(gson.toJson(comments));
    }

    @Override
    public void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {
        log.info("CommentServlet.doPost");
        String jsonPost = Util.readInputText(req);

        Map result = new Gson().fromJson(jsonPost, Map.class);

        String author = (String) result.get("author");
        String text = (String) result.get("text");
        String postID = (String) result.get("postID");

        Comment comment = new Comment(author, text, postID);
        OfyService.ofy().save().entity(comment).now();

        Util.responseOkJSON(resp);
    }

    @Override
    public void doOptions(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        log.info("CommentServlet.doOptions");
        String origin = req.getHeader("Origin");
        log.info("Origin:" + origin);
        Util.addCorsHeader(resp);
    }

}

```

Map the servlet

```xml
<servlet>
   <servlet-name>comment</servlet-name>
   <servlet-class>mussatto.servlet.CommentServlet</servlet-class>
</servlet>

<servlet-mapping>
    <servlet-name>comment</servlet-name>
    <url-pattern>/comment</url-pattern>
</servlet-mapping>
```

### The test code

```java

public class CommentServletIntegrationTest {

    @Test
    public void commentServletTest() {
        Map<String, Object> params = new HashMap<>();

        params.put("author", "Noel Rosa");
        params.put("text", "com que roupa eu vou, pro samba que voce me convidou?");
        params.put("postID", "123456");
        JSONPost post = new JSONPost("http://localhost:8080/comment", params);

        try {
            post.doPost();
        } catch (IOException e) {
            System.out.println(e);
            fail();
        }

        System.out.println(post.getResponseCode());

        System.out.println(post.getResponse());
    }

}

```
### The sample code

[https://github.com/mussatto/mussatto_appengine](https://github.com/mussatto/mussatto_appengine)
