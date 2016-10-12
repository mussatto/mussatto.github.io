---
layout: post
title:  "GoLang install on Ubuntu"
date:   2016-09-22 11:10:00
categories: golang
---

In order to install GoLang in Ubuntu, go to this [url](https://golang.org/dl/), download the tar for Linux:

```shell
wget https://storage.googleapis.com/golang/go1.7.1.linux-amd64.tar.gz
```

Install go executables in the folder ~/dev/go1.7.1/

And the GoPath in ~/dev/gohome

```shell
mkdir -p ~/dev/go1.7.1/
mkdir -p ~/dev/gopath/
tar -xvf ~/dev/go1.7.1/
```

And then set the variables:

```shell
echo 'export GOROOT=$HOME/dev/go-1.7.1/go' >> ~/.bashrc
echo 'export GOPATH=$HOME/dev/gopath' >> ~/.bashrc
export PATH=$PATH:$GOROOT/bin:$GOPATH/bin
source ~/.bashrc
```

Then test it in a terminal:

```shell
$ go version
go version go1.7.1 linux/amd64
```
