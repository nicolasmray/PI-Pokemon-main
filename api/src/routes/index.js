const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getPokemons = require("../controllers/getPokemons")
const getCharById = require("../controllers/getCharById")
const getCharByName = require("../controllers/getCharByName")
const getTypes = require("../controllers/getTypes")

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/pokemons/", getPokemons)
router.get("/pokemons/:id", getCharById)
router.get("/pokemons/:name", getCharByName)
router.get("/types/", getTypes)


module.exports = router;
