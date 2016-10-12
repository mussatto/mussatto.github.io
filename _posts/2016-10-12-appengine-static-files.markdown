---
layout: post
title:  "AppEngine - serving static files"
date:   2016-10-12 00:00:00
categories: appengine google static files serving
---

This post is a tutorial / list to make a Google AppEngine Java web application serve static files (html, js, css)

### Check out the google's sample code or download the code

```shell
git clone https://github.com/GoogleCloudPlatform/java-docs-samples.git
```

[Or Download Link for master.zip](https://github.com/GoogleCloudPlatform/java-docs-samples/archive/master.zip)

The baseline for this tutorial is in java-docs-samples/appengine/helloworld

```shell
cd java-docs-samples/appengine/helloworld
```

### Map the static configuration for AppEngine

Edit appengine-web.xml:

```shell
vim src/main/webapp/WEB-INF/appengine-web.xml
```

Then add


```xml
<public-root>/static</public-root>
```
add folder static in WEB-INF

```shell
mkdir src/main/webapp/WEB-INF/static
```

### Add welcome-file

```shell
vim src/main/webapp/WEB-INF/web.xml
```

```xml
<welcome-file-list>
    <welcome-file>index.html</welcome-file>
</welcome-file-list>
```

### Add a index.html

```shell
touch src/main/webapp/WEB-INF/index.html
```

Edit it and add:

```html
<!DOCTYPE html>
<html>
<head>
<title>Hello World</title>
</head>
<body>

<h1>This is a Heading</h1>
<p>This is a paragraph.</p>

</body>
</html>
```

### Start the devserver

```shell

gradle appengineRun

```

or

```shell

mvn appengine:devserver

```

Then check it on your browser: [link to localhost](http://localhost:8080/)

### Check the sample code here

[https://github.com/mussatto/mussatto_appengine](https://github.com/mussatto/mussatto_appengine)
