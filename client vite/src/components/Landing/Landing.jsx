import React from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import style from './Landing.module.css'

//FILTROS:
//import { useSelector, useDispatch } from 'react-redux'
//import { resetCharacters } from '../../redux/actions.js'

function Landing({ onDataChange }) { // {setCharacters}, onStartClick

    const navigate = useNavigate();
    const URL = 'http://localhost:3001/resetpokemons/'
    
    //FILTROS:
   // const dispatch = useDispatch();

    const handleStartClick = async () => {
        // Perform any other actions needed before navigating
        // ...
       
        //alert("Welcome to pokemon App!")
        try {
            const reset = await axios.delete(`${URL}`);
            console.log(reset.data); // Log the response for debugging

            //setCharacters([])
            //onUpdateCharacters([])
            //onStartClick()

            //FILTROS:
            //dispatch(resetCharacters())

            //onDataChange([]) //--- LO SAQUE VIENDO LO DEL RESET PORQUE ME PARECIO QUE NO IBA!! AGREGAR SI HACE FALTA!!
          } catch (error) {
            console.error('Error resetting Pokemon database:', error);
          }
        
        // Navigate to the "/pokemons" route
        navigate('/pokemons');
      };
  return <div className={style.outterContainer}>
            <div className={style.container} >
              <img src={"https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png"} alt="failed to upload image" className={style.pkmimg} />
              <br/>
              <button className={style.startButton} onClick={handleStartClick}>START</button>
              <br/>
              <p className={style.text}>Gotta catch 'em all!</p>
            </div>
          </div>
}

export default Landing