---
layout: post
title:  "Java - Hibernate org.hibernate.MappingException"
date:   2016-11-05 00:00:00
categories: java hibernate error fix mapping
---

Lately I have been studying JPA / Hibernate on Spring boot, and I got a strange exception on startup (on gradle bootRun): org.hibernate.MappingException.

Problem ocurred because I had mixed annotations on private attributes and public getters.

### How to fix:

Put all annotations on public getters instead of private attribute declaration

```java
@OneToOne
@JoinColumn(name = "local_user_id")
public User getUser() {
    return user;
}

@OneToOne
@JoinColumns({@JoinColumn(name = "userId", referencedColumnName = "userId"),
        @JoinColumn(name = "providerId", referencedColumnName = "providerId"),
        @JoinColumn(name = "providerUserId", referencedColumnName = "providerUserId")}
)
public UserConnection getUserConnection() {
    return userConnection;
}
```

### Error reference

```java
org.hibernate.MappingException: Could not determine type for hibernate
```

Reference

```shell
2016-11-03 15:09:31.036 ERROR 29613 --- [           main] o.s.boot.SpringApplication               : Application startup failed

org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'entityManagerFactory' defined in class path resource [org/springframework/boot/autoconfigure/orm/jpa/HibernateJpaAutoConfiguration.class]: Invocation of init method failed; nested exception is javax.persistence.PersistenceException: [PersistenceUnit: default] Unable to build Hibernate SessionFactory
        at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.initializeBean(AbstractAutowireCapableBeanFactory.java:1583) ~[spring-beans-4.3.3.RELEASE.jar:4.3.3.RELEASE]
        at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.doCreateBean(AbstractAutowireCapableBeanFactory.java:545) ~[spring-beans-4.3.3.RELEASE.jar:4.3.3.RELEASE]
        at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBean(AbstractAutowireCapableBeanFactory.java:482) ~[spring-beans-4.3.3.RELEASE.jar:4.3.3.RELEASE]
        at org.springframework.beans.factory.support.AbstractBeanFactory$1.getObject(AbstractBeanFactory.java:306) ~[spring-beans-4.3.3.RELEASE.jar:4.3.3.RELEASE]
        at org.springframework.beans.factory.support.DefaultSingletonBeanRegistry.getSingleton(DefaultSingletonBeanRegistry.java:230) ~[spring-beans-4.3.3.RELEASE.jar:4.3.3.RELEASE]
        at org.springframework.beans.factory.support.AbstractBeanFactory.doGetBean(AbstractBeanFactory.java:302) ~[spring-beans-4.3.3.RELEASE.jar:4.3.3.RELEASE]
        at org.springframework.beans.factory.support.AbstractBeanFactory.getBean(AbstractBeanFactory.java:197) ~[spring-beans-4.3.3.RELEASE.jar:4.3.3.RELEASE]
        at org.springframework.context.support.AbstractApplicationContext.getBean(AbstractApplicationContext.java:1076) ~[spring-context-4.3.3.RELEASE.jar:4.3.3.RELEASE]
        at org.springframework.context.support.AbstractApplicationContext.finishBeanFactoryInitialization(AbstractApplicationContext.java:851) ~[spring-context-4.3.3.RELEASE.jar:4.3.3.RELEASE]
        at org.springframework.context.support.AbstractApplicationContext.refresh(AbstractApplicationContext.java:541) ~[spring-context-4.3.3.RELEASE.jar:4.3.3.RELEASE]
        at org.springframework.boot.context.embedded.EmbeddedWebApplicationContext.refresh(EmbeddedWebApplicationContext.java:122) ~[spring-boot-1.4.1.RELEASE.jar:1.4.1.RELEASE]
        at org.springframework.boot.SpringApplication.refresh(SpringApplication.java:761) [spring-boot-1.4.1.RELEASE.jar:1.4.1.RELEASE]
        at org.springframework.boot.SpringApplication.refreshContext(SpringApplication.java:371) [spring-boot-1.4.1.RELEASE.jar:1.4.1.RELEASE]
        at org.springframework.boot.SpringApplication.run(SpringApplication.java:315) [spring-boot-1.4.1.RELEASE.jar:1.4.1.RELEASE]
        at org.springframework.boot.SpringApplication.run(SpringApplication.java:1186) [spring-boot-1.4.1.RELEASE.jar:1.4.1.RELEASE]
        at org.springframework.boot.SpringApplication.run(SpringApplication.java:1175) [spring-boot-1.4.1.RELEASE.jar:1.4.1.RELEASE]
        at com.mussatto.Application.main(Application.java:10) [main/:na]
Caused by: javax.persistence.PersistenceException: [PersistenceUnit: default] Unable to build Hibernate SessionFactory
        at org.hibernate.jpa.boot.internal.EntityManagerFactoryBuilderImpl.persistenceException(EntityManagerFactoryBuilderImpl.java:954) ~[hibernate-entitymanager-5.0.11.Final.jar:5.0.11.Final]
        at org.hibernate.jpa.boot.internal.EntityManagerFactoryBuilderImpl.build(EntityManagerFactoryBuilderImpl.java:882) ~[hibernate-entitymanager-5.0.11.Final.jar:5.0.11.Final]
        at org.springframework.orm.jpa.vendor.SpringHibernateJpaPersistenceProvider.createContainerEntityManagerFactory(SpringHibernateJpaPersistenceProvider.java:60) ~[spring-orm-4.3.3.RELEASE.jar:4.3.3.RELEASE]
        at org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean.createNativeEntityManagerFactory(LocalContainerEntityManagerFactoryBean.java:353) ~[spring-orm-4.3.3.RELEASE.jar:4.3.3.RELEASE]
        at org.springframework.orm.jpa.AbstractEntityManagerFactoryBean.buildNativeEntityManagerFactory(AbstractEntityManagerFactoryBean.java:373) ~[spring-orm-4.3.3.RELEASE.jar:4.3.3.RELEASE]
        at org.springframework.orm.jpa.AbstractEntityManagerFactoryBean.afterPropertiesSet(AbstractEntityManagerFactoryBean.java:362) ~[spring-orm-4.3.3.RELEASE.jar:4.3.3.RELEASE]
        at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.invokeInitMethods(AbstractAutowireCapableBeanFactory.java:1642) ~[spring-beans-4.3.3.RELEASE.jar:4.3.3.RELEASE]
        at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.initializeBean(AbstractAutowireCapableBeanFactory.java:1579) ~[spring-beans-4.3.3.RELEASE.jar:4.3.3.RELEASE]
        ... 16 common frames omitted
Caused by: org.hibernate.MappingException: Could not determine type for: com.mussatto.model.User, at table: profile, for columns: [org.hibernate.mapping.Column(user)]
        at org.hibernate.mapping.SimpleValue.getType(SimpleValue.java:431) ~[hibernate-core-5.0.11.Final.jar:5.0.11.Final]
        at org.hibernate.mapping.SimpleValue.isValid(SimpleValue.java:398) ~[hibernate-core-5.0.11.Final.jar:5.0.11.Final]
        at org.hibernate.mapping.Property.isValid(Property.java:225) ~[hibernate-core-5.0.11.Final.jar:5.0.11.Final]
        at org.hibernate.mapping.PersistentClass.validate(PersistentClass.java:595) ~[hibernate-core-5.0.11.Final.jar:5.0.11.Final]
        at org.hibernate.mapping.RootClass.validate(RootClass.java:265) ~[hibernate-core-5.0.11.Final.jar:5.0.11.Final]
        at org.hibernate.boot.internal.MetadataImpl.validate(MetadataImpl.java:329) ~[hibernate-core-5.0.11.Final.jar:5.0.11.Final]
        at org.hibernate.boot.internal.SessionFactoryBuilderImpl.build(SessionFactoryBuilderImpl.java:443) ~[hibernate-core-5.0.11.Final.jar:5.0.11.Final]
        at org.hibernate.jpa.boot.internal.EntityManagerFactoryBuilderImpl.build(EntityManagerFactoryBuilderImpl.java:879) ~[hibernate-entitymanager-5.0.11.Final.jar:5.0.11.Final]
        ... 22 common frames omitted
```
