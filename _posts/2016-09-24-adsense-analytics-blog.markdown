---
layout: post
title:  "Analytics, adsense in jekyll blog"
date:   2016-09-25 14:21:34
categories: google analytics SEO
---

In this post I will describe how I setup google analytics, google adsense and search in this blog (jekyll).


### Google Analytics

Google Analytics allows you to track who is acessing your website.

Go to [https://analytics.google.com/analytics/web/](https://analytics.google.com/analytics/web/), login and add a new account. Its in Admin, accounts -> create new account.

Then grab your tracking code, and put it somewhere in your page.

In my case, I pasted it right before the </body> tag

After a couple of minutes you should be able to see that you have been confirmed, and google analytics will grab all the statistics about your website.


### Google Adsense

Google Adsense allows you to create ads / publicity in order to have monetization (money) when users click on it.

Go to [http://www.google.be/adsense/start](http://www.google.be/adsense/start) and login.

Click on "My ads", and "+ New ad unit".

Input a name for the ad, and for Ad size chose one that fits better for your needs. I recommend using the responsive one.

Then click on "Save and get code".

Then copy the code and put it in a div element in your website that will contain the ad.

For the responsive ad, I will fill the whole size of the div.

### In jekyll

In the jekyll blog, create a div in the desired layout, and just paste the code provided by google adsense.

There is a sample code in [here](https://github.com/mussatto/mussatto.github.io/blob/master/_layouts/default.html), its the code I added to enable google stuff in this blog.
