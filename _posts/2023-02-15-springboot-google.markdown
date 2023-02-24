---
layout: post
title:  "Integrating Spring Boot with Google OAuth Login"
date:   2023-02-15 13:00:00
categories: java oauth google spring boot
---

# Introduction  


Before we dive in, let's first understand what OAuth is and why it is important.

OAuth is an open standard for authorization that allows users to grant third-party access to their resources without sharing their passwords. It is used by many popular websites, including Google, Facebook, and Twitter, to provide secure access to their APIs.

Now, let's get started with integrating Spring Boot with Google OAuth authentication.

## Set up a Google API Console Project  
  

To use Google OAuth authentication, you need to set up a Google API Console project. Here's how:

- Go to the Google API Console (https://console.developers.google.com/).
- Click on "Create Project" and give it a name.
- Once the project is created, select it from the project drop-down menu at the top of the console.
- Click on "Credentials" in the left-hand menu and then click on the "Create Credentials" button.
- Select "OAuth client ID" and then select "Web application".
- Enter a name for the OAuth client ID and specify the authorized JavaScript origins and redirect URIs for your application.
- Click on "Create" and you will see your client ID and client secret.

##  Configure Spring Security  
  

Next, you need to configure Spring Security to use Google OAuth authentication. Here's how:

Add the following dependencies to your Spring Boot project:  
  
```xml

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.security</groupId>
    <artifactId>spring-security-oauth2-client</artifactId>
</dependency>

```

Add the following properties to your application.properties file:  

``` bash

spring.security.oauth2.client.registration.google.client-id=your-client-id
spring.security.oauth2.client.registration.google.client-secret=your-client-secret
spring.security.oauth2.client.registration.google.scope=email,profile
spring.security.oauth2.client.provider.google.issuer-uri=https://accounts.google.com
spring.security.oauth2.client.provider.google.user-info-uri=https://www.googleapis.com/oauth2/v3/userinfo

```
  
Replace *your-client-id* and *your-client-secret* with your actual client ID and client secret.

Create a class that extends *WebSecurityConfigurerAdapter* and override the configure(HttpSecurity http) method. Here's an example:  

```java

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {
 
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .authorizeRequests()
                .antMatchers("/login/**", "/error", "/webjars/**").permitAll()
                .anyRequest().authenticated()
                .and()
            .oauth2Login()
                .loginPage("/login")
                .defaultSuccessURL("/")
                .and()
            .logout()
                .logoutSuccessUrl("/")
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID");
    }
}

```

This configuration allows unauthenticated access to the login page and static resources, requires authentication for all other requests, and sets up the OAuth2 login and logout handlers.  

## Add a Login Page  


Finally, you need to add a login page to your application. Here's an example:

```html

<!DOCTYPE html>
<html>
<head>
    <title>Login</title>
</head>
<body>
    <h1>Login</h1>
    <form action="/login/oauth2/code/google" method="post">
        <button type="submit">Login with Google</button>
    </form>
</body>
</html>

```

his login page contains a form that posts to the */login/oauth2/code/google* endpoint when the user clicks the **Login with Google** button.

That's it! You have now integrated Spring Boot with Google OAuth authentication. When a user clicks the **Login with Google** button, they will be redirected to Google's authentication page. Once they log in, they will be redirected back to your application, and their information will be available in the OAuth2User object.

Here's an example of how to retrieve the user's information in a Spring MVC controller:


```java

@GetMapping("/user")
@ResponseBody
public String getUserInfo(@AuthenticationPrincipal OAuth2User oauth2User) {
    return "Hello, " + oauth2User.getName();
}

```

This controller returns a message that greets the user by name.

# Persisting OAuth2User information  
  
  
To store the *OAuth2User* information in a database, you can use Spring Data JPA to persist the data. Here's how you can do it:


## Add Spring Data JPA Dependency  
  
  
First, you need to add the Spring Data JPA dependency to your project's *pom.xml* file:

```xml

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>


```

## Create a User Entity  
  
  
Next, you need to create an entity class that maps to a database table. Here's an example:

```java

@Entity
@Table(name = "users")
public class User {
 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
 
    private String name;
    private String email;
 
    public User() {}
 
    public User(String name, String email) {
        this.name = name;
        this.email = email;
    }
 
    // getters and setters
}

```

This entity class represents a user with a name and email address.


## Create a UserRepository Interface  
  

Next, you need to create a repository interface that extends *JpaRepository*. This interface provides methods for CRUD operations on the *User* entity. Here's an example:

```java

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}

```

This repository interface provides a method to find a user by email.


## Save the User in the Database  
  

Finally, you can save the user information in the database in the *OAuth2UserService* implementation. Here's an example:

```java

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
 
    private final UserRepository userRepository;
 
    public CustomOAuth2UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
 
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User user = super.loadUser(userRequest);
 
        Map<String, Object> attributes = user.getAttributes();
        String email = (String) attributes.get("email");
 
        Optional<User> optionalUser = userRepository.findByEmail(email);
        User dbUser;
        if (optionalUser.isPresent()) {
            dbUser = optionalUser.get();
        } else {
            String name = (String) attributes.get("name");
            dbUser = new User(name, email);
            userRepository.save(dbUser);
        }
 
        return user;
    }
}

```


This *CustomOAuth2UserService* extends the *DefaultOAuth2UserService* provided by Spring Security, and overrides the *loadUser()* method to save the user in the database if they don't exist already. It uses the *UserRepository* to find the user by email, and if not found, creates a new *User* entity and saves it in the database.

That's it! You have now integrated Spring Boot with Google OAuth authentication and stored the user information in a database using Spring Data JPA.

