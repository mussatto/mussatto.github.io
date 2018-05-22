---
layout: post
title:  "Docker Spring boot - Maven"
date:   2018-05-22 22:00:00
categories: java docker dockerize
---

This is a tutorial on how to use Docker (Dockerize) a Spring boot application using Maven

Follow the official spring tutorial [here](https://spring.io/guides/gs/serving-web-content/)

On the root folder create a new folder with a Dockerfile in it:

```
mkdir docker && touch docker/Dockerfile
```

```
FROM openjdk:8-jdk

EXPOSE 8080

COPY dockerizing-springboot-0.1.0.jar /opt/boot.jar

ENTRYPOINT java -jar /opt/boot.jar
```

Add the following lines to pom.xml (inside build -> plugins tag)

```
<plugin>
                <groupId>com.spotify</groupId>
                <artifactId>docker-maven-plugin</artifactId>
                <configuration>
                    <imageName>springbootsample</imageName>
                    <dockerDirectory>docker</dockerDirectory>
                    <resources>
                        <resource>
                            <targetPath>/</targetPath>
                            <directory>${project.build.directory}</directory>
                            <include>${project.build.finalName}.jar</include>
                        </resource>
                    </resources>
                </configuration>
            </plugin>
```

Run the command to build a new image (called springbootsample):

```
mvn clean install docker:build
```

Start the container with the following command:

```
docker run -p 8080:8080 springbootsample
```

Source code: [Link Here](https://github.com/mussatto/dockerize-springboot)