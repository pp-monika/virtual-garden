import { useParams, useNavigate } from "react-router-dom";
import DEMO_DATA_2 from "../../data/demo_data_2";
import { useEffect, useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

export default function HerbPage() {
    const { herbId } = useParams();
    const navigate = useNavigate();
    const [herbDescription, setHerbDescription] = useState("");
    const API_URL = import.meta.env.VITE_API_URL;

    const herb = DEMO_DATA_2.find((h) => h.id === herbId) || {
        "scientificName.x": "Unknown Herb",
        "family.x": "Unknown Family",
        "genus.x": "Unknown Genus",
        "stateProvince": "Unknown Location",
        "recordedBy": "Unknown Recorder",
        "eventDate": "Unknown Date",
        "identifier": "default.png"
    };

    useEffect(() => {
        fetchHerbDescription(herb["scientificName.x"]);
    }, [herb]);

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

    return (
        <div className="pt-5" style={{ height: "100vh", backgroundColor: "#faf5e6" }}>
            {/* Back Button */}
            <div className="my-3" style={{ marginLeft: "45px" }}>
                <button onClick={() => navigate(-1)} className="btn btn-primary">
                    ← Back to collection
                </button>
            </div>
            <div className="row justify-content-center align-items-start w-100">
                
                {/* Left Column - Plant Image with Zoom */}
                <div className="col-md-4 text-center">
                    <Zoom>
                        <img 
                            src={herb.identifier} 
                            alt={herb["scientificName.x"]} 
                            className="img-fluid rounded shadow-lg"
                            style={{ maxHeight: "70vh", objectFit: "cover", cursor: "zoom-in" }}
                        />
                    </Zoom>
                </div>

                {/* Right Column - Card for Plant Details */}
                <div className="col-md-8 pe-5">
                    <div className="card shadow-sm p-4" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)", border: "none", borderRadius: "10px" }}>
                        <h2 className="fw-bold card-title">{herb["scientificName.x"]}</h2>
                        <div className="card-body">
                            <p className="fs-5">📍 Found in <strong>{herb.county ? `${herb.county}, ` : ""} {herb.stateProvince}</strong></p>
                            {herb.recordedBy && <p className="fs-5">🧑 {`Recorded by ${herb.recordedBy}`}</p>}
                            <p className="fs-5">📅 Date: <strong>{herb.eventDate ? herb.eventDate : "Unknown"}</strong></p>
                            <p className="fs-5 text-muted">🌿 Family: {herb["family.x"]}</p>
                            <p className="fs-5 text-muted">🌱 Genus: {herb["genus.x"]}</p>
                            <p className="fs-6"><strong>📝 AI-generated Description:</strong> {herbDescription}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}