package com.example.timtest.dtos;

import com.example.timtest.models.Movie;

import java.util.Set;

public class ActorUpdateDTO {
    String name;
    int age;

    public void setName (String name) {
        this.name = name;
    }
    public String getName() {
        return name;
    }

    public void setAge (int age) {
        this.age = age;
    }
    public int getAge() {
        return age;
    }

}
