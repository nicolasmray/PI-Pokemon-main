const axios = require('axios');
const { Pokemons } = require('../db')
//require('dotenv').config();
const URL_NAME = "https://pokeapi.co/api/v2/pokemon/" 

const getCharByName = async (req, res) => {
    try {
        const charName = String(req.params.name).toLowerCase()
        console.log("Requested pokemon name:", charName)
        // let charName;
        // if (req.params.name) {
        //     charName = req.params.name;
        //  } else {
        //      charName = req.params;
        //  }

        const dbPokemon = await Pokemons.findOne({
            where: {
                name:    charName
            }
        });

        if (dbPokemon) {
            console.log("Found in db:", dbPokemon)
            // If data is found in the database, send the database entry
            return res.json(dbPokemon);
        }
        console.log("Not found in Database, querying API...")
        //res.status(404).send("No se encontro en la BD, buscando en la API...")
        //const limit = req.query.limit || 10 
        const { data } = await axios.get(`${URL_NAME}${charName}`) //?limit=${process.env.limitQuantity}
        const { id, name, height, weight, sprites, stats, types } = data
        //const typeNames = types.map(type => type.type.name)
        const character = { 
            id, 
            name, 
            height, 
            weight, 
            image: sprites.other.dream_world.front_default, 
            hp: stats[0].base_stat, 
            attack: stats[1].base_stat, 
            defense: stats[2].base_stat, 
            speed: stats[5].base_stat, 
            types: types.map(type => type.type.name)
        }
            //if (!character) res.status(404).send("No se encontro en la BD, buscando en la API...") 
            return res.json(character)
               

    } catch (error) {
        //return res.status(500).send("Internal server error")
        //return res.status(500).send(error.message)
        return res.status(500).send("Internal Server Error")
    }

}

module.exports = getCharByName;