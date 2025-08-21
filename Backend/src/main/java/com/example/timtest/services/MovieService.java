package com.example.timtest.services;

import com.example.timtest.dtos.MovieActorDTO;
import com.example.timtest.dtos.MovieCreateDTO;
import com.example.timtest.dtos.MovieUpdateDTO;
import com.example.timtest.models.Movie;
import java.util.List;

public interface MovieService {
    List<Movie> getMovies();
    Movie createMovie(MovieCreateDTO movieCreateDTO);
    Movie updateMovie(Long id, MovieUpdateDTO movieUpdateDTO);
    void deleteMovie(Long id);

    Movie getMovieById(Long id);

    public Movie addActorsToMovie(Long id, MovieActorDTO movieActorDTO);

}
