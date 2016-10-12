---
layout: post
title:  "Install Maven Ubuntu"
date:   2016-10-02 00:00:00
categories: java maven install ubuntu
---

In this post I will describe the install steps for maven on Ubuntu 14.04.

### Download the binary

Go to [Maven Download](https://maven.apache.org/download.cgi) and download the binary .tar.gz:

```shell

mkdir ~/dev
cd dev
wget http://www-us.apache.org/dist/maven/maven-3/3.3.9/binaries/apache-maven-3.3.9-bin.tar.gz
tar -xvf apache-maven-3.3.9-bin.tar.gz

```


### Setup the environment tools

edit the file ~/.bashrc, and add the lines:

```shell

export M2_HOME=/home/mussatto/dev/apache-maven-3.3.9
export M2=$M2_HOME/bin
export MAVEN_OPTS="-Xms256m -Xmx1024m"
export PATH=$PATH:$M2

```

Export the .bashrc file:

```shell

source ~/.bashrc

```


### Test the install

```shell

~ $ mvn --version
Apache Maven 3.3.9 (bb52d8502b132ec0a5a3f4c09453c07478323dc5; 2015-11-10T17:41:47+01:00)
Maven home: /home/mussatto/dev/apache-maven-3.3.9
Java version: 1.8.0_101, vendor: Oracle Corporation
Java home: /usr/lib/jvm/java-8-oracle/jre
Default locale: en_GB, platform encoding: UTF-8
OS name: "linux", version: "3.19.0-32-generic", arch: "amd64", family: "unix"

```
