const axios = require('axios');
const { Pokemon } = require('../db.js')
const limitQuantity = 10
const URL_Pokemons = "https://pokeapi.co/api/v2/pokemon?limit="+limitQuantity+"&offset=0" 

const getPokemons = async (req, res) => {
    try {
        const { data } = await axios.get(`${URL_Pokemons}`)
        const { results } = data
        const pokemonNamesFromAPI = results.map(pokemon => pokemon.name)

        const pokemonNamesFromDB = await Pokemon.findAll({ attributes: ['name'] });
        const pokemonNamesFromDBArray = pokemonNamesFromDB.map(pokemon => pokemon.name)

        const allPokemonNames = [...pokemonNamesFromAPI, ...pokemonNamesFromDBArray]

        const allPokemonData = await Promise.all(
            allPokemonNames.map(async (name) => await getCharByName(name))
        )
        const response = allPokemonData.reduce((acc, pokemon, index) => {
            acc[allPokemonNames[index]] = pokemon;
            return acc;
        }, {});

            response
            ? res.json(response)
            : res.status(404).send("Not found")

    } catch (error) {
        //return res.status(500).send(error.message)
        return res.status(404).send("Not found")
    }

}

module.exports = getPokemons;