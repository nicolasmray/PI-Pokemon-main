// import { useState, useEffect } from "react";
// import axios from 'axios';
// import { useParams } from "react-router-dom";
// import style from './Detail.module.css'

// function Detail() {
//     const { id } = useParams()
//     const [ character, setCharacter] = useState({})

//     const URL = 'http://localhost:3001/pokemons/'
  

//     useEffect(()=>{ //1era vez seria la etapa de montaje
//         // axios.get(URL + id + "?key=" + API_KEY)
//         axios.get(URL + id) //`${URL}name?name=${name}`
//         .then(({ data })=>{
//             if(data.name) setCharacter(data)
//             else alert('No pokemons match the ID')
//         })

//         return setCharacter({}) // etapa de desmontaje
//     }, [id]) //etapa de actualizacion

//     return <div className={style.container}>
//         <h2>Name: { character.name } </h2>
//         <h4>Height: { character.height} </h4>
//         <h4>Weight: { character.weight} </h4>
//         <img src={character.image} alt={character.name} />
//         <h4>HP: { character.hp} </h4>
//         <h4>Attack: { character.attack} </h4>
//         <h4>Defense: { character.defense} </h4>
//         <h4>Speed: { character.speed} </h4>
//         <h4>Types: {character.types && character.types.join(', ')} </h4>

//     </div>;
// }

// export default Detail

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import style from './Detail.module.css';

function Detail() {
    const { id } = useParams();
    const [character, setCharacter] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const URL = 'http://localhost:3001/pokemons/';

    useEffect(() => {
        setLoading(true);
        axios.get(URL + id)
            .then(response => {
                const data = response.data;
                if (data.name) {
                    setCharacter(data);
                    setLoading(false);
                } else {
                    setError('No pokemons match the ID');
                    setLoading(false);
                }
            })
            .catch(error => {
                setError('Error fetching data');
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className={style.container}>
            <h2>id: {character.id}</h2>
            <h2>Name: {character.name}</h2>
            <h4>Height: {character.height}</h4>
            <h4>Weight: {character.weight}</h4>
            <img src={character.image} alt={character.name} />
            <h4>HP: {character.hp}</h4>
            <h4>Attack: {character.attack}</h4>
            <h4>Defense: {character.defense}</h4>
            <h4>Speed: {character.speed}</h4>
            <h4>Types: {character.types && character.types.join(', ')}</h4>
        </div>
    );
}

export default Detail;