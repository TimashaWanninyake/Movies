package com.example.timtest.repo;

import com.example.timtest.models.Actor;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ActorRepository extends JpaRepository<Actor, Long> {
    @EntityGraph(attributePaths = "movies") // This ensures movies are loaded
    List<Actor> findAll();
}
