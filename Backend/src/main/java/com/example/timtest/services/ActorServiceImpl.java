package com.example.timtest.services;

import com.example.timtest.dtos.ActorCreateDTO;
import com.example.timtest.dtos.ActorResponseDTO;
import com.example.timtest.dtos.ActorUpdateDTO;
import com.example.timtest.models.Actor;
import com.example.timtest.repo.ActorRepository;
import com.example.timtest.repo.MovieRepository;
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
                        actor.getEmail(),
                        actor.getPhoneNumber(),
                        actor.getIdentityCardNumber(),
                        actor.getHomeAddress(),
                        actor.getAge(),
                        actor.getMovies().stream()
                                .map(movie -> movie.getTitle())
                                .collect(Collectors.toSet())))
                .collect(Collectors.toList());
    }

    @Override
    public Actor createActor(ActorCreateDTO dto) {
        Actor actor = new Actor();
        actor.setName(dto.getName());
        actor.setEmail(dto.getEmail());
        actor.setPhoneNumber(dto.getPhoneNumber());
        actor.setIdentityCardNumber(dto.getIdentityCardNumber());
        actor.setHomeAddress(dto.getHomeAddress());
        actor.setAge(dto.getAge());
        Actor savedActor = actorRepository.save(actor);
        return savedActor;
    }

    @Override
    public Actor updateActor(int id, ActorUpdateDTO actorUpdateDTO) {
        Actor actor = actorRepository.findById((long)id).orElseThrow(() -> new RuntimeException("Actor not found"));
        actor.setName(actorUpdateDTO.getName());
        actor.setEmail(actorUpdateDTO.getEmail());
        actor.setPhoneNumber(actorUpdateDTO.getPhoneNumber());
        actor.setIdentityCardNumber(actorUpdateDTO.getIdentityCardNumber());
        actor.setHomeAddress(actorUpdateDTO.getHomeAddress());
        actor.setAge(actorUpdateDTO.getAge());
        Actor updatedActor = actorRepository.save(actor);
        return updatedActor;
    }

    @Autowired
    MovieRepository movieRepository;

    @Override
    public void deleteActor(int id) {
        Actor actor = actorRepository.findById((long) id)
                .orElseThrow(() -> new RuntimeException("Actor not found"));

        // 1. Remove actor from all movies first
        if (!actor.getMovies().isEmpty()) {
            actor.getMovies().forEach(movie -> {
                movie.getActors().remove(actor); // Remove actor from movie
                movieRepository.save(movie); // Update movie
            });
        }

        // 2. Now delete the actor
        actorRepository.delete(actor);
        System.out.println("Actor with id " + id + " deleted successfully.");
    }

    @Override
    public ActorResponseDTO getActorById(Long id) {
        Actor actor = actorRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Actor not found with id: " + id));

        return new ActorResponseDTO(actor.getId(), actor.getName(), actor.getEmail(), 
                                  actor.getPhoneNumber(), actor.getIdentityCardNumber(), 
                                  actor.getHomeAddress(), actor.getAge(), 
                                  actor.getMovies().stream().map(movie -> movie.getTitle()).collect(Collectors.toSet()));
    }
}
