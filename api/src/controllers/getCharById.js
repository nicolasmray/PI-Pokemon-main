const axios = require('axios');
const URL_ID = "https://pokeapi.co/api/v2/pokemon/" 

const getCharById = async (req, res) => {
    try {
        const charId = req.params.id;
        const { data } = await axios.get(`${URL_ID}${charId}`)
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
        //return res.status(500).send(error.message)
        return res.status(404).send("Not found")
    }

}

module.exports = getCharById;