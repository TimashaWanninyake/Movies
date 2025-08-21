package com.example.timtest.dtos;

import java.util.List;

public class MovieCreateDTO {
    private String title;
    private String genres;
    private String releaseDate;
    private String languages;
    private String countryOfOrigin;
    private int duration;
    private String directors;
    private String producers;
    private String writers;
    private String musicDirector;
    private String posterImage;
    private String trailerVideo;
    private String awards;
    private String showtimes;
    private String theaterHall;
    private String seatAvailability;
    private double ticketPrice;
    private double rating;
    private List<Long> actorIds; // List of actor IDs to assign to this movie

    //Getters and Setters
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getGenres() { return genres; }
    public void setGenres(String genres) { this.genres = genres; }
    
    public String getReleaseDate() { return releaseDate; }
    public void setReleaseDate(String releaseDate) { this.releaseDate = releaseDate; }
    
    public String getLanguages() { return languages; }
    public void setLanguages(String languages) { this.languages = languages; }
    
    public String getCountryOfOrigin() { return countryOfOrigin; }
    public void setCountryOfOrigin(String countryOfOrigin) { this.countryOfOrigin = countryOfOrigin; }
    
    public int getDuration() { return duration; }
    public void setDuration(int duration) { this.duration = duration; }
    
    public String getDirectors() { return directors; }
    public void setDirectors(String directors) { this.directors = directors; }
    
    public String getProducers() { return producers; }
    public void setProducers(String producers) { this.producers = producers; }
    
    public String getWriters() { return writers; }
    public void setWriters(String writers) { this.writers = writers; }
    
    public String getMusicDirector() { return musicDirector; }
    public void setMusicDirector(String musicDirector) { this.musicDirector = musicDirector; }
    
    public String getPosterImage() { return posterImage; }
    public void setPosterImage(String posterImage) { this.posterImage = posterImage; }
    
    public String getTrailerVideo() { return trailerVideo; }
    public void setTrailerVideo(String trailerVideo) { this.trailerVideo = trailerVideo; }
    
    public String getAwards() { return awards; }
    public void setAwards(String awards) { this.awards = awards; }
    
    public String getShowtimes() { return showtimes; }
    public void setShowtimes(String showtimes) { this.showtimes = showtimes; }
    
    public String getTheaterHall() { return theaterHall; }
    public void setTheaterHall(String theaterHall) { this.theaterHall = theaterHall; }
    
    public String getSeatAvailability() { return seatAvailability; }
    public void setSeatAvailability(String seatAvailability) { this.seatAvailability = seatAvailability; }
    
    public double getTicketPrice() { return ticketPrice; }
    public void setTicketPrice(double ticketPrice) { this.ticketPrice = ticketPrice; }
    
    public double getRating() { return rating; }
    public void setRating(double rating) { this.rating = rating; }
    
    public List<Long> getActorIds() { return actorIds; }
    public void setActorIds(List<Long> actorIds) { this.actorIds = actorIds; }
}
