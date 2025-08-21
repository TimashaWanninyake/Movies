package com.example.timtest.dtos;
import java.util.Set;

public class MovieActorDTO {
    private Set<Long> actorIds; //We can add multiple actors at once to a movie using a List

    public Set<Long> getActorIds() {
        return actorIds;
    }

    public void setActorIds(Set<Long> actorIds) {
        this.actorIds = actorIds;
    }
}
