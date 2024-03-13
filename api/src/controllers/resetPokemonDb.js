const axios = require('axios');
const { Pokemons } = require('../db')

const resetPokemonDb = async (req, res) => {
    try {
        // Delete all records from the Pokemons table
        await Pokemons.destroy({ where: {} });
    
      } catch (error) {
        res.status(500).json({ error: error.message });
      }

}
module.exports = resetPokemonDb;