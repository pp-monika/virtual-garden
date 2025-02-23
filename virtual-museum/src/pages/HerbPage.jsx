import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DEMO_DATA from "../../data/demo_data";
import BatchPopup from "../components/popUpBatch";


export default function HerbPage() {
    const { herbId } = useParams();
    const [herbName, setHerbName] = useState("Flower");
    const [herbMedia, setHerbMedia] = useState("flower.png");
    const [herbLocation, setHerbLocation] = useState("Massachusetts");
  

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
    };

    const navigate = useNavigate();
    const handleBack = () =>{
        navigate(`/`);
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
            <button onClick={handleBack} class="btn btn-primary">Back</button>
        </div>
    );
}