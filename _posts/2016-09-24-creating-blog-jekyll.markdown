---
layout: post
title:  "Creating a blog on github pages with Jekyll"
date:   2016-09-24 00:00:00
categories: jekyll blog
---
#### WAT?
I am creating this post to describe how I setup the local environment for developing a blog in Jekyll + github pages.

#### On github:

Create a repository in the pattern: YOURUSERNAME.github.io (change YOURUSERNAME with your username in github)

Install [rbenv](https://github.com/rbenv/rbenv)

{% highlight shell %}
$ git clone https://github.com/rbenv/rbenv.git ~/.rbenv
$ echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
$ ~/.rbenv/bin/rbenv init
$ source ~/.bashrc
$ rbenv install 2.3.1
{% endhighlight %}

#### Then test your ruby installation:

{% highlight shell %}
$ ruby --version
ruby 2.3.1p112 (2016-04-26 revision 54768) [x86_64-linux]
{% endhighlight %}

#### Install the Jekyll gem:

{% highlight shell %}
$ gem install jekyll
{% endhighlight %}

#### Create a new site with Jekyll, and add git stuff:

{% highlight shell %}
$ jekyll new YOURUSERNAME.github.io
$ cd YOURUSERNAME.github.io
$ git init
$ git remote add origin git@github.com:YOURUSERNAME/YOURUSERNAME.github.io.git
{% endhighlight %}

Test Jekyll locally:

{% highlight shell %}
$ jekyll serve
{% endhighlight %}

You should be able to access your site or blog by typing in your browser [http://localhost:4000/](http://localhost:4000/).

Then perform changes you want and just push it to your repository:
{% highlight shell %}
$ git push origin master
{% endhighlight %}

With this, you should be able to see your site / blog in a browser by typing the url: [YOURUSERNAME.github.io](YOURUSERNAME.github.io)
