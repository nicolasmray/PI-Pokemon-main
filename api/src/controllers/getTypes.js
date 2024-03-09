const axios = require('axios');
const { Types } = require('../db')

URL_Type = "https://pokeapi.co/api/v2/type/"

const getTypes = async (req, res) => {
    try {
        // const charId = req.params.id;
        // const { data } = await axios.get(`${URL_Type}`)
        // const { results } = data
        // const allTypeNames = results.map(type => type.name)
        // const pokemonTypes = { types: allTypeNames }
            
        //     pokemonTypes
        //     ? res.json(pokemonTypes)
        //     : res.status(404).send("Not found")

        const typeCount = await Types.count();

        if (typeCount === 0) {
            // Si está vacía, obtener tipos de la API y guardar en la base de datos
            const { data } = await axios.get(URL_Type);
            const { results } = data;

            const typeData = results.map((type, index) => ({ id: index + 1, name: type.name }));

            // Crear registros en la tabla Type
            await Types.bulkCreate(typeData);
        }

        // Obtener tipos de la base de datos
        const allTypes = await Types.findAll({ attributes: ['name'] });
        const allTypeNames = allTypes.map(type => type.name);

        const pokemonTypes = { types: allTypeNames };

        res.json(pokemonTypes);

    } catch (error) {
        return res.status(500).send(error.message)
        //return res.status(500).send("Internal Server Error")
        //return res.status(404).send("Not found")
    }

}

module.exports = getTypes;