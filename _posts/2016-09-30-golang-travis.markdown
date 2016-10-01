---
layout: post
title:  "Golang - Travis"
date:   2016-09-30 00:00:00
categories: golang travis
---

In this post I will describe how to setup Travis CI with GoLang on a github project.

### The setup

Go to [https://travis-ci.org/](https://travis-ci.org/) and login with your github account.


### The example

I will describe how I did the setup for Travis-CI for my [golab github project](https://github.com/mussatto/golab)

Next to the "My Repositories", click in the "+" button.

After it has synced with github, your projects your appear in the list below.

In my case, I clicked the button on the left of "mussatto/golab".

### The Changes in Code

Mainly, the thing to be done is add a file .travis.yml in the root of the git repository:


[https://docs.travis-ci.com/user/languages/go/](https://docs.travis-ci.com/user/languages/go/)
