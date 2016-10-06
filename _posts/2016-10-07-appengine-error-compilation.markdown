---
layout: post
title:  "Java - AppEngine Compilation error"
date:   2016-10-07 00:00:00
categories: appengine compilation error java
---

I was playing with AppEngine, and studying for the getParameter vs getAttribute post.

An then an strange error occurred (stacktrace below). Checking around the internet, I found out that this happens because of the JDK version.

In this post I will describe how I fixed this error in Ubuntu 14.04

### Install jEnv

jEnv is an equivalent of rbenv for ruby. [http://www.jenv.be/](http://www.jenv.be/)

{% highlight shell %}

git clone https://github.com/gcuisinier/jenv.git ~/.jenv

echo 'export PATH="$HOME/.jenv/bin:$PATH"' >> ~/.bashrc

echo 'eval "$(jenv init -)"' >> ~/.bashrc

jenv add /usr/lib/jvm/java-8-oracle

{% endhighlight %}

Go to [http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

And to [http://www.oracle.com/technetwork/java/javase/downloads/jdk7-downloads-1880260.html](http://www.oracle.com/technetwork/java/javase/downloads/jdk7-downloads-1880260.html)

And download both versions.

In my case I downloaded them in /home/mussatto/dev/jdks/, and uncompressed them there.

Then we need to add the folder to jEnv:

{% highlight shell %}

~/dev/jdks $ tar -xvf jdk-7u80-linux-x64.tar.gz
~/dev/jdks $ tar -xvf jdk-8u102-linux-x64.tar.gz

~/dev/jdks $ jenv add /home/mussatto/dev/jdks/jdk1.7.0_80
~/dev/jdks $ jenv add /home/mussatto/dev/jdks/jdk1.8.0_102

{% endhighlight %}

Then set to JDK 7

{% highlight shell %}

jenv shell 1.7

{% endhighlight %}

Then I am able to run:

{% highlight shell %}

~/dev/src/appengine_mussatto $ gradle appengineRun

{% endhighlight %}

No errors should occur.


### (for reference) Full Stacktrace of the error in jdk 8:

{% highlight shell %}

SEVERE: Compilation error
org.eclipse.jdt.internal.compiler.classfmt.ClassFormatException
        at org.eclipse.jdt.internal.compiler.classfmt.ClassFileReader.<init>(ClassFileReader.java:342)
        at org.apache.jasper.compiler.JDTCompiler$1.findType(JDTCompiler.java:206)
        at org.apache.jasper.compiler.JDTCompiler$1.findType(JDTCompiler.java:163)
        at org.eclipse.jdt.internal.compiler.lookup.LookupEnvironment.askForType(LookupEnvironment.java:96)
        at org.eclipse.jdt.internal.compiler.lookup.UnresolvedReferenceBinding.resolve(UnresolvedReferenceBinding.java:49)
        at org.eclipse.jdt.internal.compiler.lookup.BinaryTypeBinding.resolveType(BinaryTypeBinding.java:97)
        at org.eclipse.jdt.internal.compiler.lookup.PackageBinding.getTypeOrPackage(PackageBinding.java:167)
        at org.eclipse.jdt.internal.compiler.lookup.Scope.getType(Scope.java:2187)
        at org.eclipse.jdt.internal.compiler.ast.TypeDeclaration.resolve(TypeDeclaration.java:974)
        at org.eclipse.jdt.internal.compiler.ast.TypeDeclaration.resolve(TypeDeclaration.java:1164)
        at org.eclipse.jdt.internal.compiler.ast.CompilationUnitDeclaration.resolve(CompilationUnitDeclaration.java:366)
        at org.eclipse.jdt.internal.compiler.Compiler.process(Compiler.java:623)
        at org.eclipse.jdt.internal.compiler.Compiler.compile(Compiler.java:392)
        at org.apache.jasper.compiler.JDTCompiler.generateClass(JDTCompiler.java:429)
        at org.apache.jasper.compiler.Compiler.compile(Compiler.java:349)
        at org.apache.jasper.compiler.Compiler.compile(Compiler.java:327)
        at org.apache.jasper.compiler.Compiler.compile(Compiler.java:314)
        at org.apache.jasper.JspCompilationContext.compile(JspCompilationContext.java:592)
        at org.apache.jasper.servlet.JspServletWrapper.service(JspServletWrapper.java:317)
        at org.apache.jasper.servlet.JspServlet.serviceJspFile(JspServlet.java:313)
        at org.apache.jasper.servlet.JspServlet.service(JspServlet.java:260)
        at com.google.appengine.tools.development.PrivilegedJspServlet.access$101(PrivilegedJspServlet.java:23)
        at com.google.appengine.tools.development.PrivilegedJspServlet$2.run(PrivilegedJspServlet.java:61)
        at java.security.AccessController.doPrivileged(Native Method)
        at com.google.appengine.tools.development.PrivilegedJspServlet.service(PrivilegedJspServlet.java:58)
        at javax.servlet.http.HttpServlet.service(HttpServlet.java:717)
        at org.mortbay.jetty.servlet.ServletHolder.handle(ServletHolder.java:511)
        at org.mortbay.jetty.servlet.ServletHandler.handle(ServletHandler.java:390)
        at org.mortbay.jetty.security.SecurityHandler.handle(SecurityHandler.java:216)
        at org.mortbay.jetty.servlet.SessionHandler.handle(SessionHandler.java:182)
        at org.mortbay.jetty.handler.ContextHandler.handle(ContextHandler.java:765)
        at org.mortbay.jetty.webapp.WebAppContext.handle(WebAppContext.java:418)
        at com.google.appengine.tools.development.DevAppEngineWebAppContext.handle(DevAppEngineWebAppContext.java:98)
        at org.mortbay.jetty.servlet.Dispatcher.forward(Dispatcher.java:327)
        at org.mortbay.jetty.servlet.Dispatcher.forward(Dispatcher.java:126)
        at mussatto.servlet.RootServlet.doGet(RootServlet.java:19)
        at javax.servlet.http.HttpServlet.service(HttpServlet.java:617)
        at javax.servlet.http.HttpServlet.service(HttpServlet.java:717)
        at org.mortbay.jetty.servlet.ServletHolder.handle(ServletHolder.java:511)
        at org.mortbay.jetty.servlet.ServletHandler$CachedChain.doFilter(ServletHandler.java:1166)
        at com.google.appengine.api.socket.dev.DevSocketFilter.doFilter(DevSocketFilter.java:74)
        at org.mortbay.jetty.servlet.ServletHandler$CachedChain.doFilter(ServletHandler.java:1157)
        at com.google.appengine.tools.development.devappserver2.RequestIdFilter.doFilter(RequestIdFilter.java:36)
        at org.mortbay.jetty.servlet.ServletHandler$CachedChain.doFilter(ServletHandler.java:1157)
        at com.google.appengine.tools.development.ResponseRewriterFilter.doFilter(ResponseRewriterFilter.java:128)
        at org.mortbay.jetty.servlet.ServletHandler$CachedChain.doFilter(ServletHandler.java:1157)
        at com.google.appengine.tools.development.HeaderVerificationFilter.doFilter(HeaderVerificationFilter.java:34)
        at org.mortbay.jetty.servlet.ServletHandler$CachedChain.doFilter(ServletHandler.java:1157)
        at com.google.apphosting.utils.servlet.TransactionCleanupFilter.doFilter(TransactionCleanupFilter.java:50)
        at org.mortbay.jetty.servlet.ServletHandler$CachedChain.doFilter(ServletHandler.java:1157)
        at com.google.appengine.tools.development.StaticFileFilter.doFilter(StaticFileFilter.java:125)
        at org.mortbay.jetty.servlet.ServletHandler$CachedChain.doFilter(ServletHandler.java:1157)
        at org.mortbay.jetty.servlet.ServletHandler.handle(ServletHandler.java:388)
        at org.mortbay.jetty.security.SecurityHandler.handle(SecurityHandler.java:216)
        at org.mortbay.jetty.servlet.SessionHandler.handle(SessionHandler.java:182)
        at org.mortbay.jetty.handler.ContextHandler.handle(ContextHandler.java:765)
        at org.mortbay.jetty.webapp.WebAppContext.handle(WebAppContext.java:418)
        at com.google.appengine.tools.development.DevAppEngineWebAppContext.handle(DevAppEngineWebAppContext.java:98)
        at org.mortbay.jetty.handler.HandlerWrapper.handle(HandlerWrapper.java:152)
        at com.google.appengine.tools.development.JettyContainerService$ApiProxyHandler.handle(JettyContainerService.java:511)
        at org.mortbay.jetty.handler.HandlerWrapper.handle(HandlerWrapper.java:152)
        at org.mortbay.jetty.Server.handle(Server.java:326)
        at org.mortbay.jetty.HttpConnection.handleRequest(HttpConnection.java:542)
        at org.mortbay.jetty.HttpConnection$RequestHandler.headerComplete(HttpConnection.java:923)
        at org.mortbay.jetty.HttpParser.parseNext(HttpParser.java:547)
        at org.mortbay.jetty.HttpParser.parseAvailable(HttpParser.java:212)
        at org.mortbay.jetty.HttpConnection.handle(HttpConnection.java:404)
        at org.mortbay.io.nio.SelectChannelEndPoint.run(SelectChannelEndPoint.java:409)
        at org.mortbay.thread.QueuedThreadPool$PoolThread.run(QueuedThreadPool.java:582)

Oct 04, 2016 7:26:49 AM com.google.apphosting.utils.jetty.JettyLogger warn
WARNING: /_ah/warmup
org.apache.jasper.JasperException: Unable to compile class for JSP:

An error occurred at line: 1 in the generated java file
The type java.io.ObjectInputStream cannot be resolved. It is indirectly referenced from required .class files

Stacktrace:
        at org.apache.jasper.compiler.DefaultErrorHandler.javacError(DefaultErrorHandler.java:92)
        at org.apache.jasper.compiler.ErrorDispatcher.javacError(ErrorDispatcher.java:330)
        at org.apache.jasper.compiler.JDTCompiler.generateClass(JDTCompiler.java:439)
        at org.apache.jasper.compiler.Compiler.compile(Compiler.java:349)
        at org.apache.jasper.compiler.Compiler.compile(Compiler.java:327)
        at org.apache.jasper.compiler.Compiler.compile(Compiler.java:314)
        at org.apache.jasper.JspCompilationContext.compile(JspCompilationContext.java:592)
        at org.apache.jasper.servlet.JspServletWrapper.service(JspServletWrapper.java:317)
        at org.apache.jasper.servlet.JspServlet.serviceJspFile(JspServlet.java:313)
        at org.apache.jasper.servlet.JspServlet.service(JspServlet.java:260)
        at com.google.appengine.tools.development.PrivilegedJspServlet.access$101(PrivilegedJspServlet.java:23)
        at com.google.appengine.tools.development.PrivilegedJspServlet$2.run(PrivilegedJspServlet.java:61)
        at java.security.AccessController.doPrivileged(Native Method)
        at com.google.appengine.tools.development.PrivilegedJspServlet.service(PrivilegedJspServlet.java:58)
        at javax.servlet.http.HttpServlet.service(HttpServlet.java:717)
        at org.mortbay.jetty.servlet.ServletHolder.handle(ServletHolder.java:511)
        at org.mortbay.jetty.servlet.ServletHandler.handle(ServletHandler.java:390)
        at org.mortbay.jetty.security.SecurityHandler.handle(SecurityHandler.java:216)
        at org.mortbay.jetty.servlet.SessionHandler.handle(SessionHandler.java:182)
        at org.mortbay.jetty.handler.ContextHandler.handle(ContextHandler.java:765)
        at org.mortbay.jetty.webapp.WebAppContext.handle(WebAppContext.java:418)
        at com.google.appengine.tools.development.DevAppEngineWebAppContext.handle(DevAppEngineWebAppContext.java:98)
        at org.mortbay.jetty.servlet.Dispatcher.forward(Dispatcher.java:327)
        at org.mortbay.jetty.servlet.Dispatcher.forward(Dispatcher.java:126)
        at mussatto.servlet.RootServlet.doGet(RootServlet.java:19)
        at javax.servlet.http.HttpServlet.service(HttpServlet.java:617)
        at javax.servlet.http.HttpServlet.service(HttpServlet.java:717)
        at org.mortbay.jetty.servlet.ServletHolder.handle(ServletHolder.java:511)
        at org.mortbay.jetty.servlet.ServletHandler$CachedChain.doFilter(ServletHandler.java:1166)
        at com.google.appengine.api.socket.dev.DevSocketFilter.doFilter(DevSocketFilter.java:74)
        at org.mortbay.jetty.servlet.ServletHandler$CachedChain.doFilter(ServletHandler.java:1157)
        at com.google.appengine.tools.development.devappserver2.RequestIdFilter.doFilter(RequestIdFilter.java:36)
        at org.mortbay.jetty.servlet.ServletHandler$CachedChain.doFilter(ServletHandler.java:1157)
        at com.google.appengine.tools.development.ResponseRewriterFilter.doFilter(ResponseRewriterFilter.java:128)
        at org.mortbay.jetty.servlet.ServletHandler$CachedChain.doFilter(ServletHandler.java:1157)
        at com.google.appengine.tools.development.HeaderVerificationFilter.doFilter(HeaderVerificationFilter.java:34)
        at org.mortbay.jetty.servlet.ServletHandler$CachedChain.doFilter(ServletHandler.java:1157)
        at com.google.apphosting.utils.servlet.TransactionCleanupFilter.doFilter(TransactionCleanupFilter.java:50)
        at org.mortbay.jetty.servlet.ServletHandler$CachedChain.doFilter(ServletHandler.java:1157)
        at com.google.appengine.tools.development.StaticFileFilter.doFilter(StaticFileFilter.java:125)
        at org.mortbay.jetty.servlet.ServletHandler$CachedChain.doFilter(ServletHandler.java:1157)
        at org.mortbay.jetty.servlet.ServletHandler.handle(ServletHandler.java:388)
        at org.mortbay.jetty.security.SecurityHandler.handle(SecurityHandler.java:216)
        at org.mortbay.jetty.servlet.SessionHandler.handle(SessionHandler.java:182)
        at org.mortbay.jetty.handler.ContextHandler.handle(ContextHandler.java:765)
        at org.mortbay.jetty.webapp.WebAppContext.handle(WebAppContext.java:418)
        at com.google.appengine.tools.development.DevAppEngineWebAppContext.handle(DevAppEngineWebAppContext.java:98)
        at org.mortbay.jetty.handler.HandlerWrapper.handle(HandlerWrapper.java:152)
        at com.google.appengine.tools.development.JettyContainerService$ApiProxyHandler.handle(JettyContainerService.java:511)
        at org.mortbay.jetty.handler.HandlerWrapper.handle(HandlerWrapper.java:152)
        at org.mortbay.jetty.Server.handle(Server.java:326)
        at org.mortbay.jetty.HttpConnection.handleRequest(HttpConnection.java:542)
        at org.mortbay.jetty.HttpConnection$RequestHandler.headerComplete(HttpConnection.java:923)
        at org.mortbay.jetty.HttpParser.parseNext(HttpParser.java:547)
        at org.mortbay.jetty.HttpParser.parseAvailable(HttpParser.java:212)
        at org.mortbay.jetty.HttpConnection.handle(HttpConnection.java:404)
        at org.mortbay.io.nio.SelectChannelEndPoint.run(SelectChannelEndPoint.java:409)
        at org.mortbay.thread.QueuedThreadPool$PoolThread.run(QueuedThreadPool.java:582)

{% endhighlight %}
