import { useParams } from "react-router-dom";

export default function StatePage() {
    const { stateName } = useParams();

    return (
        <div>
            <h1>Welcome to Plants of {stateName.replace("-", " ")} Collection</h1>
            <p>Explore more about {stateName} here!</p>
        </div>
    );
}