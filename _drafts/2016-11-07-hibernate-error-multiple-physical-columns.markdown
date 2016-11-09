---
layout: post
title:  "Java - Hibernate org.hibernate.DuplicateMappingException"
date:   2016-11-06 00:00:00
categories: java hibernate error fix mapping
---

This happened to me because there where multiple @JoinColumns using the same column name (user_id)

### How to fix

Set a different name for each one of the JoinColumns (defined in the name parameter):

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

### Reference error

```java
org.hibernate.DuplicateMappingException: Table [profile] contains physical column name [user_id] referred to by multiple physical column names
```


### Full stacktrace example


```shell
2016-11-03 15:12:05.336 ERROR 30112 --- [           main] o.s.boot.SpringApplication               : Application startup failed

org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'entityManagerFactory' defined in class path resource [org/springframework/boot/autoconfigure/orm/jpa/HibernateJpaAutoConfiguration.class]: Invocation of init method failed; nested exception is org.hibernate.DuplicateMappingException: Table [profile] contains physical column name [user_id] referred to by multiple physical column names: [userId], [user_id]
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
Caused by: org.hibernate.DuplicateMappingException: Table [profile] contains physical column name [user_id] referred to by multiple physical column names: [userId], [user_id]
        at org.hibernate.boot.internal.InFlightMetadataCollectorImpl$TableColumnNameBinding.bindPhysicalToLogical(InFlightMetadataCollectorImpl.java:922) ~[hibernate-core-5.0.11.Final.jar:5.0.11.Final]
        at org.hibernate.boot.internal.InFlightMetadataCollectorImpl$TableColumnNameBinding.addBinding(InFlightMetadataCollectorImpl.java:891) ~[hibernate-core-5.0.11.Final.jar:5.0.11.Final]
        at org.hibernate.boot.internal.InFlightMetadataCollectorImpl.addColumnNameBinding(InFlightMetadataCollectorImpl.java:961) ~[hibernate-core-5.0.11.Final.jar:5.0.11.Final]
        at org.hibernate.boot.internal.InFlightMetadataCollectorImpl.addColumnNameBinding(InFlightMetadataCollectorImpl.java:942) ~[hibernate-core-5.0.11.Final.jar:5.0.11.Final]
        at org.hibernate.cfg.Ejb3JoinColumn.addColumnBinding(Ejb3JoinColumn.java:788) ~[hibernate-core-5.0.11.Final.jar:5.0.11.Final]
        at org.hibernate.cfg.Ejb3Column.linkWithValue(Ejb3Column.java:369) ~[hibernate-core-5.0.11.Final.jar:5.0.11.Final]
        at org.hibernate.cfg.annotations.TableBinder.bindFk(TableBinder.java:695) ~[hibernate-core-5.0.11.Final.jar:5.0.11.Final]
        at org.hibernate.cfg.ToOneFkSecondPass.doSecondPass(ToOneFkSecondPass.java:101) ~[hibernate-core-5.0.11.Final.jar:5.0.11.Final]
        at org.hibernate.boot.internal.InFlightMetadataCollectorImpl.processEndOfQueue(InFlightMetadataCollectorImpl.java:1786) ~[hibernate-core-5.0.11.Final.jar:5.0.11.Final]
        at org.hibernate.boot.internal.InFlightMetadataCollectorImpl.processFkSecondPassesInOrder(InFlightMetadataCollectorImpl.java:1730) ~[hibernate-core-5.0.11.Final.jar:5.0.11.Final]
        at org.hibernate.boot.internal.InFlightMetadataCollectorImpl.processSecondPasses(InFlightMetadataCollectorImpl.java:1617) ~[hibernate-core-5.0.11.Final.jar:5.0.11.Final]
        at org.hibernate.boot.model.process.spi.MetadataBuildingProcess.complete(MetadataBuildingProcess.java:278) ~[hibernate-core-5.0.11.Final.jar:5.0.11.Final]
        at org.hibernate.jpa.boot.internal.EntityManagerFactoryBuilderImpl.metadata(EntityManagerFactoryBuilderImpl.java:847) ~[hibernate-entitymanager-5.0.11.Final.jar:5.0.11.Final]
        at org.hibernate.jpa.boot.internal.EntityManagerFactoryBuilderImpl.build(EntityManagerFactoryBuilderImpl.java:874) ~[hibernate-entitymanager-5.0.11.Final.jar:5.0.11.Final]
        at org.springframework.orm.jpa.vendor.SpringHibernateJpaPersistenceProvider.createContainerEntityManagerFactory(SpringHibernateJpaPersistenceProvider.java:60) ~[spring-orm-4.3.3.RELEASE.jar:4.3.3.RELEASE]
        at org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean.createNativeEntityManagerFactory(LocalContainerEntityManagerFactoryBean.java:353) ~[spring-orm-4.3.3.RELEASE.jar:4.3.3.RELEASE]
        at org.springframework.orm.jpa.AbstractEntityManagerFactoryBean.buildNativeEntityManagerFactory(AbstractEntityManagerFactoryBean.java:373) ~[spring-orm-4.3.3.RELEASE.jar:4.3.3.RELEASE]
        at org.springframework.orm.jpa.AbstractEntityManagerFactoryBean.afterPropertiesSet(AbstractEntityManagerFactoryBean.java:362) ~[spring-orm-4.3.3.RELEASE.jar:4.3.3.RELEASE]
        at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.invokeInitMethods(AbstractAutowireCapableBeanFactory.java:1642) ~[spring-beans-4.3.3.RELEASE.jar:4.3.3.RELEASE]
        at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.initializeBean(AbstractAutowireCapableBeanFactory.java:1579) ~[spring-beans-4.3.3.RELEASE.jar:4.3.3.RELEASE]
        ... 16 common frames omitted
```
