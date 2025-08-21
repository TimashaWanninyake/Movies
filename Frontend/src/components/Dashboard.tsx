import React, { useEffect, useState } from "react";
import { getAllActors } from "../services/actor.service";
import { getAllMovies } from "../services/movie.service";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const Dashboard: React.FC = () => {
  const [actors, setActors] = useState<any[]>([]);
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    getAllActors().then(setActors);
    getAllMovies().then(setMovies);
  }, []);

  // Calculate movies per actor
  const actorMovieCount: { [key: string]: number } = {};
  actors.forEach((actor) => {
    actorMovieCount[actor.name] = movies.filter((movie: any) =>
      movie.actors?.some((a: any) => a.id === actor.id)
    ).length;
  });

  const barData = {
    labels: Object.keys(actorMovieCount),
    datasets: [
      {
        label: "Number of Movies",
        data: Object.values(actorMovieCount),
        backgroundColor: "rgba(156, 163, 175, 1)",
        borderColor: "#00bba7",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Movies per Actor',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          callback: function(value: any) {
            if (Number.isInteger(value)) {
              return value;
            }
          }
        }
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="text-black pl-17 p-8 mb-8">
        <h1 className="text-3xl font-bold">Movie Management Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to the movie and actor management system</p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#00bba7]">
          <div className="flex items-center">
            <div className="p-3 bg-gray-200 rounded-full">
              <span className="text-2xl">👤</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-black">Total Actors</h3>
              <p className="text-3xl font-bold text-black">{actors.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#00bba7]">
          <div className="flex items-center">
            <div className="p-3 bg-gray-200 rounded-full">
              <span className="text-2xl">🎬</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-black">Total Movies</h3>
              <p className="text-3xl font-bold text-black">{movies.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Actors Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-[#00bba7] to-gray-600 text-white p-4">
            <h3 className="text-xl font-semibold">Actors Directory</h3>
          </div>
          <div className="overflow-x-auto max-h-80 overflow-y-auto">
            <table className="w-full">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {actors.length > 0 ? (
                  actors.map((actor) => (
                    <tr key={actor.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {actor.id}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {actor.name}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {actor.phoneNumber || "N/A"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-4 py-8 text-center text-gray-500">
                      No actors found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Movies Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-[#00bba7] to-gray-600 text-white p-4">
            <h3 className="text-xl font-semibold">Movies Collection</h3>
          </div>
          <div className="overflow-x-auto max-h-80 overflow-y-auto">
            <table className="w-full">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Genres</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Language</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Director</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {movies.length > 0 ? (
                  movies.map((movie) => (
                    <tr key={movie.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {movie.id}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {movie.title || movie.name}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {movie.genres || "N/A"}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {movie.languages || "N/A"}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {movie.directors || "N/A"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                      No movies found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="p-6 mb-8 mt-10">
        <h3 className="text-2xl font-bold text-black mb-4">Actor Performance Chart</h3>
        {Object.keys(actorMovieCount).length > 0 ? (
          <div className="h-150 w-200">
            <Bar data={barData} options={chartOptions} />
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No data available for chart</p>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default Dashboard;
