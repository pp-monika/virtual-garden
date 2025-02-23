import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Papa from 'papaparse';

function PopUpHerb() {
  const navigate = useNavigate();
  const location = useLocation();
  const [herbName, setHerbName] = useState("Flower");
  const [herbMedia, setHerbMedia] = useState("flower.png");
  const [herbLocation, setHerbLocation] = useState("Massachusetts");

  const goToHomePage = () => {
    navigate('/');
  };

  useEffect(() => {
    const pickAHerb = () => {

      const randomIndex = Math.floor(Math.random() * 100);
      console.log("go");
      
      Papa.parse('assets/mass100.csv', {
        download: true,
        header: true,
        complete: (result) => {
          const data = result.data[randomIndex];
          if (data) {

            const HerbName = data["scientificName.x"] || "Unknown Herb";
            const Location = data["stateProvince"] || "Unknown Location";
            const MediaUrl = data["identifier"] || "default.png";
            
            console.log("Picked herb: " + HerbName);
            setHerbName(HerbName);
            setHerbLocation(Location);
            setHerbMedia(MediaUrl);
          } else {
            console.error("No data found at index:", randomIndex);
          }
        },
        error: (error) => {
          console.error("Error parsing CSV: ", error);
        }
      });
    };
    pickAHerb();
  }, []);

  return (
    <div>
      <h1>{herbName}</h1>
      <img 
        src={herbMedia}
        alt="media"
        width={300}
      />
      <p>Located in {herbLocation}</p>
    </div>
  );
}

export default PopUpHerb;
