const axios = require('axios');
//require('dotenv').config();
const URL_NAME = "https://pokeapi.co/api/v2/pokemon/" 

const getCharByName = async (req, res) => {
    try {
        //const charName = req.params.name;
        let charName;
        if (req.params.name) {
            charName = req.params.name;
        } else {
            charName = req.params;
        }
        //const limit = req.query.limit || 10 
        const { data } = await axios.get(`${URL_NAME}${charName}`) //?limit=${process.env.limitQuantity}
        const { id, name, height, weight, sprites, stats, types } = data
        const typeNames = types.map(type => type.type.name)
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
            types: typeNames 
        }
            
            character
            ? res.json(character)
            : res.status(404).send("Not found")

    } catch (error) {
        //return res.status(500).send("Internal server error")
        //return res.status(500).send(error.message)
        return res.status(404).send("Not found")
    }

}

module.exports = getCharByName;