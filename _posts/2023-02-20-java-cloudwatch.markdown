---
layout: post
title:  "Java Spring boot Cloudwatch integration"
date:   2023-02-20 13:00:00
categories: java spring boot cloudwatch integration
---
  
&nbsp;  

Add the CloudWatch dependency to your *pom.xml* file:

&nbsp;  

```xml

<dependency>
    <groupId>com.amazonaws</groupId>
    <artifactId>aws-java-sdk-cloudwatch</artifactId>
    <version>1.11.976</version>
</dependency>
<dependency>
    <groupId>io.micrometer</groupId>
    <artifactId>micrometer-core</artifactId>
    <version>1.5.5</version>
</dependency>
<dependency>
    <groupId>io.micrometer</groupId>
    <artifactId>micrometer-registry-cloudwatch2</artifactId>
    <version>1.5.5</version>
</dependency>


```

&nbsp;  

Add the following bean definition to your Spring Boot application to create the *cloudWatchAsyncClient* bean:

&nbsp;  

```java

@Bean
public CloudWatchAsyncClient cloudWatchAsyncClient() {
    return CloudWatchAsyncClient.builder().build();
}


```
&nbsp;  

This will create a new CloudWatchAsyncClient bean that can be used to send metrics to CloudWatch.

&nbsp;  

Configure the metrics registry to send metrics to CloudWatch by adding the following to your application.properties file:

&nbsp;  



```properties

management.metrics.export.cloudwatch2.namespace=spring-boot-metrics
management.metrics.export.cloudwatch2.enabled=true
management.metrics.export.cloudwatch2.batchSize=1
management.metrics.export.cloudwatch2.cloudWatchConfig.namespace=spring-boot-metrics
management.metrics.export.cloudwatch2.cloudWatchConfig.cloudWatchClient=cloudWatchAsyncClient

```

This will configure the metrics registry to export metrics to CloudWatch using the cloudWatchAsyncClient bean.

&nbsp;  

Note: Provide AWS credentials to allow the application to access CloudWatch. You can provide these credentials through environment variables or an *~/.aws/credentials* file.

&nbsp;  

Or

&nbsp;  
Use environment variables: You can set the following environment variables to provide your AWS credentials to the application:

    AWS_ACCESS_KEY_ID: Your AWS access key ID.
    AWS_SECRET_ACCESS_KEY: Your AWS secret access key.
    AWS_REGION: The AWS region where your CloudWatch log group is located.

&nbsp;  

You can set these environment variables in your operating system or in the command line when running your Spring Boot application.

&nbsp;  

Use instance profiles: If your application is running on an EC2 instance, you can create an IAM role and attach it to the instance. Then, you can configure the AWS SDK to use the instance profile credentials by setting the *aws.sdk.globalS3BucketEndpoint* and *aws.sdk.globalS3SignerType* properties to true in your *application.properties*

&nbsp;  