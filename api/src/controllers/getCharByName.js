const axios = require('axios')
const { Pokemons } = require('../db')
const URL_NAME = "https://pokeapi.co/api/v2/pokemon/" 
const DEFAULT_IMAGE_URL = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png"

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
            const { id, name, height, weight, image, hp, attack, defense, speed, types, createdAt, updatedAt } = dbPokemon; //, fid
            const completePokemonData = {
                id,
                //fid,
                name,
                height,
                weight,
                image: image || DEFAULT_IMAGE_URL,
                hp,
                attack,
                defense,
                speed,
                types, 
                createdAt,
                updatedAt }

            return res.json(completePokemonData)
        }
    
        const { data } = await axios.get(`${URL_NAME}${charName}`) //?limit=${process.env.limitQuantity}
        const { id, name, height, weight, sprites, stats, types } = data
        //const typeNames = types.map(type => type.type.name)
        const character = { 
            id,
            //fid: id, 
            name, 
            height, 
            weight, 
            image: sprites.other.dream_world.front_default || DEFAULT_IMAGE_URL, 
            hp: stats[0].base_stat, 
            attack: stats[1].base_stat, 
            defense: stats[2].base_stat, 
            speed: stats[5].base_stat, 
            types: types.map(type => type.type.name)
        } 

        character
        ? res.json(character)
        : res.status(404).send("Not found")
               

    } catch (error) {

        console.error(error)
        return res.status(500).send("Internal Server Error")
    }

}

module.exports = getCharByName