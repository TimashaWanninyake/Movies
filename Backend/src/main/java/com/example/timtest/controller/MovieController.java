package com.example.timtest.controller;

import com.example.timtest.dtos.MovieActorDTO;
import com.example.timtest.dtos.MovieCreateDTO;
import com.example.timtest.dtos.MovieUpdateDTO;
import com.example.timtest.models.Actor;
import com.example.timtest.models.Movie;
import com.example.timtest.services.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/movies")
public class MovieController {

    @Autowired
    MovieService movieService;

    @GetMapping
    public List<Movie> getMovies() {
        return movieService.getMovies();
    }

    @PostMapping
    public Movie createMovie(@RequestBody MovieCreateDTO movieCreateDTO){
        return movieService.createMovie(movieCreateDTO);
    }

    @PutMapping("/{id}")
    public Movie updateMovie(@PathVariable Long id, @RequestBody MovieUpdateDTO movieUpdateDTO){
        return movieService.updateMovie(id, movieUpdateDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteMovie(@PathVariable Long id) {
        movieService.deleteMovie(id);
    }

    @PutMapping("/{id}/actors")
    public Movie addActorsToMovie(@PathVariable Long id, @RequestBody MovieActorDTO movieActorDTO) {
        Movie updatedMovie = movieService.addActorsToMovie(id, movieActorDTO);
        return updatedMovie;
    }

    @GetMapping("/{id}")
    public Movie getMovieById(@PathVariable Long id) {
        return movieService.getMovieById(id);
    }
}