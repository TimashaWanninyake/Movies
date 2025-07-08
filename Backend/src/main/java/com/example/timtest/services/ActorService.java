package com.example.timtest.services;


import com.example.timtest.dtos.ActorCreateDTO;
import com.example.timtest.dtos.ActorResponseDTO;
import com.example.timtest.dtos.ActorUpdateDTO;
import com.example.timtest.models.Actor;

import java.util.List;

public interface ActorService {
    List<ActorResponseDTO> getAllActors();
    Actor createActor(ActorCreateDTO actor);
    Actor updateActor(int id, ActorUpdateDTO actorUpdateDTO);
    void deleteActor(int id);

    ActorResponseDTO getActorById(Long id);
}
