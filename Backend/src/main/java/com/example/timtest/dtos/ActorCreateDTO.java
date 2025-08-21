package com.example.timtest.dtos;

public class ActorCreateDTO {
    String name;
    String email;
    String phoneNumber;
    String identityCardNumber;
    String homeAddress;
    int age;

    public ActorCreateDTO() {
    }

    public void setName (String name) {
        this.name = name;
    }
    public String getName() {
        return name;
    }
    
    public void setEmail (String email) {
        this.email = email;
    }
    public String getEmail() {
        return email;
    }
    
    public void setPhoneNumber (String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
    public String getPhoneNumber() {
        return phoneNumber;
    }
    
    public void setIdentityCardNumber (String identityCardNumber) {
        this.identityCardNumber = identityCardNumber;
    }
    public String getIdentityCardNumber() {
        return identityCardNumber;
    }
    
    public void setHomeAddress (String homeAddress) {
        this.homeAddress = homeAddress;
    }
    public String getHomeAddress() {
        return homeAddress;
    }
    
    public void setAge (int age) {
        this.age = age;
    }
    public int getAge() {
        return age;
    }
}
