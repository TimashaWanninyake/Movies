import axios from "axios";

const getAllActors = async () => {
    try {
        const response = await axios.get("http://localhost:8080/actors");
        console.log("Actors fetched successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching actors:", error);
        throw error;
    }
};

const createActor = async (actorData: { 
    name: string; 
    email: string;
    phoneNumber: string;
    identityCardNumber: string;
    homeAddress: string;
    age: number; 
}) => {
    try {
        const response = await axios.post("http://localhost:8080/actors", actorData);
        console.log("Actor created successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating actor:", error);
        throw error;
    }
};

const updateActor = async (id: number, actorData: { 
    name: string; 
    email: string;
    phoneNumber: string;
    identityCardNumber: string;
    homeAddress: string;
    age: number; 
}) => {
    try {
        const response = await axios.put(`http://localhost:8080/actors/${id}`, actorData);
        console.log("Actor updated successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error updating actor:", error);
        throw error;
    }
};

const deleteActor = async (id: number) => {
    try {
        await axios.delete(`http://localhost:8080/actors/${id}`);
        console.log("Actor deleted successfully");
    } catch (error) {
        console.error("Error deleting actor:", error);
        throw error;
    }
};

export { getAllActors, createActor, updateActor, deleteActor };