const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const routes = require('./routes/index.js')
const getPokemons = require('./controllers/getPokemons')
const addPokemon = require('./controllers/addPokemon')
const getCharById = require('./controllers/getCharById')
const getCharByName = require('./controllers/getCharByName')
const getTypes = require('./controllers/getTypes')
const resetPokemonDb = require("./controllers/resetPokemonDb")
const server = express()

server.name = 'API'

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
server.use(bodyParser.json({ limit: '50mb' }))
server.use(cookieParser())
server.use(morgan('dev'))
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*') // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  next();
});

server.use('/', routes)

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500
  const message = err.message || err
  console.error(err)
  res.status(status).send(message)
});

server.get("/pokemons/name", getCharByName)
server.get("/pokemons/:id", getCharById)
server.get("/types/", getTypes)
server.get("/pokemons/", getPokemons)
server.post("/pokemons/", addPokemon)
server.delete("/resetpokemons/", resetPokemonDb)
//server.get("/pokeapi/login", login)
server.get("/", (req, res) => {
   res.json({ message: "No hay nada aca" })
 })

module.exports = server
