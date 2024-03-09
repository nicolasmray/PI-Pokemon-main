const axios = require('axios');
const { Pokemons } = require('../db')
const URL_NAME = "https://pokeapi.co/api/v2/pokemon/" 

const getCharByName = async (req, res) => {
    try {
        const charName = String(req.query.name).toLowerCase()

        const  dbPokemon  = await Pokemons.findOne({
            where: {
                name: charName
            }
        });

        if (dbPokemon) {
            // If data is found in the database, send the database entry
            const { id, name, height, weight, image, hp, attack, defense, speed, createdAt, updatedAt } = dbPokemon;
            const completePokemonData = {
                id,
                name,
                height,
                weight,
                image,
                hp,
                attack,
                defense,
                speed,
                createdAt,
                updatedAt }

            //return res.json(dbPokemon)
            return res.json(completePokemonData);
        }
    
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
            //return res.json(character)
            character
            ? res.json(character)
            : res.status(404).send("Not found")
               

    } catch (error) {
        //return res.status(500).send("Internal server error")
        //return res.status(500).send(error.message)
        return res.status(500).send("Internal Server Error")
    }

}

module.exports = getCharByName;