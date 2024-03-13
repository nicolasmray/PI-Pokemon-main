import React from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import style from './Landing.module.css'

function Landing({ onDataChange }) { // {setCharacters}, onStartClick

    const navigate = useNavigate();
    const URL = 'http://localhost:3001/resetpokemons/'

    const handleStartClick = async () => {
        // Perform any other actions needed before navigating
        // ...
       
        alert("Welcome to pokemon App!")
        try {
            const reset = await axios.delete(`${URL}`);
            console.log(reset.data); // Log the response for debugging

            //setCharacters([])
            //onUpdateCharacters([])
            //onStartClick()
            onDataChange([])
          } catch (error) {
            console.error('Error resetting Pokemon database:', error);
          }
        
        // Navigate to the "/pokemons" route
        navigate('/pokemons');
      };
  return <div className={style.container} >
            <h1 className={style.h1}>Landing</h1>
            <button className={style.startButton} onClick={handleStartClick}>Start</button>
    </div>;
}

export default Landing