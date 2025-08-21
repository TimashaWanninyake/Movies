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

    @Autowired
    ActorRepository actorRepository;

    @Override
    public List<Movie> getMovies() {
        System.out.println("get all the movies");
        return movieRepository.findAll();
    }

    @Override
    public Movie createMovie(MovieCreateDTO movieCreateDTO) {
        Movie movie = new Movie();
        movie.setTitle(movieCreateDTO.getTitle());
        movie.setGenres(movieCreateDTO.getGenres());
        movie.setReleaseDate(movieCreateDTO.getReleaseDate());
        movie.setLanguages(movieCreateDTO.getLanguages());
        movie.setCountryOfOrigin(movieCreateDTO.getCountryOfOrigin());
        movie.setDuration(movieCreateDTO.getDuration());
        movie.setDirectors(movieCreateDTO.getDirectors());
        movie.setProducers(movieCreateDTO.getProducers());
        movie.setWriters(movieCreateDTO.getWriters());
        movie.setMusicDirector(movieCreateDTO.getMusicDirector());
        movie.setPosterImage(movieCreateDTO.getPosterImage());
        movie.setTrailerVideo(movieCreateDTO.getTrailerVideo());
        movie.setAwards(movieCreateDTO.getAwards());
        movie.setShowtimes(movieCreateDTO.getShowtimes());
        movie.setTheaterHall(movieCreateDTO.getTheaterHall());
        movie.setSeatAvailability(movieCreateDTO.getSeatAvailability());
        movie.setTicketPrice(movieCreateDTO.getTicketPrice());
        movie.setRating(movieCreateDTO.getRating());
        
        // Save movie first
        Movie savedMovie = movieRepository.save(movie);
        
        // Add actors if provided
        if (movieCreateDTO.getActorIds() != null && !movieCreateDTO.getActorIds().isEmpty()) {
            Set<Actor> actors = movieCreateDTO.getActorIds().stream()
                    .map(actorId -> actorRepository.findById(actorId)
                            .orElseThrow(() -> new EntityNotFoundException("Actor not found with id: " + actorId)))
                    .collect(Collectors.toSet());
            savedMovie.setActors(actors);
            savedMovie = movieRepository.save(savedMovie);
        }
        
        return savedMovie;
    }

    @Override
    public Movie updateMovie(Long id, MovieUpdateDTO movieUpdateDTO) {
        Movie movie = movieRepository.findById(id).orElseThrow(() -> new RuntimeException("Movie not found"));
        
        // Update all fields
        movie.setTitle(movieUpdateDTO.getTitle());
        movie.setGenres(movieUpdateDTO.getGenres());
        movie.setReleaseDate(movieUpdateDTO.getReleaseDate());
        movie.setLanguages(movieUpdateDTO.getLanguages());
        movie.setCountryOfOrigin(movieUpdateDTO.getCountryOfOrigin());
        movie.setDuration(movieUpdateDTO.getDuration());
        movie.setDirectors(movieUpdateDTO.getDirectors());
        movie.setProducers(movieUpdateDTO.getProducers());
        movie.setWriters(movieUpdateDTO.getWriters());
        movie.setMusicDirector(movieUpdateDTO.getMusicDirector());
        movie.setPosterImage(movieUpdateDTO.getPosterImage());
        movie.setTrailerVideo(movieUpdateDTO.getTrailerVideo());
        movie.setAwards(movieUpdateDTO.getAwards());
        movie.setShowtimes(movieUpdateDTO.getShowtimes());
        movie.setTheaterHall(movieUpdateDTO.getTheaterHall());
        movie.setSeatAvailability(movieUpdateDTO.getSeatAvailability());
        movie.setTicketPrice(movieUpdateDTO.getTicketPrice());
        movie.setRating(movieUpdateDTO.getRating());
        
        // Update actors if provided
        if (movieUpdateDTO.getActorIds() != null && !movieUpdateDTO.getActorIds().isEmpty()) {
            Set<Actor> actors = movieUpdateDTO.getActorIds().stream()
                    .map(actorId -> actorRepository.findById(actorId)
                            .orElseThrow(() -> new EntityNotFoundException("Actor not found with id: " + actorId)))
                    .collect(Collectors.toSet());
            movie.setActors(actors);
        }
        
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
