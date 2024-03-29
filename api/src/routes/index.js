const { Router } = require('express')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getPokemons = require("../controllers/getPokemons")
const addPokemon = require("../controllers/addPokemon")
const getCharById = require("../controllers/getCharById")
const getCharByName = require("../controllers/getCharByName")
const getTypes = require("../controllers/getTypes")
const resetPokemonDb = require("../controllers/resetPokemonDb")

const router = Router()

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/pokemons/name", getCharByName)
router.get("/pokemons/:id", getCharById)
router.get("/pokemons/", getPokemons)
router.get("/types/", getTypes)
router.post("/pokemons/", addPokemon)
router.delete("/resetpokemons/", resetPokemonDb)

module.exports = router
