// const axios = require('axios');
// const { Pokemons } = require('../db')
// //require('dotenv').config();
// const URL_ID = "https://pokeapi.co/api/v2/pokemon/" 

// const getCharById = async (req, res) => {
//     try {
//         const charId = req.params.id

//         const dbPokemon = await Pokemons.findOne({
//             where: {
//                 id:    charId //OJO ACA ERA id:    charId ANTES DEL CAMBIO DE FID !!!
//             }
//         });
//         if (dbPokemon) {
//             console.log("Found in db:", dbPokemon)
//             // If data is found in the database, send the database entry
//             return res.json(dbPokemon);
//         }

//         const { data } = await axios.get(`${URL_ID}${charId}`) //?limit=${process.env.limitQuantity}
//         const { id, name, height, weight, sprites, stats, types } = data
//         const typeNames = types.map(type => type.type.name)
//         const character = { 
//             id, 
//             name, 
//             height, 
//             weight, 
//             image: sprites.other.dream_world.front_default, 
//             hp: stats[0].base_stat, 
//             attack: stats[1].base_stat, 
//             defense: stats[2].base_stat, 
//             speed: stats[5].base_stat, 
//             types: typeNames //le agregue el pokemon
//         }
            
//             character
//             ? res.json(character)
//             : res.status(404).send("Not found") && console.log(error.message)

//     } catch (error) {
//         //return res.status(500).send(error.message)
//         console.error("Error:", error);
//         return res.status(404).send("Not found")
//     }

// }

// module.exports = getCharById;

const axios = require('axios');
const { Pokemons } = require('../db');
//require('dotenv').config();
const URL_ID = "https://pokeapi.co/api/v2/pokemon/";
const DEFAULT_IMAGE_URL = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png";

const getCharById = async (req, res) => {
    try {
        const charId = req.params.id;

        if (isNaN(charId)) {
            // If charId is not a number (i.e., NaN), search in the database
            const dbPokemon = await Pokemons.findOne({
                where: {
                    id: charId
                }
            });

            if (dbPokemon) {
                console.log("Found in db:", dbPokemon);
                // If data is found in the database, send the database entry
                return res.json(dbPokemon);
            }
        }

        // If charId is a number or not found in the database, query the external API
        const { data } = await axios.get(`${URL_ID}${charId}`); //?limit=${process.env.limitQuantity}
        const { id, name, height, weight, sprites, stats, types } = data;
        const typeNames = types.map(type => type.type.name);
        const character = { 
            id, 
            name, 
            height, 
            weight, 
            image: sprites.other.dream_world.front_default || DEFAULT_IMAGE_URL, 
            hp: stats[0].base_stat, 
            attack: stats[1].base_stat, 
            defense: stats[2].base_stat, 
            speed: stats[5].base_stat, 
            types: typeNames //le agregue el pokemon
        };

        // If character exists, send the JSON response; otherwise, send a 404 response
        return character ? res.json(character) : res.status(404).send("Not found");

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send("Internal Server Error");
    }
};

module.exports = getCharById;