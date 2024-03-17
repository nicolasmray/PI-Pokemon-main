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

    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const formatTypes = (types) => {
        if (!Array.isArray(types)) return ''; // Check if types is an array
        return types
            .map(type => capitalizeFirstLetter(type)) // Capitalize the first letter of each type
            .join(', '); // Join the types back with ", " separator
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className={style.container}>
            <h2>id: {character.id}</h2>
            <h2>Name: {capitalizeFirstLetter(character.name)}</h2>
            <h4>Height: {character.height}</h4>
            <h4>Weight: {character.weight}</h4>
            <img src={character.image} alt={character.name} />
            <h4>HP: {character.hp}</h4>
            <h4>Attack: {character.attack}</h4>
            <h4>Defense: {character.defense}</h4>
            <h4>Speed: {character.speed}</h4>
            <h4>Types: {formatTypes(character.types)}</h4>
        </div>
    );
}

export default Detail;