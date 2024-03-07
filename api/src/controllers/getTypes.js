const axios = require('axios');


URL_Type = "https://pokeapi.co/api/v2/type/"

const getTypes = async (req, res) => {
    try {
        const charId = req.params.id;
        const { data } = await axios.get(`${URL_Type}`)
        const { results } = data
        const allTypeNames = results.map(type => type.name)
        const pokemonTypes = { types: allTypeNames }
            
            pokemonTypes
            ? res.json(pokemonTypes)
            : res.status(404).send("Not found")

    } catch (error) {
        //return res.status(500).send(error.message)
        return res.status(404).send("Not found")
    }

}

module.exports = getTypes;