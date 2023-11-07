---
layout: post
title:  "Spring Async"
date:   2023-02-17 13:00:00
categories: java spring async
---
  
&nbsp;  

In a world where time is a valuable resource, responsiveness is a key feature of any successful application. As a developer, you might face challenges when it comes to processing time-consuming operations, such as calling external services, processing large amounts of data, or running complex calculations. In such cases, using Spring Async can help to improve the performance and responsiveness of your Spring Boot application. In this blog post, we will explore how to use Spring Async in a cool way to achieve parallelism and improve the user experience of your Spring Boot application.

&nbsp;  

## What is Spring Async?
.
&nbsp;  

Spring Async is a feature of the Spring Framework that allows you to execute methods asynchronously, that is, in a separate thread or thread pool. By doing so, you can offload time-consuming operations from the main thread of your application, thus avoiding blocking and improving responsiveness. Spring Async is built on top of Java's native concurrency support, such as Executor and Future, and provides a high-level abstraction for managing asynchronous tasks.

&nbsp;  

## Enable Async Support in your Application

&nbsp;  

To enable Spring Async support, you need to add the @EnableAsync annotation to your Spring Boot application's configuration class. This annotation enables the creation of a TaskExecutor bean that will be used to execute the asynchronous tasks. Here's an example:

Add the dependency: 
```groovy
dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-async'
}

```` 

&nbsp;  

```java

@Configuration
@EnableAsync
public class AppConfig {
    @Bean
    public Executor taskExecutor() {
        return Executors.newFixedThreadPool(10);
    }
}


```

&nbsp;  

In this example, we create a fixed thread pool executor with 10 threads. You can customize the executor to fit your specific use case, for example, by configuring the number of threads, the thread pool type, or the thread name prefix.

&nbsp;  

## Define an Asynchronous Method

&nbsp;  


To execute a method asynchronously, you need to annotate it with the *@Async* annotation. This annotation tells Spring to execute the method in a separate thread or thread pool, managed by the *TaskExecutor* bean that we created in Step 1. Here's an example:

&nbsp;  

```java

@Service
public class MyService {
    @Async
    public CompletableFuture<String> doSomethingAsync() {
        // time-consuming operation
        return CompletableFuture.completedFuture("Done");
    }
}

```

&nbsp;  


In this example, we define a service method called *doSomethingAsync()* that returns a *CompletableFuture*. The method is annotated with the *@Async* annotation, indicating that it should be executed asynchronously. Inside the method, we perform a time-consuming operation and return a completed future with a result.

&nbsp;  

## Use the Asynchronous Method

&nbsp;  

To use the asynchronous method, you need to call it from another method in your Spring Boot application. Here's an example:

&nbsp;  

```java

@RestController
public class MyController {
    @Autowired
    private MyService myService;

    @GetMapping("/async")
    public CompletableFuture<String> handleAsyncRequest() {
        return myService.doSomethingAsync();
    }
}

```

&nbsp;  

In this example, we define a REST controller called *MyController* that injects an instance of MyService. We define a GET request handler called *handleAsyncRequest()* that calls the *doSomethingAsync()* method of MyService and returns a CompletableFuture. The CompletableFuture allows us to retrieve the result of the asynchronous operation when it's completed.

&nbsp;  

## Handle the Asynchronous Result

&nbsp;  

Here's an example of how to use the CompletableFuture API to handle the result of the asynchronous operation:

&nbsp;  

```java

@RestController
public class MyController {
    @Autowired
    private MyService myService;

    @GetMapping("/async")
    public CompletableFuture<String> handleAsyncRequest() {
        CompletableFuture<String> future = myService.doSomethingAsync();
        future.thenApply(result -> {
            // transform the result
            return "Transformed result: " + result;
        }).thenAccept(result -> {
            // consume the result
            System.out.println("Result: " + result);
        });
        return future;
    }
}

```

&nbsp;  

In this example, we call the *doSomethingAsync()* method of MyService and get a CompletableFuture object. We use the *thenApply()* method to transform the result of the asynchronous operation by adding a prefix to the string. We then use the thenAccept() method to consume the result by printing it to the console. Finally, we return the CompletableFuture object from the *handleAsyncRequest()* method, allowing the client to retrieve the result when it's available.

&nbsp;  

## Parallelize Multiple Operations
Spring Async allows you to execute multiple methods asynchronously in parallel. For example, you can use *CompletableFuture.allOf()* to execute multiple *CompletableFuture* objects in parallel and wait for all of them to complete. Here's an example:

&nbsp;  

```java
@Service
public class MyService {
    @Async
    public CompletableFuture<String> doSomethingAsync() {
        // time-consuming operation
        return CompletableFuture.completedFuture("Done");
    }

    @Async
    public CompletableFuture<String> doSomethingElseAsync() {
        // time-consuming operation
        return CompletableFuture.completedFuture("Done");
    }
}


```

&nbsp;  

```java
@RestController

public class MyController {
    @Autowired
    private MyService myService;

    @GetMapping("/parallel")
    public CompletableFuture<List<String>> handleParallelRequest() {
        CompletableFuture<String> future1 = myService.doSomethingAsync();
        CompletableFuture<String> future2 = myService.doSomethingElseAsync();
        return CompletableFuture.allOf(future1, future2)
                .thenApply(v -> Stream.of(future1, future2)
                        .map(CompletableFuture::join)
                        .collect(Collectors.toList()));
    }
}

```

&nbsp;  

In this example, we define two asynchronous methods in MyService, and we call both methods in parallel using *CompletableFuture.allOf()*. We then use the *thenApply()* method to collect the results of both methods into a list and return it to the client.

