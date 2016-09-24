---
layout: post
title:  "GoLang install on Ubuntu"
date:   2016-09-22 11:10:00
categories: golang
---

In order to install GoLang in Ubuntu, go to this [url](https://golang.org/dl/), download the tar for Linux:

{% highlight shell %}
wget https://storage.googleapis.com/golang/go1.7.1.linux-amd64.tar.gz
{% endhighlight %}

Install go executables in the folder ~/dev/go1.7.1/

And the GoPath in ~/dev/gohome

{% highlight shell %}
mkdir -p ~/dev/go1.7.1/
mkdir -p ~/dev/gopath/
tar -xvf ~/dev/go1.7.1/
{% endhighlight %}

And then set the variables:

{% highlight shell %}
echo 'export GOROOT=$HOME/dev/go-1.7.1/go' >> ~/.bashrc
echo 'export GOPATH=$HOME/dev/gopath' >> ~/.bashrc
export PATH=$PATH:$GOROOT/bin:$GOPATH/bin
source ~/.bashrc
{% endhighlight %}

Then test it in a terminal:

{% highlight shell %}
$ go version
go version go1.7.1 linux/amd64
{% endhighlight %}
