import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Papa from 'papaparse';
import DEMO_DATA from "../../data/demo_data";
import BatchPopup from "../components/popUpBatch";
import { Modal, Button } from "react-bootstrap";
import fs from "fs";

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
            // Get existing stored herbs from localStorage
            let storedHerbs = JSON.parse(localStorage.getItem("collections")) || [];

            // Append new herbId to the list
            storedHerbs.push(herbId);

            // Save back to localStorage
            localStorage.setItem("collections", JSON.stringify(storedHerbs));

            console.log("Herb ID saved to localStorage:", herbId);
            

        } else {
          console.error("No data found at index:", randomIndex);
        }
      };
  
  
    const handleClick = () => {
        console.log("clicked");
        pickAHerb();
        setShowPopup(true);
    };

    const handleHerbPage = () => {
        navigate(`herb/${herbId}`);
    };

    return (
        <div
            className="d-flex flex-column map-container align-items-center justify-content-center"
            style={{ width: "100vw", height: "100vh", position: "relative" }}
        >
            <p style={{ fontSize: "2rem", marginBottom: "1rem" }}>Try what's inside!</p>
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

            {/* Bootstrap Modal for Popup */}
            <Modal
                show={showPopup}
                onHide={() => setShowPopup(false)}
                centered
                backdrop="static"
                dialogClassName="large-modal"
            >
                <Modal.Body className="text-center">
                    {/* New Collection Banner */}
                    <div
                        style={{
                            background: "#ffcc00", // Yellow banner
                            color: "black",
                            fontSize: "22px",
                            fontWeight: "bold",
                            padding: "10px",
                            borderTopLeftRadius: "10px",
                            borderTopRightRadius: "10px",
                            textAlign: "center",
                            position: "relative",
                            top: "-10px",
                        }}
                    >
                        🎉 New Collection! 🎉
                    </div>

                    {/* Image Container */}
                    <div
                        style={{
                            position: "relative",
                            width: "320px", // Increased size
                            height: "320px",
                            margin: "auto",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "white",
                            borderRadius: "50%",
                            boxShadow: "0 6px 16px rgba(0, 0, 0, 0.4)",
                            padding: "20px",
                        }}
                    >
                        <img
                            src={herbMedia}
                            alt="Herb Icon"
                            style={{
                                width: "280px",
                                height: "280px",
                                borderRadius: "50%",
                                boxShadow: "0 6px 16px rgba(0, 0, 0, 0.4)",
                            }}
                        />
                    </div>

                    {/* Herb Name */}
                    <p
                        style={{
                            fontSize: "24px",
                            fontWeight: "bold",
                            color: "#333",
                            marginTop: "15px",
                            textAlign: "center",
                        }}
                    >
                        🌿 {herbName} 🌿
                    </p>
                </Modal.Body>

                {/* Buttons */}
                <Modal.Footer
                    className="d-flex justify-content-center"
                    style={{ borderTop: "none", paddingBottom: "20px" }}
                >
                    <Button
                        variant="success"
                        onClick={() => handleHerbPage()}
                        style={{
                            fontSize: "18px",
                            padding: "10px 20px",
                            marginRight: "10px",
                            borderRadius: "8px",
                        }}
                    >
                        I want to learn more!
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => setShowPopup(false)}
                        style={{
                            fontSize: "18px",
                            padding: "10px 20px",
                            borderRadius: "8px",
                        }}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}