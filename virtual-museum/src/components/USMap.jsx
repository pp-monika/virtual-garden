import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

export default function USMap() {
    const navigate = useNavigate();
    const [hoveredState, setHoveredState] = useState(null); // Track hovered state name
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const [showTooltip, setShowTooltip] = useState(false); // Control tooltip visibility
    const [tooltipTimer, setTooltipTimer] = useState(null);

    const handleStateClick = (geo) => {
        const stateName = geo.properties.name.replace(/\s+/g, "-"); // Format for URL
        navigate(`/state/${stateName}`); // Redirect to state-specific page
    };

    const handleMouseMove = (event, geo) => {
        // Reset tooltip when mouse moves
        setHoveredState(null);
        setShowTooltip(false);
        setTooltipPosition({ x: event.clientX + 15, y: event.clientY + 10 });

        // Clear any existing timer
        if (tooltipTimer) {
            clearTimeout(tooltipTimer);
        }

        // Start a new timer to show the tooltip after 500ms
        const newTimer = setTimeout(() => {
            setHoveredState(geo.properties.name);
            setShowTooltip(true);
        }, 0);

        setTooltipTimer(newTimer);
    };

    const handleMouseLeave = () => {
        if (tooltipTimer) {
            clearTimeout(tooltipTimer);
        }
        setShowTooltip(false);
        setHoveredState(null);
    };

    return (
        <div className="d-flex flex-column map-container align-items-center justify-content-center" style={{ width: "100vw", height: "100vh", position: "relative" }}>
            {showTooltip && hoveredState && (
                <div style={{
                    position: "fixed",
                    left: `${tooltipPosition.x}px`,
                    top: `${tooltipPosition.y}px`,
                    background: "white",  // ✅ Set background to white
                    color: "black",  // ✅ Set text color to black for readability
                    padding: "5px 10px",
                    borderRadius: "5px",
                    fontSize: "0.9rem",
                    whiteSpace: "nowrap",
                    pointerEvents: "none",
                    zIndex: 1000,
                    border: "1px solid #ccc", // ✅ Optional: Adds a light border for better visibility
                    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)" // ✅ Optional: Adds a subtle shadow
                }}>
                    {hoveredState}
                </div>
            )}
            <h2 className="text-center mt-5">Did you know that there are more than 42,000 plant species in the U.S.?</h2>
            <ComposableMap projection="geoAlbersUsa" style={{ width: "90%", height: "90%" }}>
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                        geographies.map((geo) => (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                onMouseMove={(event) => handleMouseMove(event, geo)} // Show tooltip only after delay
                                onMouseLeave={handleMouseLeave}
                                onClick={() => handleStateClick(geo)}
                                style={{
                                    default: { fill: "#437344", cursor: "pointer", strokeWidth: 3 },
                                    hover: { fill: "#203b16", cursor: "pointer", strokeWidth: 2 },
                                    pressed: { fill: "#203b16", strokeWidth: 2 }
                                }}
                            />
                        ))
                    }
                </Geographies>
            </ComposableMap>
        </div>
    );
}