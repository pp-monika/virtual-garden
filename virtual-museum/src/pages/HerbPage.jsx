import { useParams, useNavigate } from "react-router-dom";
import DEMO_DATA from "../../data/demo_data";
import Groq from "groq-sdk";
import { useEffect, useState } from "react";

export default function HerbPage() {
    const { herbId } = useParams();
    const navigate = useNavigate();
    const [herbDescription, setHerbDescription] = useState("")
    const API_URL = import.meta.env.VITE_API_URL;
    const herb = DEMO_DATA.find((h) => h.id === herbId) || {
        "scientificName.x": "Unknown Herb",
        "family.x": "Unknown Family",
        "genus.x": "Unknown Genus",
        "stateProvince": "Unknown Location",
        "recordedBy": "Unknown Recorder",
        "eventDate": "Unknown Date",
        "identifier": "default.png"
    };

    const fetchHerbDescription = async (herbName) => {
        try {
            const response = await fetch(`${API_URL}/api/generate`, {
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

    useEffect(()=>{
        fetchHerbDescription(herb["scientificName.x"]);
    },[herb])
    

    return (
        <div className="pt-5" style={{height: "100vh", backgroundColor: "#faf5e6"}}>
            <div className="row justify-content-center align-items-start w-100">
                
                {/* Left Column - Plant Image */}
                <div className="col-md-4 text-center">
                    <img 
                        src={herb.identifier} 
                        alt={herb["scientificName.x"]} 
                        className="img-fluid rounded shadow-lg"
                        style={{ maxHeight: "70vh", objectFit: "cover" }}
                    />
                </div>

                {/* Right Column - Plant Details */}
                <div className="col-md-8 text-md-start ps-5 pt-3">
                    <h2 className="fw-bold">{herb["scientificName.x"]}</h2>
                    <p className="fs-5 text-muted">
                        Found in {herb.stateProvince}
                    </p>
                    <p className="fs-5 text-muted">Family: {herb["family.x"]}</p>
                    <p className="fs-5 text-muted">Genus: {herb["genus.x"]}</p>
                    <p className="fs-5">📍 Found in <strong>{herb.county ? `${herb.county}, ` : ""} {herb.stateProvince}</strong></p>
                    <p className="fs-5">🧑 Recorded by: <strong>{herb.recordedBy ? herb.recordedBy : "No data available"}</strong></p>
                    <p className="fs-5">📅 Date: <strong>{herb.eventDate ? herb.eventDate : "Unknown"}</strong></p>
                    <p><strong>AI-generated Description:</strong> {herbDescription}</p>
                    
                    {/* Back Button */}
                    <button onClick={() => navigate(-1)} className="btn btn-primary mt-3">
                        ← Back
                    </button>
                </div>

            </div>
        </div>
    );
}