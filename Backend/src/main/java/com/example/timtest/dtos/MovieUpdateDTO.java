package com.example.timtest.dtos;

public class MovieUpdateDTO {
    private String name;
    private double rating;

    //Getters and Setters
    public String getName() {
        return name;
    }
    public double getRating() {
        return rating;
    }

    public void setName(String name) {
        this.name = name;
    }
    public void setRating(double rating) {
        this.rating = rating;
    }
}
