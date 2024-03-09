const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getPokemons = require("../controllers/getPokemons")
const addPokemon = require("../controllers/addPokemon")
const getCharById = require("../controllers/getCharById")
const getCharByName = require("../controllers/getCharByName")
const getTypes = require("../controllers/getTypes")

// const PokemonModel = require('../models/Pokemon.js') //.sequelizePokemon;
// const TypeModel = require('../models/Type.js') //.sequelizeType;
// require('../db.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/pokemons/", getPokemons)
router.post("/pokemons/", addPokemon)
router.get("/pokemons/:id", getCharById)
router.get("/pokemons/:name", getCharByName)
router.get("/types/", getTypes)


module.exports = router;
