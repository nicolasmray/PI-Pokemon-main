import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
//import { connect } from 'react-redux'
//import { addFav, removeFav } from '../../redux/actions'
import style from './Card.module.css'
// aplicamos destructuring de las variables de input a Card para no tener que usar "props" y props.name , etc.

function Card({id, name, height, weight, image, hp, attack, defense, speed, types}) { //, fid

    //const formattedTypes = types && types.length > 1 ? types.join(', ') : types
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1);


    const capitalizeFirstLetter = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
      };
    const formatTypes = (types) => {
      if (!Array.isArray(types)) return ''; // Check if types is an array
      return types
          .map(type => capitalizeFirstLetter(type)) // Capitalize the first letter of each type
          .join(', '); // Join the types back with ", " separator
      };

  const formattedTypes = formatTypes(types);
    
    // let defaultImage = 'https://i.pinimg.com/736x/34/c1/e5/34c1e5d371d64a581b1902ec5c4509f4.jpg';
    // if (image !== null) {
    // defaultImage = image;}
   //const { pathname } = useLocation()
  //const hasTypes = types && types.length > 0;
  //console.log('Formatted Types:', formattedTypes);
   return (
      <Link to={`/detail/${id}`} ><div className={style.container} >
         {/* <h2>Id number: {id}</h2> */}
         {/* <h2>FId number: {fid}</h2> */}
         {/* <h2>Height: {height}</h2>
         <h2>Weight: {weight}</h2> */}
         <img src={image} alt={name} className={style.image} />
         <h2 className={style.name}> {formattedName}</h2>
         {/* <h2>HP: {hp}</h2> */}
         {/* <h2>Attack: {attack}</h2> */}
         {/*<h2>Defense: {defense}</h2>
         <h2>Speed: {speed}</h2> */}
         <h2 className={style.types}>{formattedTypes}</h2>
          
      </div></Link>
   ); 
}


export default (Card)

