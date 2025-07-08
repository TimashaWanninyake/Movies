package com.example.timtest.controller;

import com.example.timtest.dtos.ActorCreateDTO;
import com.example.timtest.dtos.ActorResponseDTO;
import com.example.timtest.dtos.ActorUpdateDTO;
import com.example.timtest.models.Actor;
import com.example.timtest.services.ActorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/actors")
public class ActorController {

    @Autowired
    ActorService actorService;

    @GetMapping
    public List<ActorResponseDTO> getActors() {
        return actorService.getAllActors();
    }

    @PostMapping
    public Actor createActor(@RequestBody ActorCreateDTO actorCreateDTO) {
        return actorService.createActor(actorCreateDTO);
    }

    @PutMapping("/{id}")
    public Actor updateActor(@PathVariable int id, @RequestBody ActorUpdateDTO actorUpdateDTO) {
        return actorService.updateActor(id, actorUpdateDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteActor(@PathVariable int id) {
        actorService.deleteActor(id);
    }

    @GetMapping("/{id}")
    public ActorResponseDTO getActorById(@PathVariable Long id) {
        return actorService.getActorById(id);
    }
}
