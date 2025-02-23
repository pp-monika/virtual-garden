import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

const popUpHerb = () => {
    const  navigate = useNavigate();
    const location = useLocation(); 
    const [herbName, setHerbName] = useState("string")("Flower");
    const [herbMedia, setHerbMedia] = useState("string")("flower.png");
    const [herbLocation, setHerbLocation] = useState("string")("Massachusetts");

    const goToHomePage = () => {
        navigate('/');
    }

    return (
        <div>
            <h1>{herbName}</h1>
            <Image 
                src={herbMedia}
                alt="media"
                width={300}
                priority
            />
            <p>Located in {herbLocation}</p>
        </div>
    )
    

}