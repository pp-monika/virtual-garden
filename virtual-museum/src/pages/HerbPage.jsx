import { useParams, useNavigate } from "react-router-dom";
import DEMO_DATA from "../../data/demo_data";
import { useNavigate } from "react-router-dom";
import Groq from "groq-sdk";
import { useEffect } from "react";




export default function HerbPage() {
    const { herbId } = useParams();
    const navigate = useNavigate();

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

    useEffect(()=>{
        const herb = DEMO_DATA.find((h) => h.id === herbId) || {
            "scientificName.x": "Unknown Herb",
            "scientificName.y": "Unknown Herb",
            "stateProvince": "Unknown Location",
            "identifier": "default.png"
        };
        fetchHerbDescription(HerbName);
    },[])
    

    const handleBack = () =>{
        navigate(`/`);
    }

    return (
        <div className="container mt-5 d-flex align-items-center">
            <div className="row justify-content-center align-items-start w-100">
                
                {/* Left Column - Image */}
                <div className="col-md-4 text-center">
                    <img 
                        src={herb.identifier} 
                        alt={herb["scientificName.x"]} 
                        className="img-fluid rounded shadow-lg"
                        style={{ maxHeight: "70vh", objectFit: "cover" }}
                    />
                </div>

                {/* Right Column - Herb Details */}
                <div className="col-md-8 text-md-start ps-5 pt-5">
                    <h2 className="fw-bold">{herb["scientificName.x"]}</h2>
                    <p className="fs-5 text-muted">
                        Found in {herb.stateProvince}
                    </p>
                    <p><strong>Description:</strong> {herbDescription}</p>
                </div>

            </div>
        </div>
    );
}