import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import style from './Detail.module.css'

function Detail() {
    const { id } = useParams()
    const [ character, setCharacter] = useState({})

    const URL = 'http://localhost:3001/pokemons/'
  

    useEffect(()=>{ //1era vez seria la etapa de montaje
        // axios.get(URL + id + "?key=" + API_KEY)
        axios.get(URL + id)
        .then(({ data })=>{
            if(data.name) setCharacter(data)
            else alert('No pokemons match the ID')
        })

        return setCharacter({}) // etapa de desmontaje
    }, [id]) //etapa de actualizacion

    return <div className={style.container}>
        <h2>Name: { character.name } </h2>
        <h4>Height: { character.height} </h4>
        <h4>Weight: { character.weight} </h4>
        <img src={character.image} alt={character.name} />
        <h4>HP: { character.hp} </h4>
        <h4>Attack: { character.attack} </h4>
        <h4>Defense: { character.defense} </h4>
        <h4>Speed: { character.speed} </h4>
        <h4>Type: { character.types} </h4>

    </div>;
}

export default Detail