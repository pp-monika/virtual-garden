import coverImage from "../assets/ma-collection-cover-image.jpg";

export default function FeaturedCollection({ location }) {
    return (
        <div className="card position-relative">
            {/* Featured Badge */}
            <span
                className="badge position-absolute top-0 start-0 m-3 p-2 text-dark bg-warning rounded-pill"
                style={{ fontSize: "1rem"}}>
                Featured
            </span>

            <img
                src={coverImage}
                className="img-fluid"
                alt="Plants of Massachusetts' Cover Image"
                style={{
                    width: "100vw",
                    height: "100vh",
                    objectFit: "cover",
                    objectPosition: "center"
                }}
            />

            <div className="card-img-overlay d-flex flex-column justify-content-center align-items-center text-center">
                <h1 className="display-1 fw-bold pt-3 pb-3">Plants of Massachusetts Collection</h1>
                <p className="card-text fs-4 mt-4 mx-5">
                    Step into the lush landscapes of Massachusetts with our exclusive online exhibition, “Plants of Massachusetts”! Explore the rich diversity of native flora, from the delicate Lady’s Slipper Orchid to the towering Red Maple. Through stunning images, fascinating plant stories, and expert insights, uncover the ecological and cultural significance of these botanical treasures.
                </p>
                <a href={`/state/${location}`} className="btn btn-primary btn-lg">Explore</a>
            </div>
        </div>
    );
}