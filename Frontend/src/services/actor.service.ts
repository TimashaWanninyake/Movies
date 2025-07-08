import axios from "axios";

const getAllActors = async () => {
    try {
        const response = await axios.get("http://localhost:8080/actors");
        console.log("Actors fetched successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching actors:", error);
        throw error; // Re-throw to handle in component
    }
};

export { getAllActors };