import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Papa from 'papaparse';
import DEMO_DATA from "../../data/demo_data";

export default function MysteryBox() {
    const navigate = useNavigate();
    // const [herbName, setHerbName] = useState("Flower");
    // const [herbMedia, setHerbMedia] = useState("flower.png");
    // const [herbLocation, setHerbLocation] = useState("Massachusetts");
    const [herbId, setHerbId] = useState("");

    useEffect(() => {
        if (herbId) {
          navigate(`herb/${herbId}`);
        }
      }, [herbId]);

    const pickAHerb = () => {
        // Choose a random index based on the DEMO_DATA length
        const randomIndex = Math.floor(Math.random() * DEMO_DATA.length);
        const data = DEMO_DATA[randomIndex];

        console.log(data);
        
        if (data) {

          setHerbId(data["id"]);
        } else {
          console.error("No data found at index:", randomIndex);
        }
      };
  
  
    const handleClick = () => {
        console.log("clicked");
        pickAHerb();
        navigate(`herb/${herbId}`);
    };

    return (
        <div className="d-flex flex-column map-container align-items-center justify-content-center" style={{ width: "100vw", height: "100vh", position: "relative" }}>
           <button
                onClick={handleClick}
                style={{
                fontSize: "300px", // Increases the size of the emoji
                background: "transparent", // Removes button background
                border: "none", // Removes border
                cursor: "pointer", // Ensures it's still clickable
                padding: "0", // Removes extra padding
                }}
            >
                🎁
            </button>
        </div>
    );
}