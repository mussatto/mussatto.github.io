---
layout: post
title:  "Java 8 - Stream / Get All Elements"
date:   2017-06-05 22:00:00
categories: java 8 stream
---

Hereby a few examples about how to use stream + filter to get all elements matching some kind of conditions.

### Example 1 - Integer array

```java
List<Integer> listTest = DataFactory.createListInteger(10);
List<Integer> returnedList = listTest.stream().filter(i -> i % 2 ==0).collect(Collectors.toList());

assertTrue(returnedList.size() > 0);
assertTrue(returnedList.size() != 10);
assertTrue(returnedList.get(0) == 0);
assertTrue(returnedList.get(1) == 2);
assertTrue(returnedList.get(2) == 4);
```

### Example 2 - get all ids from object

```java
package lab.j8;

public class Customer {

    private Integer id;
    private String name;

    public Customer(Integer id, String name) {
        this.id = id;
        this.name = name;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

```

```java
List<Customer> customers = DataFactory.createCustomers(10);
List<Integer> filteredCustomersId = customers.stream().filter(c -> c.getId() % 2 ==0)
        .mapToInt(Customer::getId).boxed().collect(Collectors.toList());

assertTrue(filteredCustomersId.size() > 0);
assertTrue(filteredCustomersId.size() != 10);
assertTrue(filteredCustomersId.size() == 6);
assertTrue(filteredCustomersId.get(0) == 0);
assertTrue(filteredCustomersId.get(1) == 2);
assertTrue(filteredCustomersId.get(2) == 4);
```

### The code repo

[Github Link](https://github.com/mussatto/java8lab)