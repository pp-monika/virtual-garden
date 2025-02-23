import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Papa from 'papaparse';
import DEMO_DATA from "../../data/demo_data";
import BatchPopup from "../components/popUpBatch";

export default function MysteryBox() {
    const navigate = useNavigate();
    const [herbName, setHerbName] = useState("Flower");
    const [herbMedia, setHerbMedia] = useState("flower.png");
    const [herbLocation, setHerbLocation] = useState("Massachusetts");
    const [showPopup, setShowPopup] = useState(false);
    const [herbId, setHerbId] = useState("");

    // useEffect(() => {
    //     if (herbId) {
    //       navigate(`herb/${herbId}`);
    //     }
    //   }, [herbId]);

    const pickAHerb = () => {
        // Choose a random index based on the DEMO_DATA length
        const randomIndex = Math.floor(Math.random() * DEMO_DATA.length);
        const data = DEMO_DATA[randomIndex];

        console.log(data);
        
        if (data) {
            const HerbName = data["scientificName.x"] || "Unknown Herb";
            const Location = data["stateProvince"] || "Unknown Location";
            const MediaUrl = data["identifier"] || "default.png";
    
            setHerbName(HerbName);
            setHerbLocation(Location);
            setHerbMedia(MediaUrl);
            setHerbId(data["id"]);
        } else {
          console.error("No data found at index:", randomIndex);
        }
      };
  
  
    const handleClick = () => {
        console.log("clicked");
        pickAHerb();
        setShowPopup(true);
        console.log(showPopup);
    };

    return (
        <div 
            className="d-flex flex-column map-container align-items-center justify-content-center"
            style={{ width: "100vw", height: "100vh", position: "relative" }}
        >
            <button
                onClick={handleClick}
                style={{
                    fontSize: "300px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: "0",
                }}
            >
                🎁
            </button>

            {/* Overlay should only be rendered when showPopup is true */}
            {showPopup && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        background: "rgba(0, 0, 0, 0.7)",
                        zIndex: 998, 
                    }}
                    onClick={() => setShowPopup(false)}
                />
            )}

            {/* BatchPopup should be above everything */}
            {showPopup && (
                <BatchPopup
                    image={herbMedia}
                    message="New Batch Collected"
                    onClose={() => setShowPopup(false)}
                    style={{ zIndex: 1000 }}
                />
            )}
        </div>
    );
}