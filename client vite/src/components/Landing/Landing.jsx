import React from "react";
import { useNavigate } from 'react-router-dom';
import style from './Landing.module.css'

function Landing() {

    const navigate = useNavigate();

    const handleStartClick = () => {
        // Perform any other actions needed before navigating
        // ...
        () => alert("Button clicked!")
    
        // Navigate to the "/pokemons" route
        navigate('/pokemons');
      };
  return <div className={style.container} >
            <h1 className={style.h1}>Landing</h1>
            <button className={style.startButton} onClick={handleStartClick}>Start</button>
    </div>;
}

export default Landing