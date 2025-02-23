import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import MysteryBox from "../components/mysteryBox";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleLog } from "d3-scale"; // Logarithmic scale for better shading
import DEMO_DATA_2 from "../../data/demo_data_2";
import DEMO_DATA_LOCATION from "../../data/demo_data_location";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

export default function HerbPage() {
    const { herbId } = useParams();
    const navigate = useNavigate();
    const [herbDescription, setHerbDescription] = useState("");
    const API_URL = import.meta.env.VITE_API_URL;

    // Find herb from JSON
    const herb = DEMO_DATA_2.find((h) => h.id === herbId) || {
        "scientificName.x": "Unknown Herb",
        "family.x": "Unknown Family",
        "genus.x": "Unknown Genus",
        "stateProvince": "Unknown Location",
        "county": "Unknown County",
        "country": "Unknown Country",
        "recordedBy": "Unknown Recorder",
        "eventDate": "Unknown Date",
        "identifier": "default.png"
    };

    // Fetch AI-generated description
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

    useEffect(() => {
        fetchHerbDescription(herb["scientificName.x"]);
    }, [herb]);

    // 🔥 Extract occurrences from DEMO_DATA_LOCATION for this species
    const stateCounts = {};
    DEMO_DATA_LOCATION.forEach((entry) => {
        if (entry.scientificName === herb["scientificName.x"]) {
            stateCounts[entry.stateProvince] = entry.count;
        }
    });

    // 🔥 Logarithmic color scale for smooth transitions
    const maxCount = Math.max(...Object.values(stateCounts), 1);
    const colorScale = scaleLog()
        .domain([1, maxCount])
        .range(["#c7e9c0", "#00441b"]); // Green theme

    return (
        <div className="pt-5" style={{ minHeight: "100vh", backgroundColor: "#faf5e6" }}>
            {/* Back Button */}
            <div className="my-3 ms-4">
                <button onClick={() => navigate(-1)} className="btn btn-primary">
                    ← Back to collection
                </button>
            </div>

            {/* Layout Section */}
            <div className="container">
                <div className="row justify-content-center align-items-start">
                    {/* Left Column - Plant Image */}
                    <div className="col-md-4 text-center">
                        <img 
                            src={herb.identifier} 
                            alt={herb["scientificName.x"]} 
                            className="img-fluid rounded shadow-lg"
                            style={{ maxHeight: "70vh", objectFit: "cover" }}
                        />
                    </div>

                    {/* Right Column - Plant Details & Map */}
                    <div className="col-md-8">
                        {/* Plant Details */}
                        <div className="card shadow-sm p-4 mb-4" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)", border: "none", borderRadius: "10px" }}>
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

                        {/* 🔥 Heatmap Section (Now Below the Plant Details) */}
                        <div className="card shadow-sm p-4" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)", border: "none", borderRadius: "10px" }}>
                            <h2 className="text-center fw-bold py-3">Species Occurrence Map</h2>
                            <ComposableMap projection="geoAlbersUsa" style={{ width: "100%", height: "500px" }}>
                                <Geographies geography={geoUrl}>
                                    {({ geographies }) =>
                                        geographies.map((geo) => {
                                            const stateName = geo.properties.name;
                                            const count = stateCounts[stateName] || 0;
                                            return (
                                                <Geography
                                                    key={geo.rsmKey}
                                                    geography={geo}
                                                    fill={count > 0 ? colorScale(count) : "#f0fdf4"} // Default light green
                                                    stroke="white"
                                                    strokeWidth={1}
                                                    style={{
                                                        default: { outline: "none" },
                                                        hover: { fill: "#238b45", cursor: "pointer" },
                                                        pressed: { fill: "#00441b" },
                                                    }}
                                                />
                                            );
                                        })
                                    }
                                </Geographies>
                            </ComposableMap>
                        </div>
                    </div>
                    
                </div>
            </div>
            <MysteryBox />
        </div>
    );
}