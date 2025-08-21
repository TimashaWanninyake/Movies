import React, { useState, useEffect } from "react";
import { getAllActors, createActor, updateActor, deleteActor } from "../services/actor.service";

interface Actor {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  identityCardNumber: string;
  homeAddress: string;
  age: number;
}

interface ActorFormData {
  name: string;
  email: string;
  phoneNumber: string;
  identityCardNumber: string;
  homeAddress: string;
  age: number;
}

const ActorManagement: React.FC = () => {
  const [actors, setActors] = useState<Actor[]>([]);
  const [formData, setFormData] = useState<ActorFormData>({
    name: "",
    email: "",
    phoneNumber: "",
    identityCardNumber: "",
    homeAddress: "",
    age: 0,
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchActors();
  }, []);

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
      name: "",
      email: "",
      phoneNumber: "",
      identityCardNumber: "",
      homeAddress: "",
      age: 0,
    });
    setEditingId(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "age" ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (editingId) {
        await updateActor(editingId, formData);
        alert("Actor updated successfully!");
      } else {
        await createActor(formData);
        alert("Actor created successfully!");
      }
      
      resetForm();
      fetchActors();
    } catch (error) {
      console.error("Error:", error);
      alert(`Error ${editingId ? "updating" : "creating"} actor`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (actor: Actor) => {
    setFormData({
      name: actor.name,
      email: actor.email,
      phoneNumber: actor.phoneNumber,
      identityCardNumber: actor.identityCardNumber,
      homeAddress: actor.homeAddress,
      age: actor.age,
    });
    setEditingId(actor.id);
  };

  const handleDelete = async (id: number, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await deleteActor(id);
        alert("Actor deleted successfully!");
        fetchActors();
      } catch (error) {
        console.error("Error deleting actor:", error);
        alert("Error deleting actor");
      }
    }
  };

  const filteredActors = actors.filter(actor =>
    actor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    actor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-black ml-15 mb-5">
        <h2 className="text-3xl font-bold">Actor Management</h2>
        <p className="text-gray-500 mt-2">Manage actors in the cinema system</p>
      </div>

      <div className="pt-6">
        {/* Form Section */}
        <div className="mb-8">
          <h3 className="text-md text-center font-semibold bg-gradient-to-r from-[#00bba7] to-gray-600 text-white rounded-lg mb-4 p-2 w-[150px]">
            {editingId ? "Edit Actor" : "Add New Actor"}
          </h3>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter the full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="actor@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="0723456780"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Identity Card Number
              </label>
              <input
                type="text"
                name="identityCardNumber"
                value={formData.identityCardNumber}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="996171957V / 20016171957"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                min="1"
                max="120"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="25"
              />
            </div>

            <div className="md:col-span-2 lg:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Home Address
              </label>
              <input
                type="text"
                name="homeAddress"
                value={formData.homeAddress}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="123 Main Street, State, City"
              />
            </div>

            <div className="md:col-span-2 lg:col-span-3 flex justify-end space-x-4">
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-200"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-gradient-to-r from-[#00bba7] to-gray-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 transform hover:scale-105"
              >
                {isSubmitting ? "Saving" : (editingId ? "Update Actor" : "Add Actor")}
              </button>
            </div>
          </form>
        </div>

        {/* Actors List Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800 pb-2">
              Actors List ({filteredActors.length})
            </h3>
            <div className="w-64">
              <input
                type="text"
                placeholder="Search actors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto max-h-80 overflow-y-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-[#00bba7] to-gray-600 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Phone</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Age</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredActors.length > 0 ? (
                    filteredActors.map((actor) => (
                      <tr key={actor.id} className="hover:bg-gray-50 transition duration-150">
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {actor.id}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="font-medium">{actor.name}</div>
                          <div className="text-xs text-gray-500">ID: {actor.identityCardNumber}</div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          {actor.email}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          {actor.phoneNumber}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          {actor.age}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <button
                            onClick={() => handleEdit(actor)}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-xs leading-4 font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:border-green-300 focus:shadow-outline-green active:bg-green-200 transition ease-in-out duration-150"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(actor.id, actor.name)}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-xs leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:border-red-300 focus:shadow-outline-red active:bg-red-200 transition ease-in-out duration-150"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                        {searchTerm ? "No actors found matching your search" : "No actors found"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActorManagement;
