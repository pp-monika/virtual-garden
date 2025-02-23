import { useNavigate } from "react-router-dom";
import MOImage from "../assets/missouri-cover.jpg";
import CAImage from "../assets/california-cover.jpg";
import TXImage from "../assets/texas-cover.jpg";

export default function RecommendedCollections() {
    const navigate = useNavigate();

    const states = [
        {
            name: "Texas",
            image:  TXImage,
            description: "Discover the diverse flora of Massachusetts, from its coastal dunes to lush forests.",
            route: "/state/Massachusetts"
        },
        {
            name: "California",
            image: CAImage,
            description: "Explore California’s unique plant life, from redwood forests to desert wildflowers.",
            route: "/state/California"
        },
        {
            name: "Missouri",
            image: MOImage,
            description: "Explore Missouri’s unique plant life, from redwood forests to desert wildflowers.",
            route: "/state/Missouri"
        }
    ];

    return (
        <div className="container mt-5">
            <h2 className="text-center fw-bold mb-4">Explore Other State Collections</h2>
            <div className="row justify-content-center">
                {states.map((state, index) => (
                    <div key={index} className="col-md-4 d-flex justify-content-center">
                        <div 
                            className="card shadow-sm border-0"
                            style={{ width: "100%", maxWidth: "400px", cursor: "pointer" }}
                            onClick={() => navigate(state.route)}
                        >
                            <img 
                                src={state.image} 
                                alt={state.name} 
                                className="card-img-top"
                                style={{ height: "250px", objectFit: "cover", borderRadius: "10px 10px 0 0" }}
                            />
                            <div className="card-body text-center">
                                <h4 className="fw-bold">{state.name}</h4>
                                <p className="text-muted">{state.description}</p>
                                <button className="btn btn-primary">View Collection</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}