import React, { useState, useEffect } from "react";
import { getAllMovies, createMovie, updateMovie, deleteMovie } from "../services/movie.service";
import { getAllActors } from "../services/actor.service";

interface Movie {
  id: number;
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
  actors?: any[];
}

interface MovieFormData {
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
  actorIds: number[];
}

const MovieManagement: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [actors, setActors] = useState<any[]>([]);
  const [formData, setFormData] = useState<MovieFormData>({
    title: "",
    genres: "",
    releaseDate: "",
    languages: "",
    countryOfOrigin: "",
    duration: 0,
    directors: "",
    producers: "",
    writers: "",
    musicDirector: "",
    posterImage: "",
    trailerVideo: "",
    awards: "",
    showtimes: "",
    theaterHall: "",
    seatAvailability: "",
    ticketPrice: 0,
    rating: 0,
    actorIds: [],
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "form">("list");
  const [actorSearchTerm, setActorSearchTerm] = useState("");
  const [showActorDropdown, setShowActorDropdown] = useState(false);

  useEffect(() => {
    fetchMovies();
    fetchActors();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.actor-dropdown-container')) {
        setShowActorDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const fetchMovies = async () => {
    try {
      const data = await getAllMovies();
      setMovies(data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const fetchActors = async () => {
    try {
      const data = await getAllActors();
      setActors(data);
    } catch (error) {
      console.error("Error fetching actors:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      genres: "",
      releaseDate: "",
      languages: "",
      countryOfOrigin: "",
      duration: 0,
      directors: "",
      producers: "",
      writers: "",
      musicDirector: "",
      posterImage: "",
      trailerVideo: "",
      awards: "",
      showtimes: "",
      theaterHall: "",
      seatAvailability: "",
      ticketPrice: 0,
      rating: 0,
      actorIds: [],
    });
    setEditingId(null);
    setViewMode("list");
    setActorSearchTerm("");
    setShowActorDropdown(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ["duration", "ticketPrice", "rating"].includes(name) ? parseFloat(value) || 0 : value
    }));
  };

  const handleActorSelection = (actorId: number) => {
    setFormData(prev => {
      const isSelected = prev.actorIds.includes(actorId);
      if (isSelected) {
        // Remove actor
        return {
          ...prev,
          actorIds: prev.actorIds.filter(id => id !== actorId)
        };
      } else {
        // Add actor
        return {
          ...prev,
          actorIds: [...prev.actorIds, actorId]
        };
      }
    });
  };

  const removeActor = (actorId: number) => {
    setFormData(prev => ({
      ...prev,
      actorIds: prev.actorIds.filter(id => id !== actorId)
    }));
  };

  const getSelectedActors = () => {
    return actors.filter(actor => formData.actorIds.includes(actor.id));
  };

  const getFilteredActors = () => {
    return actors.filter(actor => 
      actor.name.toLowerCase().includes(actorSearchTerm.toLowerCase()) &&
      !formData.actorIds.includes(actor.id)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (editingId) {
        await updateMovie(editingId, formData);
        alert("Movie updated successfully!");
      } else {
        await createMovie(formData);
        alert("Movie created successfully!");
      }
      
      resetForm();
      fetchMovies();
    } catch (error) {
      console.error("Error:", error);
      alert(`Error ${editingId ? "updating" : "creating"} movie`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (movie: Movie) => {
    setFormData({
      title: movie.title,
      genres: movie.genres,
      releaseDate: movie.releaseDate,
      languages: movie.languages,
      countryOfOrigin: movie.countryOfOrigin,
      duration: movie.duration,
      directors: movie.directors,
      producers: movie.producers,
      writers: movie.writers,
      musicDirector: movie.musicDirector,
      posterImage: movie.posterImage,
      trailerVideo: movie.trailerVideo,
      awards: movie.awards,
      showtimes: movie.showtimes,
      theaterHall: movie.theaterHall,
      seatAvailability: movie.seatAvailability,
      ticketPrice: movie.ticketPrice,
      rating: movie.rating,
      actorIds: movie.actors?.map(actor => actor.id) || [],
    });
    setEditingId(movie.id);
    setViewMode("form");
  };

  const handleDelete = async (id: number, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await deleteMovie(id);
        alert("Movie deleted successfully!");
        fetchMovies();
      } catch (error) {
        console.error("Error deleting movie:", error);
        alert("Error deleting movie");
      }
    }
  };

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.genres.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-black ml-15">
        <h2 className="text-3xl font-bold">Movie Management</h2>
        <p className="text-gray-500 mt-2">Manage movies in the cinema system</p>
      </div>

      <div className="mt-10">
        {/* Navigation Buttons */}
        <div className="mb-10 flex space-x-4">
          <button
            onClick={() => setViewMode("list")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              viewMode === "list"
                ? "bg-gradient-to-r from-[#00bba7] to-gray-600 text-white shadow-md"
                : "text-gray-600 hover:text-[#00bba7] hover:bg-gray-100"
            }`}
          >
            Movies List
          </button>
          <button
            onClick={() => {
              setViewMode("form");
              if (editingId) resetForm();
            }}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              viewMode === "form" 
                ? "bg-gradient-to-r from-[#00bba7] to-gray-600 text-white shadow-md"
                : "text-gray-600 hover:text-[#00bba7] hover:bg-gray-100"
            }`}
          >
            Add Movie
          </button>
        </div>

        {/* Form Section */}
        {viewMode === "form" && (
          <div className="mb-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Movie Information */}
              <div>
                <h4 className="text-xl font-semibold text-[#00bba7] mb-4"> Movie Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Movie Title *</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="Enter movie title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Genres</label>
                    <input
                      type="text"
                      name="genres"
                      value={formData.genres}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="Action, Drama, Comedy"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Release Date</label>
                    <input
                      type="date"
                      name="releaseDate"
                      value={formData.releaseDate}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Languages</label>
                    <input
                      type="text"
                      name="languages"
                      value={formData.languages}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="English, Sinhala, Tamil"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country of Origin</label>
                    <input
                      type="text"
                      name="countryOfOrigin"
                      value={formData.countryOfOrigin}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="Sri Lanka"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration (hours)</label>
                    <input
                      type="number"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      min="1"
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="120"
                    />
                  </div>
                </div>
              </div>

              {/* People Involved */}
              <div>
                <h4 className="text-xl font-semibold text-[#00bba7] mb-4">People Involved</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Directors</label>
                    <input
                      type="text"
                      name="directors"
                      value={formData.directors}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="Christopher Nolan, Martin Scorsese"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Producers</label>
                    <input
                      type="text"
                      name="producers"
                      value={formData.producers}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="Kevin Feige, Kathleen Kennedy"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Writers</label>
                    <input
                      type="text"
                      name="writers"
                      value={formData.writers}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="Christopher Nolan, Jonathan Nolan"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Music Director</label>
                    <input
                      type="text"
                      name="musicDirector"
                      value={formData.musicDirector}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="Hans Zimmer"
                    />
                  </div>
                </div>
              </div>

              {/* Actor Selection */}
              <div>
                <h4 className="text-xl font-semibold text-[#00bba7] mb-4">Cast Selection</h4>

                {/* Selected Actors Display */}
                {getSelectedActors().length > 0 && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Selected Actors</label>
                    <div className="flex flex-wrap gap-2">
                      {getSelectedActors().map((actor) => (
                        <div
                          key={actor.id}
                          className="bg-gradient-to-r from-[#00bba7] to-gray-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
                        >
                          <span>{actor.name}</span>
                          <button
                            type="button"
                            onClick={() => removeActor(actor.id)}
                            className="text-black hover:text-red-400 font-bold"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Actor Search and Selection */}
                <div className="relative actor-dropdown-container">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search and Add Actors</label>
                  <input
                    type="text"
                    value={actorSearchTerm}
                    onChange={(e) => {
                      setActorSearchTerm(e.target.value);
                      setShowActorDropdown(true);
                    }}
                    onFocus={() => setShowActorDropdown(true)}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="Type actor name to search"
                  />
                  
                  {/* Actor Dropdown */}
                  {showActorDropdown && actorSearchTerm && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                      {getFilteredActors().length > 0 ? (
                        getFilteredActors().map((actor) => (
                          <button
                            key={actor.id}
                            type="button"
                            onClick={() => {
                              handleActorSelection(actor.id);
                              setActorSearchTerm("");
                              setShowActorDropdown(false);
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                          >
                            <div className="font-medium">{actor.name}</div>
                            <div className="text-sm text-gray-500">{actor.email}</div>
                          </button>
                        ))
                      ) : (
                        <div className="px-4 py-2 text-gray-500 text-sm">
                          No actors found matching "{actorSearchTerm}"
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Cinema Information */}
              <div>
                <h4 className="text-xl font-semibold text-[#00bba7] mb-4">Cinema Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Showtimes</label>
                    <input
                      type="text"
                      name="showtimes"
                      value={formData.showtimes}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="10:00 AM, 2:00 PM, 6:00 PM"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Theater Hall</label>
                    <input
                      type="text"
                      name="theaterHall"
                      value={formData.theaterHall}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="Hall A, IMAX Theater"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ticket Price (Rs)</label>
                    <input
                      type="number"
                      name="ticketPrice"
                      value={formData.ticketPrice}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="12.99"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-gradient-to-r from-[#00bba7] to-gray-600 text-white rounded-lg hover:from-gray-700 hover:to-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 transform hover:scale-105"
                >
                  {isSubmitting ? "Saving..." : (editingId ? "Update Movie" : "Add Movie")}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Movies List Section */}
        {viewMode === "list" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800 pb-2">
                Movies List ({filteredMovies.length})
              </h3>
              <div className="w-64">
                <input
                  type="text"
                  placeholder="Search movies"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div className="bg-white shadow overflow-hidden rounded-lg">
              <div className="overflow-x-auto max-h-80 overflow-y-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-[#00bba7] to-gray-600 sticky top-0">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">No</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Title</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Genre</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Duration</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Price</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredMovies.length > 0 ? (
                      filteredMovies.map((movie) => (
                        <tr key={movie.id} className="hover:bg-gray-50 transition duration-150">
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {movie.id}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-900">
                            <div className="font-medium">{movie.title}</div>
                            <div className="text-xs text-gray-500">{movie.directors}</div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                            {movie.genres}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                            {movie.duration} hr
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                            Rs {movie.ticketPrice}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            <button
                              onClick={() => handleEdit(movie)}
                              className="inline-flex items-center px-3 py-1 border border-transparent text-xs leading-4 font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:border-green-300 focus:shadow-outline-green active:bg-green-200 transition ease-in-out duration-150"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(movie.id, movie.title)}
                              className="inline-flex items-center px-3 py-1 border border-transparent text-xs leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:border-red-300 focus:shadow-outline-red active:bg-red-200 transition ease-in-out duration-150"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                          {searchTerm ? "No movies found matching your search" : "No movies found"}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieManagement;
