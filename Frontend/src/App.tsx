
import Dashboard from "./components/Dashboard";
import ManagementPage from "./components/ManagementPage";

import { useState } from "react";

function App() {
  const [page, setPage] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Modern Navigation Bar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-gray-800">🎬 CinemaFlow</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setPage("dashboard")}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  page === "dashboard"
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setPage("manage")}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  page === "manage"
                    ? "bg-purple-600 text-white shadow-md"
                    : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
                }`}
              >
                Manage Content
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main>
        {page === "dashboard" && <Dashboard />}
        {page === "manage" && <ManagementPage />}
      </main>
    </div>
  );
}

export default App;