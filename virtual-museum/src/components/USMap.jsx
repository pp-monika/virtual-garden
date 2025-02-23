import { ComposableMap, Geographies, Geography, Annotation } from "react-simple-maps";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { geoCentroid } from "d3-geo";

// GeoJSON URL for US states
const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

// Mapping of state names to abbreviations
const stateAbbreviations = {
    "Alabama": "AL", "Alaska": "AK", "Arizona": "AZ", "Arkansas": "AR",
    "California": "CA", "Colorado": "CO", "Connecticut": "CT", "Delaware": "DE",
    "Florida": "FL", "Georgia": "GA", "Hawaii": "HI", "Idaho": "ID",
    "Illinois": "IL", "Indiana": "IN", "Iowa": "IA", "Kansas": "KS",
    "Kentucky": "KY", "Louisiana": "LA", "Maine": "ME", "Maryland": "MD",
    "Massachusetts": "MA", "Michigan": "MI", "Minnesota": "MN", "Mississippi": "MS",
    "Missouri": "MO", "Montana": "MT", "Nebraska": "NE", "Nevada": "NV",
    "New Hampshire": "NH", "New Jersey": "NJ", "New Mexico": "NM", "New York": "NY",
    "North Carolina": "NC", "North Dakota": "ND", "Ohio": "OH", "Oklahoma": "OK",
    "Oregon": "OR", "Pennsylvania": "PA", "Rhode Island": "RI", "South Carolina": "SC",
    "South Dakota": "SD", "Tennessee": "TN", "Texas": "TX", "Utah": "UT",
    "Vermont": "VT", "Virginia": "VA", "Washington": "WA", "West Virginia": "WV",
    "Wisconsin": "WI", "Wyoming": "WY"
};

export default function USMap() {
    const navigate = useNavigate();
    const [hoveredState, setHoveredState] = useState(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipTimer, setTooltipTimer] = useState(null);

    const handleStateClick = (geo) => {
        const stateName = geo.properties.name.replace(/\s+/g, "-");
        navigate(`/state/${stateName}`);
    };

    const handleMouseMove = (event, geo) => {
        setHoveredState(null);
        setShowTooltip(false);
        setTooltipPosition({ x: event.clientX + 15, y: event.clientY + 10 });

        if (tooltipTimer) {
            clearTimeout(tooltipTimer);
        }

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
            
            {/* Tooltip */}
            {showTooltip && hoveredState && (
                <div style={{
                    position: "fixed",
                    left: `${tooltipPosition.x}px`,
                    top: `${tooltipPosition.y}px`,
                    background: "white",
                    color: "black",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    fontSize: "0.9rem",
                    whiteSpace: "nowrap",
                    pointerEvents: "none",
                    zIndex: 1000,
                    border: "1px solid #ccc",
                    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)"
                }}>
                    {hoveredState}
                </div>
            )}

            {/* Title */}
            <h2 className="text-center mt-5">Did you know that there are more than 42,000 plant species in the U.S.?</h2>

            {/* US Map */}
            <ComposableMap projection="geoAlbersUsa" style={{ width: "90%", height: "90%" }}>
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                        geographies.map((geo) => {
                            const centroid = geoCentroid(geo);
                            const stateName = geo.properties.name;
                            const stateAbbr = stateAbbreviations[stateName];

                            return (
                                <g key={geo.rsmKey}>
                                    {/* State Shape */}
                                    <Geography
                                        geography={geo}
                                        onMouseMove={(event) => handleMouseMove(event, geo)}
                                        onMouseLeave={handleMouseLeave}
                                        onClick={() => handleStateClick(geo)}
                                        style={{
                                            default: { fill: "#437344", cursor: "pointer", strokeWidth: 3 },
                                            hover: { fill: "#203b16", cursor: "pointer", strokeWidth: 2 },
                                            pressed: { fill: "#203b16", strokeWidth: 2 }
                                        }}
                                    />
                                    
                                    {/* State Abbreviation (if available) */}
                                    {stateAbbr && (
                                        <Annotation
                                            subject={centroid}
                                            dx={0} dy={0}
                                            connectorProps={{ stroke: "none" }}
                                        >
                                            <text
                                                textAnchor="middle"
                                                alignmentBaseline="middle"
                                                fontSize={10}
                                                fill="white"
                                                strokeWidth={0.5}
                                            >
                                                {stateAbbr}
                                            </text>
                                        </Annotation>
                                    )}
                                </g>
                            );
                        })
                    }
                </Geographies>
            </ComposableMap>
        </div>
    );
}