package com.example.timtest.services;

import com.example.timtest.dtos.MovieActorDTO;
import com.example.timtest.dtos.MovieCreateDTO;
import com.example.timtest.dtos.MovieUpdateDTO;
import com.example.timtest.models.Actor;
import com.example.timtest.models.Movie;
import com.example.timtest.repo.ActorRepository;
import com.example.timtest.repo.MovieRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class MovieServiceImpl implements MovieService{

    @Autowired
    MovieRepository movieRepository;

    @Override
    public List<Movie> getMovies() {
        System.out.println("get all the movies");
        return movieRepository.findAll();
    }

    @Override
    public Movie createMovie(MovieCreateDTO movieCreateDTO) {
        Movie movie = new Movie();
        movie.setName(movieCreateDTO.getName());
        movie.setRating(movieCreateDTO.getRating());
        Movie savedMovie = movieRepository.save(movie);
        return savedMovie;
    }

    @Override
    public Movie updateMovie(Long id, MovieUpdateDTO movieUpdateDTO) {
        Movie movie = movieRepository.findById(id).orElseThrow(() -> new RuntimeException("Movie not found"));
        movie.setName(movieUpdateDTO.getName());
        Movie updatedMovie = movieRepository.save(movie);
        return updatedMovie;
    }

    @Override
    public void deleteMovie(Long id) {
        Movie movie = movieRepository.findById((long)id).orElseThrow(() -> new RuntimeException("Movie not found"));
        movieRepository.delete(movie);
        System.out.println("Movie with id " + id + " deleted successfully.");
    }

    @Override
    public Movie getMovieById(Long id) {
        return movieRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Movie not found with id: " + id));
    }

    @Autowired
    private ActorRepository actorRepository;

    @Override
    public Movie addActorsToMovie(Long id, MovieActorDTO movieActorDTO) {
        Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Movie not found with id: " + id));

        Set<Actor> actors = movieActorDTO.getActorIds().stream()
                .map(actorId -> actorRepository.findById(actorId)
                        .orElseThrow(() -> new EntityNotFoundException("Actor not found with id: " + actorId)))
                .collect(Collectors.toSet());

        // Update both sides of the relationship
        for (Actor actor : actors) {
            if (!actor.getMovies().contains(movie)) {
                actor.getMovies().add(movie);
                actorRepository.save(actor); // Save the actor to update its movie relationships
            }
        }

        movie.getActors().addAll(actors);
        return movieRepository.save(movie);
    }
}
