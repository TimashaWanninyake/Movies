package com.example.timtest.services;

import com.example.timtest.dtos.ActorCreateDTO;
import com.example.timtest.dtos.ActorResponseDTO;
import com.example.timtest.dtos.ActorUpdateDTO;
import com.example.timtest.models.Actor;
import com.example.timtest.repo.ActorRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ActorServiceImpl implements ActorService{

    @Autowired
    ActorRepository actorRepository;

    @Override
    public List<ActorResponseDTO> getAllActors() {
        return actorRepository.findAll().stream()
                .map(actor -> new ActorResponseDTO(
                        actor.getId(),
                        actor.getName(),
                        actor.getAge(),
                        actor.getMovies().stream()
                                .map(movie -> movie.getName())
                                .collect(Collectors.toSet())))
                .collect(Collectors.toList());
    }

    @Override
    public Actor createActor(ActorCreateDTO dto) {
        Actor actor = new Actor();
        actor.setAge(dto.getAge());
        actor.setName(dto.getName());
        Actor savedActor = actorRepository.save(actor);
        return savedActor;
    }

    @Override
    public Actor updateActor(int id, ActorUpdateDTO actorUpdateDTO) {
        Actor actor = actorRepository.findById((long)id).orElseThrow(() -> new RuntimeException("Actor not found"));
        actor.setName(actorUpdateDTO.getName());
        actor.setAge(actorUpdateDTO.getAge());
        Actor updatedActor = actorRepository.save(actor);
        return updatedActor;
    }

    @Override
    public void deleteActor(int id) {
        Actor actor = actorRepository.findById((long)id).orElseThrow(() -> new RuntimeException("Actor not found"));
        actorRepository.delete(actor);
        System.out.println("Actor with id " + id + " deleted successfully.");
    }

    @Override
    public ActorResponseDTO getActorById(Long id) {
        Actor actor = actorRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Actor not found with id: " + id));

        return new ActorResponseDTO(actor.getId(), actor.getName(), actor.getAge(), actor.getMovies().stream().map(movie -> movie.getName()).collect(Collectors.toSet()));
    }
}
