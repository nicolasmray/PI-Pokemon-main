import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
//import { connect } from 'react-redux'
//import { addFav, removeFav } from '../../redux/actions'
import style from './Card.module.css'
// aplicamos destructuring de las variables de input a Card para no tener que usar "props" y props.name , etc.

function Card({id, name, height, weight, image, hp, attack, defense, speed, types}) {


   //const { pathname } = useLocation()


   return (
      <div className={style.container} >
         <h2>Id number: {id}</h2>
      <Link to={`/detail/${id}`} ><h2>Name: {name}</h2></Link>
         <h2>Height: {height}</h2>
         <h2>Weight: {weight}</h2>
         <img src={image} alt={name} className={style.image} />
         <h2>HP: {hp}</h2>
         <h2>Attack: {attack}</h2>
         <h2>Defense: {defense}</h2>
         <h2>Speed: {speed}</h2>
         <h2>Types: {types}</h2>
          
      </div>
   );
}


export default (Card)