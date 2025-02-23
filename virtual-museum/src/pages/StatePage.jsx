import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import topicImage from "../assets/ma-collection-topic-image-2.jpg";
import DEMO_DATA from "../../data/demo_data"
import DEMO_DATA_2 from "../../data/demo_data_2"
import LeftPlantBlurb from "../components/LeftPlantBlurb"
import RightPlantBlurb from "../components/RightPlantBlurb"
import MysteryBox from "../components/mysteryBox";


export default function StatePage() {
    const { stateName } = useParams();
    const navigate = useNavigate();

    return (
        <div>
            <div className="card" style={{ height: "70vh" }}>
                <img 
                    src={topicImage}
                    className="img-fluid"
                    alt="Plants of Massachusetts' Topic Image"
                    style={{
                        width: "100vw",
                        height: "70vh",
                        objectFit: "cover",
                        objectPosition: "center"
                    }}
                />

                <div className="card-img-overlay d-flex flex-column align-items-center text-center justify-content-center h-70">
                    <div>
                        <h1 className="fw-bold pb-1">Welcome to</h1>
                        <h1 className="display-1 fw-bold pt-3 pb-3">Plants of {stateName.replace("-", " ")} Collection</h1>
                    </div>
                </div>
            </div>

            <div className="d-flex align-items-center justify-content-center py-5" style={{ height: "50vh", backgroundColor: "#faf5e6" }}>
                <p className="fs-4 text-center" style={{marginRight: "10vw", marginLeft: "10vw"}}>
                    <span className="fw-bold">{stateName}</span> is home to a wide variety of plant species, from iconic hardwoods like the sugar maple and American beech to delicate orchids, ferns, and coastal wildflowers that thrive in the region’s unique microclimates. The collection features herbarium specimens carefully pressed and preserved, offering a glimpse into the state’s botanical past while serving as a vital resource for researchers studying plant evolution, climate change, and conservation.
                </p>
            </div>

            {stateName === "Massachusetts" && <>
                <div style={{backgroundColor: "#ede1d5", paddingTop: "70px"}}>
                    <div className="text-center"><h2 className="display-5 fw-bold py-5">Featured Flora</h2></div>
                    <div className="container" style={{paddingBottom: "50px", paddingTop: "50px"}}>
                        {DEMO_DATA.filter((data) => data.id === "0ebca4ac-6068-44c2-b202-7ebf2253d27f")
                            .map((filteredData) => {
                                return <LeftPlantBlurb filteredData={filteredData} />
                                
                            })
                        }
                    </div>

                    <div className="container" style={{paddingBottom: "50px", paddingTop: "100px"}}>
                        {DEMO_DATA.filter((data) => data.id === "e6e37c8d-1c24-484c-b4d6-14e564f51ec8")
                            .map((filteredData) => {
                                return <RightPlantBlurb filteredData={filteredData} />
                            })
                        }
                    </div>

                    <div className="container" style={{paddingBottom: "100px", paddingTop: "100px"}}>
                        {DEMO_DATA.filter((data) => data.id === "12a7cf72-f5cd-4fe2-973b-61329867ee34")
                            .map((filteredData) => {
                                return <LeftPlantBlurb filteredData={filteredData} />
                            })
                        }
                    </div>
                </div>
            </>}
            

            <div className="pt-5" style={{ backgroundColor: "#faf5e6", paddingTop: "70px" }}>
                <div className="text-center"><h2 className="display-5 fw-bold py-5">Browse all {stateName} Plant Records</h2></div>
                {(() => {
            const rows = [];
            const filteredData = DEMO_DATA_2.filter((data) => data.stateProvince === stateName);

            for (let i = 0; i < filteredData.length; i += 2) {
                rows.push(
                    <div key={i} className="row g-2 justify-content-center mb-5">
                        <div className="col-md-6 d-flex justify-content-center" style={{paddingLeft: "15vw"}}>
                            <div className="card shadow-sm" style={{ width: "100%", maxWidth: "350px", borderRadius: "10px", cursor: "pointer" }} onClick={() => navigate(`/herb/${filteredData[i].id}`)}>
                                <img 
                                    src={filteredData[i].identifier}  
                                    alt={filteredData[i]["scientificName.x"]}
                                    className="card-img-top"
                                    style={{ width: "100%", minHeight: "520px", objectFit: "contain", backgroundColor: "#f8f9fa" }} 
                                />
                                <div className="card-body text-center">
                                    <h5 className="fw-bold">{filteredData[i]["scientificName.x"]}</h5>
                                </div>
                            </div>
                        </div>

                        {filteredData[i + 1] && (
                            <div className="col-md-6 d-flex justify-content-center" style={{paddingRight: "15vw"}}>
                                <div className="card shadow-sm" style={{ width: "100%", maxWidth: "350px", borderRadius: "10px", cursor: "pointer" }} onClick={() => navigate(`/herb/${filteredData[i + 1].id}`)}>
                                    <img 
                                        src={filteredData[i + 1].identifier}  
                                        alt={filteredData[i + 1]["scientificName.x"]}
                                        className="card-img-top"
                                        style={{ width: "100%", minHeight: "520px", objectFit: "contain", backgroundColor: "#f8f9fa" }}
                                    />
                                    <div className="card-body text-center">
                                        <h5 className="fw-bold">{filteredData[i + 1]["scientificName.x"]}</h5>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                );
            }
            return rows;
        })()}
            </div>
        </div>
   
    );
}