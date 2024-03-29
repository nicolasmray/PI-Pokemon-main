const axios = require('axios')
const { Pokemons } = require('../db.js')
//const getCharByName = require('./getCharByName')
require('dotenv').config()
const limitQuantity = 52
const URL_Pokemons = "https://pokeapi.co/api/v2/pokemon?limit="+limitQuantity+"&offset=0" 

const getPokemons = async (req, res) => {
    try {
        const { data } = await axios.get(`${URL_Pokemons}`)
        const { results } = data
        const pokemonNamesFromAPI = results.map(pokemon => pokemon.name)

        const pokemonNamesFromDB = await Pokemons.findAll({ attributes: ['name'] })
        const pokemonNamesFromDBArray = pokemonNamesFromDB.map(pokemon => pokemon.name)

        const allPokemonNames = [...pokemonNamesFromAPI, ...pokemonNamesFromDBArray]
        const response = { names: allPokemonNames }

        return res.json(response)

    } catch (error) {
        console.error(error)
        return res.status(500).send("Internal Server Error")
    }

}

module.exports = getPokemons