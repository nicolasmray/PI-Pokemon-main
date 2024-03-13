import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import './App.css'
import Nav from './components/Nav/Nav.jsx'
import Landing from './components/Landing/Landing.jsx'
//import { onUpdateCharacters } from './components/Landing/Landing.jsx'
import Cards from './components/Cards/Cards.jsx'
import Detail from './components/Detail/Detail.jsx'
import Form from './components/Form/Form.jsx'

function App() {
  const [characters, setCharacters] = useState([])
  //const [startClicked, setStartClicked] = useState(false)
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const URL = 'http://localhost:3001/pokemons'
  
  // const onDataChange = (newPokemon) => {
  //   setCharacters([newPokemon, ...characters]);
  // };

  // useEffect(() => {

  //   // const onDataChange = (newPokemon) => {
  //   //   setCharacters([newPokemon, ...characters]);
  //   // };

  //   // Fetch initial data from the backend when the component mounts
  //   const fetchData = async () => {
  //     try {
  //       // Fetch Pokémon names
  //       const { data: { names } } = await axios.get(`${URL}/`);
  //       // Fetch details for each Pokémon
  //       const detailsPromises = names.map(async (name) => {
  //         const { data: details } = await axios.get(`${URL}/name?name=${name}`);
  //         console.log(details)
  //         return details;
  //       });
  //       // Wait for all details requests to complete
  //       const detailsData = await Promise.all(detailsPromises);
  //       // Set the characters state with the combined data
  //       setCharacters(detailsData);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };
  //   if (pathname === '/') {
  //     // Set characters state to empty array when navigating to '/'
  //     setCharacters([]);
  //     // Fetch data for the landing page
  //     fetchData();
  //     return;
  //   }
  //   fetchData();
  // }, [pathname])
  
  const onDataChange = (newPokemon) => {
    setCharacters([newPokemon, ...characters]);
  };
  const onUpdateCharacters = (newPokemon) => {
    setCharacters([]);
  };

  const fetchDataAndHandleChange = async () => {
    try {
      if (pathname === '/') { //startClicked && 
        // Fetch Pokémon names
        const { data: { names } } = await axios.get(`${URL}/`);
        // Fetch details for each Pokémon
        const detailsPromises = names.map(async (name) => {
          const { data: details } = await axios.get(`${URL}/name?name=${name}`);
          return details;
        });
        // Wait for all details requests to complete
        const detailsData = await Promise.all(detailsPromises);
        // Set the characters state with the combined data
        setCharacters(detailsData);
       } //else {
      //   // Fetch data for a specific Pokémon
      //   // This condition may need to be updated based on your routing logic
      //   const { data } = await axios.get(`${URL}/${id}`);
      //   setCharacters([data, ...characters]);
      // }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchDataAndHandleChange();
  }, [pathname, onDataChange]);
  
  const onSearch = async (id) => {
  function getRandomId() {
    const numeroDecimal = Math.random();
    const numeroEntre0y1025 = numeroDecimal * 1026;
    const numeroEntero = Math.ceil(numeroEntre0y1025);
    const numeroRandom = Math.max(numeroEntero, 1);
    return numeroRandom;
  }

  // const handleStartClick = async () => {
  //   alert('Welcome to Pokemon App!');
  //   try {
  //     const reset = await axios.delete(`${URL}`);
  //     console.log(reset.data); // Log the response for debugging
  //     setCharacters([]);
  //     onUpdateCharacters([]);
  //     setStartClicked(true); // Update the state to indicate the button has been clicked
  //   } catch (error) {
  //     console.error('Error resetting Pokemon database:', error);
  //   }}


  if(id === 'Agregar personaje Aleatorio') {
    let randomId;
    do {
      randomId = getRandomId();
    } while (characters.find((char) => char.id === randomId));
    id = randomId;
  }

try {
    if(!id && id != 'Agregar personaje Aleatorio' ) return alert('Ingresa un ID')
    if(characters.find(char => char.id == id)) return alert('Ya existe un personaje con el ID: ' + id)

const { data } = await axios.get(`${URL}/${id}`)
if(data.name){
setCharacters([data,...characters])
}else{
alert('No hay personajes con ese ID/Nombre')
}
} catch (error) {
alert(err.message)
}     
}

  return (
    <>
      <div className='App'>
         <div className='NavBar'>{ pathname !== '/' && <Nav onSearch={onSearch} />}</div> 
          <Routes>
            <Route path='/' element={<Landing/>} /> 
            <Route path='/pokemons' element={<Cards characters={characters} />} />
            <Route path='/detail/:id' element={<Detail/>} />
            <Route path='/new/' element={<Form onDataChange={onDataChange}/>} />
          </Routes>

      </div>
    </>
  )
}

export default App

{/* <Route path='/home' element={<Cards characters={characters} onClose={onClose} />} />
<Route path='/about' element={<About/>} />
<Route path='/detail/:id' element={<Detail/>} />
<Route path='/Favorites' element={<Favorites/>} />
<Route path='*' element={<Error404/>} /> */}