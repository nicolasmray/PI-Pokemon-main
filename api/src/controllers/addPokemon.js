const axios = require('axios');

URL_Pokemon = "https://pokeapi.co/api/v2/pokemon-species/"

const addPokemon = async (req, res) => {
    try {
        const charId = req.params.id;
        const { data } = await axios.get(`${URL_Pokemon}`)
        const { count } = data
        const countApi = { count }
            
            countApi
            ? res.json(countApi)
            : res.status(404).send("Not found")

    } catch (error) {
        //return res.status(500).send(error.message)
        return res.status(404).send("Not found")
    }

}

module.exports = addPokemon;