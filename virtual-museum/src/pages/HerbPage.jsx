import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DEMO_DATA from "../../data/demo_data";
import Groq from "groq-sdk";




export default function HerbPage() {
    const { herbId } = useParams();
    const [herbName, setHerbName] = useState("Flower");
    const [herbMedia, setHerbMedia] = useState("flower.png");
    const [herbLocation, setHerbLocation] = useState("Massachusetts");
    const [herbDescription, setHerbDescription] = useState("Loading herb details...");

    useEffect(() =>{
        fetchData(herbId);
    },[])

    const fetchData = (herbId) => {
        const foundHerb = DEMO_DATA.find(herb => herb.id === herbId);
        if (!foundHerb) {
          console.error("No herb found with id:", herbId);
          return null;
        }
        const HerbName = foundHerb["scientificName.x"] || "Unknown Herb";
        const Location = foundHerb["stateProvince"] || "Unknown Location";
        const MediaUrl = foundHerb["identifier"] || "default.png";

        setHerbName(HerbName);
        setHerbLocation(Location);
        setHerbMedia(MediaUrl);

        fetchHerbDescription(HerbName);
    };

    const fetchHerbDescription = async (herbName) => {
        try {
            const response = await fetch("http://localhost:5000/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ herbName })
            });

            const data = await response.json();
            setHerbDescription(data.description);
        } catch (error) {
            console.error("Error fetching herb description:", error);
            setHerbDescription("Failed to generate description.");
        }
    };

    const navigate = useNavigate();
    const handleBack = () =>{
        navigate(-1);
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center", // Centers horizontally
                justifyContent: "center", // Centers vertically
                minHeight: "100vh", // Ensures full-screen height
                textAlign: "center", // Ensures text alignment
            }}
            >

            <h2>Congratulations! You got a {herbName}</h2>
            <img src={herbMedia} alt="Herb" height={500} />
            <p>This is found in {herbLocation}</p>
            <p><strong>Description:</strong> {herbDescription}</p>
            <button onClick={handleBack} class="btn btn-primary">Back</button>
        </div>
    );
}