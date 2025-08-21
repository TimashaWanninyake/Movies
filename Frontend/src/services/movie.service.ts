import axios from "axios";

const getAllMovies = async () => {
    try {
        const response = await axios.get("http://localhost:8080/movies");
        console.log("Movies fetched successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching movies:", error);
        throw error;
    }
};

const createMovie = async (movieData: {
    title: string;
    genres: string;
    releaseDate: string;
    languages: string;
    countryOfOrigin: string;
    duration: number;
    directors: string;
    producers: string;
    writers: string;
    musicDirector: string;
    posterImage: string;
    trailerVideo: string;
    awards: string;
    showtimes: string;
    theaterHall: string;
    seatAvailability: string;
    ticketPrice: number;
    rating: number;
}) => {
    try {
        const response = await axios.post("http://localhost:8080/movies", movieData);
        console.log("Movie created successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating movie:", error);
        throw error;
    }
};

const updateMovie = async (id: number, movieData: {
    title: string;
    genres: string;
    releaseDate: string;
    languages: string;
    countryOfOrigin: string;
    duration: number;
    directors: string;
    producers: string;
    writers: string;
    musicDirector: string;
    posterImage: string;
    trailerVideo: string;
    awards: string;
    showtimes: string;
    theaterHall: string;
    seatAvailability: string;
    ticketPrice: number;
    rating: number;
    actorIds?: number[];
}) => {
    try {
        const response = await axios.put(`http://localhost:8080/movies/${id}`, movieData);
        console.log("Movie updated successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error updating movie:", error);
        throw error;
    }
};

const deleteMovie = async (id: number) => {
    try {
        await axios.delete(`http://localhost:8080/movies/${id}`);
        console.log("Movie deleted successfully");
    } catch (error) {
        console.error("Error deleting movie:", error);
        throw error;
    }
};

export { getAllMovies, createMovie, updateMovie, deleteMovie };