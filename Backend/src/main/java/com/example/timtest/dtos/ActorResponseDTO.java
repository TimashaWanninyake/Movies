package com.example.timtest.dtos;

import java.util.Set;

public class ActorResponseDTO {
    private Long id;
    private String name;
    private String email;
    private String phoneNumber;
    private String identityCardNumber;
    private String homeAddress;
    private int age;
    private Set<String> movieNames;

    public ActorResponseDTO(Long id, String name, int age, Set<String> movieNames) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.movieNames = movieNames;
    }

    public ActorResponseDTO(Long id, String name, String email, String phoneNumber, 
                           String identityCardNumber, String homeAddress, int age, Set<String> movieNames) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.identityCardNumber = identityCardNumber;
        this.homeAddress = homeAddress;
        this.age = age;
        this.movieNames = movieNames;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getPhoneNumber() { return phoneNumber; }
    public String getIdentityCardNumber() { return identityCardNumber; }
    public String getHomeAddress() { return homeAddress; }
    public int getAge() { return age; }
    public Set<String> getMovieNames() { return movieNames; }
}