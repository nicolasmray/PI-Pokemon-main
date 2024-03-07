// const axios = require('axios');
// const { Pokemon } = require('../db.js')
// const getCharByName = require('./getCharByName')
// //require('dotenv').config();
// const limitQuantity = 10
// const URL_Pokemons = "https://pokeapi.co/api/v2/pokemon?limit="+limitQuantity+"&offset=0" 

// const getPokemons = async (req, res) => {
//     try {
//         const { data } = await axios.get(`${URL_Pokemons}`)
//         const { results } = data
//         const pokemonNamesFromAPI = results.map(pokemon => pokemon.name)

//         const pokemonNamesFromDB = await Pokemon.findAll({ attributes: ['name'] });
//         const pokemonNamesFromDBArray = pokemonNamesFromDB.map(pokemon => pokemon.name)

//         const allPokemonNames = [...pokemonNamesFromAPI, ...pokemonNamesFromDBArray]

//         const allPokemonData = await Promise.all(
//             allPokemonNames.map(async (name) => await getCharByName(name))
//         )
//         const response = allPokemonData.reduce((acc, pokemon, index) => {
//             acc[allPokemonNames[index]] = pokemon;
//             return acc;
//         }, {});

//         return res.json(response)
//             // acc
//             // ? res.json(acc)
//             // : res.status(404).send("Not found")

//     } catch (error) {
//         //return res.status(500).send(error.message)
//         console.error(error)
//         return res.status(500).send("Internal Server Error")
//     }

// }

// module.exports = getPokemons;