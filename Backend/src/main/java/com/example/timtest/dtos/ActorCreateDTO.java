package com.example.timtest.dtos;

import com.example.timtest.models.Actor;

public class ActorCreateDTO {
    String name;
    int age;

    public ActorCreateDTO(Actor actor) {
    }

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
