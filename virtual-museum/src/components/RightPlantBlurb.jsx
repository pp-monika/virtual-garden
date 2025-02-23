import { useNavigate } from "react-router-dom";

export default function LeftPlantBlurb({filteredData}) {
    const navigate = useNavigate();

    return (
        <div className="row align-items-center">
            <div className="card col-md-8 px-5 py-5" style={{ 
                position: "relative",
                zIndex: 2,  
                marginRight: "-5%",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(5px)",
                borderRadius: "10px"
            }}>
                <h2 className="fw-bold mb-4">{filteredData["scientificName.x"]}</h2>
                <p className="fs-5">
                    {filteredData["description"]}
                </p>
                <button 
                    className="btn btn-primary mt-3 w-auto"
                    onClick={() => navigate(`/herb/${filteredData.id}`)}
                >
                    Learn More
                </button>
            </div>

            <div className="col-md-4 text-center">
                <img 
                    src={filteredData.identifier}
                    alt={filteredData["scientificname.x"]}
                    className="img-fluid rounded"
                    style={{ maxWidth: "100%", height: "auto" }}
                />
            </div>
        </div>
    )
}