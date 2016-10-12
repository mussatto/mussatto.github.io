---
layout: post
title:  "GAE Testing: Java DAO / persistence"
date:   2015-07-05 23:20:00
categories: GAE java coding
---

I am using appengine + gradle + junit, and it took me a while to find the right libraries and documentation when testing the persitence, so I am writing this down in case this helps someone.

On gradle, the required libs are:

```groovy
dependencies {
  //...
  testCompile 'junit:junit:4.12'    
  testCompile 'com.google.appengine:appengine-testing:1.9.21'
  testCompile 'com.google.appengine:appengine-api-stubs:1.9.21'
}
```

A sample test:

```java
public class DAOTest {

  private final LocalServiceTestHelper helper =
          new LocalServiceTestHelper(new LocalDatastoreServiceTestConfig());

  @Before
  public void setUp() {
    helper.setUp();
  }

  @After
  public void tearDown(){
    helper.tearDown();
  }

  @Test
  public void testPersistence(){
    Key prayerKey = KeyFactory.createKey("MyEntity", "key");
    Entity entity = new Entity("MyEntity", prayerKey);
    entity.setProperty("content", prayer.getContent());
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    datastore.put(entity);
  }
}

```
