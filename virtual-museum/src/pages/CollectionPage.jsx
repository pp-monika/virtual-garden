import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import DEMO_DATA from "../../data/demo_data";

export default function CollectionPage() {
    const storedHerbs = JSON.parse(localStorage.getItem("collections")) || [];
    const [herbList, setHerbList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch herb data for stored IDs
        const fetchedHerbs = storedHerbs.map(herbId => {
            const foundHerb = DEMO_DATA.find(herb => herb.id === herbId);
            if (foundHerb) {
                return {
                    id: herbId,
                    name: foundHerb["scientificName.x"] || "Unknown Herb",
                    location: foundHerb["stateProvince"] || "Unknown Location",
                    mediaUrl: foundHerb["identifier"] || "default.png"
                };
            }
            return null;
        }).filter(herb => herb !== null);

        setHerbList(fetchedHerbs);
    }, []);

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "20px"
        }}>
            <h1>Plants that have been collected!</h1>

            <div style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                justifyContent: "center",
                marginTop: "20px"
            }}>
                {herbList.length === 0 ? (
                    <p>No herbs in collection.</p>
                ) : (
                    herbList.map(herb => (
                        <button
                            key={herb.id}
                            onClick={() => navigate(`/herb/${herb.id}`)}
                            style={{
                                width: "100px",
                                height: "100px",
                                borderRadius: "50%",
                                overflow: "hidden",
                                border: "none",
                                cursor: "pointer",
                                backgroundImage: `url(${herb.mediaUrl})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center"
                            }}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
