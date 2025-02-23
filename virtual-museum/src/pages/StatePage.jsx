import { useParams } from "react-router-dom";
import topicImage from "../assets/ma-collection-topic-image-2.jpg";
import DEMO_DATA from "../../data/demo_data"

export default function StatePage() {
    const { stateName } = useParams();

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


            <div style={{backgroundColor: "#ede1d5", paddingTop: "70px"}}>
                <div className="text-center"><h2 className="display-5 fw-bold py-5">Featured Flora</h2></div>
                <div className="container" style={{paddingBottom: "50px", paddingTop: "50px"}}>
                    {DEMO_DATA.filter((data) => data.id === "eab00aaa-b85b-4edf-bebf-c8de5a898665")
                        .map((filteredData) => {
                            return (
                                <div className="row align-items-center">

                                    <div className="col-md-4 text-center">
                                        <img 
                                            src={filteredData.identifier}
                                            alt={filteredData["scientificname.x"]}
                                            className="img-fluid rounded"
                                            style={{ maxWidth: "120%", height: "auto" }}
                                        />
                                    </div>
            
                                    <div className="card col-md-8 px-5 py-5"
                                        style={{ 
                                            backgroundColor: "rgba(255, 255, 255, 0.8)",
                                            backdropFilter: "blur(5px)",
                                            borderRadius: "10px"
                                        }}>
                                        <h2 className="fw-bold mb-4">{filteredData["scientificName.x"]}</h2>
                                        <p className="fs-5">
                                            Commonly known as Toothcup, <span className="fst-italic">Rotala ramosior</span> is a delicate, semi-aquatic plant 
                                            found in wet meadows and shallow waters. This species thrives in Massachusetts wetlands, 
                                            playing an important role in aquatic ecosystems. Its tiny pink flowers bloom in late summer, 
                                            adding a vibrant touch to its surroundings.
                                        </p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                <div className="container" style={{paddingBottom: "50px", paddingTop: "100px"}}>
                    {DEMO_DATA.filter((data) => data.id === "64e59696-645c-428a-840a-02c5263f40e8")
                        .map((filteredData) => {
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
                                            <span className="fst-italic">Eleocharis robbinsii Oakes</span>, commonly known as Robbins’ spikerush, 
                                            is a rare aquatic sedge found in Massachusetts’ freshwater wetlands, slow-moving streams, and pond edges. 
                                            This species is distinguished by its dense, mat-forming growth, with slender, grass-like stems that emerge 
                                            from submerged sediments. Preferring clear, nutrient-rich waters, E. robbinsii plays a crucial role in 
                                            stabilizing shorelines and providing habitat for aquatic invertebrates. Due to habitat loss, water pollution, 
                                            and hydrological changes, its populations have declined, making conservation efforts essential for maintaining 
                                            Massachusetts’ wetland biodiversity. 
                                        </p>
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
                        })
                    }
                </div>

                <div className="container" style={{paddingBottom: "100px", paddingTop: "100px"}}>
                    {DEMO_DATA.filter((data) => data.id === "78147d2c-175c-11e6-b5e0-001ec9fd629b")
                        .map((filteredData) => {
                            return (
                                <div className="row align-items-center">

                                    <div className="col-md-4 text-center">
                                        <img 
                                            src={filteredData.identifier}
                                            alt={filteredData["scientificname.x"]}
                                            className="img-fluid rounded"
                                            style={{ maxWidth: "120%", height: "auto" }}
                                        />
                                    </div>
            
                                    <div className="card col-md-8 px-5 py-5"
                                        style={{ 
                                            backgroundColor: "rgba(255, 255, 255, 0.8)",
                                            backdropFilter: "blur(5px)",
                                            borderRadius: "10px"
                                        }}>
                                        <h2 className="fw-bold mb-4">{filteredData["scientificName.x"]}</h2>
                                        <p className="fs-5">
                                            <span className="fst-italic">Linum virginianum</span> Linnaeus, commonly known as Virginia flax, is a delicate, 
                                            herbaceous plant found in the meadows, open woodlands, and rocky slopes of Massachusetts. This slender-stemmed species 
                                            produces small, pale yellow flowers that bloom in late spring and summer, adding subtle beauty to its natural habitats. 
                                            Preferring well-drained, sandy, or rocky soils, L. virginianum thrives in sunlit clearings and plays a role in supporting 
                                            local pollinators. While not considered rare, habitat fragmentation and competition from invasive species pose challenges 
                                            to its populations, making conservation efforts important for maintaining the biodiversity of Massachusetts’ native flora.
                                        </p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div className="pt-5" style={{ backgroundColor: "#faf5e6", paddingTop: "70px" }}>
                <div className="text-center"><h2 className="display-5 fw-bold py-5">Browse all {stateName} Plant Records</h2></div>
                {(() => {
            const rows = [];
            const filteredData = DEMO_DATA.filter((data) => data.stateProvince === "Massachusetts");

            for (let i = 0; i < filteredData.length; i += 2) {
                rows.push(
                    <div key={i} className="row g-2 justify-content-center mb-5">
                        <div className="col-md-6 d-flex justify-content-center" style={{paddingLeft: "15vw"}}>
                            <div className="card shadow-sm" style={{ width: "100%", maxWidth: "350px", borderRadius: "10px" }}>
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
                                <div className="card shadow-sm" style={{ width: "100%", maxWidth: "350px", borderRadius: "10px" }}>
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