import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import style from './Detail.module.css'

function Detail() {
    const { id } = useParams()
    const [character, setCharacter] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const URL = 'http://localhost:3001/pokemons/'

    useEffect(() => {
        setLoading(true)
        axios.get(URL + id)
            .then(response => {
                const data = response.data
                if (data.name) {
                    setCharacter(data)
                    setLoading(false)
                } else {
                    setError('No Pokémons match the ID')
                    setLoading(false)
                }
            })
            .catch(error => {
                setError('Error fetching data')
                setLoading(false)
            })
    }, [id])

    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    };

    const formatTypes = (types) => {
        if (!Array.isArray(types)) return ''
        return types
            .map(type => capitalizeFirstLetter(type)) 
            .join(', ')
    };

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <div className={style.container}>
            <h2>id: {character.id}</h2>
            <img className={style.img} src={character.image} alt={character.name} />
            <h2>Name: {capitalizeFirstLetter(character.name)}</h2>
            <div className={style.statsContainer} >
                <h4 className={style.stat} >Height: {character.height}</h4>
                <h4 className={style.stat}>Weight: {character.weight}</h4>
                <h4 className={style.stat}>HP: {character.hp}</h4>
                <h4 className={style.stat} >Attack: {character.attack}</h4>
                <h4 className={style.stat} >Defense: {character.defense}</h4>
                <h4 className={style.stat} >Speed: {character.speed}</h4>
            </div>
            <h4>Types: {formatTypes(character.types)}</h4>          
        </div>
    )
}

export default Detail