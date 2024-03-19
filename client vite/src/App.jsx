import { useState, useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './App.css'
import Nav from './components/Nav/Nav.jsx'
import Landing from './components/Landing/Landing.jsx'
import Pages from './components/Pages/Pages.jsx'
import Detail from './components/Detail/Detail.jsx'
import Form from './components/Form/Form.jsx'
//FILTROS:
import { useSelector, useDispatch } from 'react-redux'
import { fetchCharacters, addCharacter, resetCharacters } from './redux/actions.js'

function App() { 
  //const [characters, setCharacters] = useState([]) // LO DESACTIVO PARA FILTROS
  const { pathname } = useLocation()
  const navigate = useNavigate()
  //FILTROS:
  const dispatch = useDispatch()
  const characters = useSelector(state => state.pokemonList)
  const [isDataLoaded, setIsDataLoaded] = useState(false)
  const URL = 'http://localhost:3001/pokemons'
  
  const onDataChange = (newPokemon) => {
    //setCharacters([newPokemon, ...characters]);
    //FILTROS:
    dispatch(addCharacter(newPokemon))
  };

  const onUpdateCharacters = (newPokemon) => {
    setCharacters([])
  };
 
  //FILTROS: >>
  useEffect(() => {
    if (isDataLoaded === false && pathname === '/pokemons') {
      dispatch(resetCharacters())
      async function fetchData() {
        try {
          const { data: { names } } = await axios.get(`${URL}/`)
          const detailsPromises = names.map(async (name) => {
            const { data: details } = await axios.get(`${URL}/name?name=${name}`)
            return details;
          });
          const detailsData = await Promise.all(detailsPromises)
          dispatch(fetchCharacters(detailsData))
          //setIsDataLoaded(true)
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }
      fetchData()
      setIsDataLoaded(true)
    } 
  }, [dispatch, isDataLoaded, pathname, setIsDataLoaded])
  // <<<FILTROS

  //PAGINADO
  const [pagina, setPagina] = useState(1)
  const [porPagina, setPorPagina] = useState(12)
  //const maximo = Math.ceil(characters.length / porPagina)
  const filteredPokemonList = useSelector(state => state.filteredPokemonList)
  const maximo = Math.ceil(filteredPokemonList.length / porPagina)

  const onSearchId = async (id) => {
    function getRandomId() {
      const numeroDecimal = Math.random()
      const numeroEntre0y1025 = numeroDecimal * 1026
      const numeroEntero = Math.ceil(numeroEntre0y1025)
      const numeroRandom = Math.max(numeroEntero, 1)
      return numeroRandom
    }

    if(id === 'Agregar personaje Aleatorio') {
      let randomId
      do {
        randomId = getRandomId()
      } while (characters.find((char) => char.id === randomId))
      id = randomId
    }

    try {
      if(!id && id != 'Agregar personaje Aleatorio' ) return alert('Insert ID')
      if(characters.find(char => char.id == id)) return alert('There is a Pokémon with ID: ' + id)
      const { data } = await axios.get(`${URL}/${id}`)
      if(data.name){
        //setCharacters([data,...characters])
        //FILTROS: 
        //dispatch(addCharacter(newPokemon));
        dispatch(addCharacter(data))
      }else{
        alert('No Pokémons match the ID')
      }
    } catch (error) {
      alert(err.message)
    }
  }

  const onSearchName = async (name) => {
    try {
      if(!name) return alert('Insert a Pokémon name')
      //if(characters.find(char => char.name == name)) {         
      const existingCharacter = characters.find(char => char.name === name);
      if (existingCharacter) {
        //alert('Ya existe un personaje con el Nombre: ' + name)
        navigate(`/detail/${existingCharacter.id}`)
        return
      }
      const { data } = await axios.get(`${URL}/name?name=${name}`)
      if(data && data.name){ // REVISAR ESTA LINEA DATA.NAME
        //setCharacters([data,...characters])
        //FILTROS: 
        //dispatch(addCharacter(newPokemon));
        dispatch(addCharacter(data))
        alert('Pokémon succesfully added!')
      }else{
      alert('No Pokémons match the name')
      }
    } catch (error) {
      console.log(error.message)
      alert('No Pokémons match the name. Insert a valid Pokémon name')
    }     
  }

  //console.log(characters)
  //console.log(store.getState())
  return (
    <>
      <div className='App'>
        <div className='NavBar'>{ pathname !== '/' && <Nav onSearchId={onSearchId} onSearchName={onSearchName} setIsDataLoaded={setIsDataLoaded} />}</div> 
        <Routes>
          <Route path='/' element={<Landing onDataChange={onDataChange}/>} /> 
          {/* <Route path='/pokemons' element={<Cards characters={characters} />} /> */}
          <Route path='/pokemons' element={<Pages pagina={pagina} porPagina={porPagina} setPagina={setPagina} maximo={maximo} characters={characters} />} />
          <Route path='/detail/:id' element={<Detail/>} />
          <Route path='/new/' element={<Form onDataChange={onDataChange}/>} />
        </Routes>
      </div>
    </>
  )
}

export default App
