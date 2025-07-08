package com.example.timtest.dtos;

import java.util.Set;

public class ActorResponseDTO {
    private Long id;
    private String name;
    private int age;
    private Set<String> movieNames;

    public ActorResponseDTO(Long id, String name, int age, Set<String> movieNames) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.movieNames = movieNames;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public int getAge() { return age; }
    public Set<String> getMovieNames() { return movieNames; }
}