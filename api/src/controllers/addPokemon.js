const axios = require('axios');
const { Pokemons } = require('../db')

const addPokemon = async (req, res) => {
    try {
        const { id, name, height, weight, image, hp, attack, defense, speed, types  } = req.body;
        if (!id || !name || !height || !weight || !image || !hp || !attack || !defense || !speed || !types ) {
            return res.status(400).json({ message: 'Faltan datos' });
          }

          const [pokemon, created] = await Pokemons.findOrCreate({
            where: { id },
            defaults: { name, height, weight, image, hp, attack, defense, speed, types } //le agregue el pokemon y arriba tambien
          });
          
          res.json({ pokemon, created });

    } catch (error) {
        res.status(500).json({ error: error.message })
        //return res.status(404).send("Not found")
    }
}

module.exports = addPokemon;