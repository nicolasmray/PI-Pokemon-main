const axios = require('axios')
const { Types } = require('../db')

URL_Type = "https://pokeapi.co/api/v2/type/"

const getTypes = async (req, res) => {
    try {

        const typeCount = await Types.count()

        if (typeCount === 0) {
            // If empty get types from API, and save them on DB
            const { data } = await axios.get(URL_Type)
            const { results } = data
            const typeData = results.map((type, index) => ({ id: index + 1, name: type.name }))

            // Insert data into table Types
            await Types.bulkCreate(typeData)
        }

        // Get Types from DB
        const allTypes = await Types.findAll({ attributes: ['name'] })
        const allTypeNames = allTypes.map(type => type.name)
        const pokemonTypes = { types: allTypeNames }

        res.json(pokemonTypes)

    } catch (error) {
        return res.status(500).send(error.message)
    }

}

module.exports = getTypes