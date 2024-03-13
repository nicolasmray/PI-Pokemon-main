const axios = require('axios');
const { Pokemons } = require('../db') //, Type

const resetPokemonDb = async (req, res) => {
    try {
        // Delete all records from the Pokemons table
        console.log('Deleting Pokemons...');
        await Pokemons.destroy({ where: {}, limit:10 });
        console.log('Deletion completed.')
        //await Type.destroy({ where: {}});
        res.status(200).json({ message: 'Database reset completed successfully.' })

      } catch (error) {
        res.status(500).json({ error: error.message });
      }

}
module.exports = resetPokemonDb;