import React, { useState } from "react";
import ActorManagement from "./ActorManagement";
import MovieManagement from "./MovieManagement";

const ManagementPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"actors" | "movies">("actors");

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Tab Navigation */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab("actors")}
              className={`py-4 px-6 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === "actors"
                  ? "border-[#00bba7] text-[#00bba7]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Manage Actors
            </button>
            <button
              onClick={() => setActiveTab("movies")}
              className={`py-4 px-6 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === "movies"
                  ? "border-[#00bba7] text-[#00bba7]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Manage Movies
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto py-8">
        {activeTab === "actors" && <ActorManagement />}
        {activeTab === "movies" && <MovieManagement />}
      </div>
    </div>
  );
};

export default ManagementPage;
