 import React, { useState,useEffect } from 'react';
 import { useSelector, useDispatch } from 'react-redux';
 import axios from 'axios';
 import { FILTER_TYPE, FILTER_API, FILTER_RESET, ORDER_ALPHABET, ORDER_ATTACK, ORDER_CANCEL } from '../../redux/actionTypes';
 import Card from '../Card/Card';
 import style from './Pages.module.css'

 export default function Pages({pagina, porPagina, setPagina, maximo, characters}) { 
    //PAGINADO:
    const [input, setInput] =useState(1)

    const nextPage = () => {
         setInput(parseInt(input) + 1)
         setPagina(parseInt(pagina) + 1)
    }

    const prevPage = () => {
     setInput(parseInt(input) - 1)
     setPagina(parseInt(pagina) - 1)
 }

const onKeyDown = (e) => {
    if (e.keyCode === 13) {
        const pageNumber = parseInt(e.target.value);
        if (pageNumber < 1 || pageNumber > Math.ceil(maximo) || isNaN(pageNumber)) {
            setPagina(1);
            setInput(1);
        } else {
            setPagina(pageNumber);
            setInput(pageNumber.toString());
        }
    }
}

 const onChange = (e) => {
     setInput(e.target.value)
 }


 //ORDEN:

 //const dispatch = useDispatch()
 const [sortBy, setSortBy] = useState({ category: 'name', direction: 'asc' });
    const dispatch = useDispatch();
    const pokemonList = useSelector(state => state.pokemonList);
    const filteredPokemonList = useSelector(state => state.filteredPokemonList);
    const orderedPokemonList = useSelector(state => state.orderedPokemonList);

    const handleSortByCategory = (category) => {
        if (category === sortBy.category) {
            setSortBy({ ...sortBy, direction: sortBy.direction === 'asc' ? 'desc' : 'asc' });
        } else {
            setSortBy({ category, direction: 'asc' });
        }

        // Enviar acción de ordenamiento al reducer
        if (category === 'name') {
            dispatch({ type: ORDER_ALPHABET, payload: sortBy.direction });
        } else if (category === 'attack') {
            dispatch({ type: ORDER_ATTACK, payload: sortBy.direction });
        } 

    };

    
    //FILTER:
    const [selectedOrigin, setSelectedOrigin] = useState("All"); // FILTRO ORIGEN
    const [selectedTypes, setSelectedTypes] = useState([]); 
    const [typesArray, setTypesArray] = useState([]);
    //const typesArray = typesForFilter//['grass', 'fire', 'water', 'electric', 'normal', 'psychic', 'dark', 'flying', 'rock', 'ground', 'dragon', 'ice', 'bug', 'poison', 'fairy', 'steel', 'ghost'];
    
    // OBTENER TIPOS DE POKEMON

    useEffect(() => {
        // Fetch types data when component mounts
        fetchTypes();
    }, []);

    const fetchTypes = async () => {
        try {
            const response = await axios.get('http://localhost:3001/types/');
            // Assuming the response.data contains the types
            const typesForFilter = response.data.types;
            console.log(typesForFilter); // Display the types in the console
            //return typesForFilter
            setTypesArray(typesForFilter);
        } catch (error) {
            console.error('Error fetching types:', error);
        }
    };
    //<<<<<

    const handleTypeFilter = () => {
        // Enviar acción de filtrado al reducer
        dispatch({ type: FILTER_TYPE, payload: selectedTypes });
    };

    const handleTypeChange = (e) => {
        setSelectedTypes(Array.from(e.target.selectedOptions, (option) => option.value));
    };
    
    const handleOriginChange = (event) => {
        setSelectedOrigin(event.target.value);
    };

    const handleOriginFilter = () => {
        dispatch({
            type: FILTER_API,
            payload: selectedOrigin
        });
    };

    const handleResetFilter = () => {
        dispatch({
            type: FILTER_RESET,
            //payload: selectedOrigin
        });
    };

    return (
       <div className={style.container}>
        <div className={style.box} >
            <button onClick={() => handleSortByCategory('name')} className={sortBy.category === 'name' ? 'active' : ''}>
                Sort by Name {sortBy.category === 'name' && (sortBy.direction === 'asc' ? '▲' : '▼')}
            </button>
            <button onClick={() => handleSortByCategory('attack')} className={sortBy.category === 'attack' ? 'active' : ''}>
                Sort by Attack {sortBy.category === 'attack' && (sortBy.direction === 'asc' ? '▲' : '▼')}
            </button>
           

            <div className={style.filterTypeContainer}>
                <h2 className={style.filterTypeTitle} >Filter by Type</h2>
                <div className={style.filterTypeColumns}><select className={style.filterTypeColumn1} multiple={true} onChange={handleTypeChange} value={selectedTypes}>
                    {typesArray.map((type) => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
                <button className={style.filterTypeColumn2} onClick={handleTypeFilter}>Apply</button>
                </div>
            </div>
            <div className={style.filterOriginContainer}>
                <h2 className={style.filterOriginTitle}>Filter by Origin</h2>
                <div className={style.filterOriginColumns}><select className={style.filterOriginColumn1} multiple={false} onChange={handleOriginChange} value={selectedOrigin}>
                        <option value="All">All</option>
                        <option value="API">API</option>
                        <option value="DB">DB</option>
                </select>
                < button className={style.filterOriginColumn2} onClick={handleOriginFilter}>Apply</button>
                </div>
            <div>
            </div>
            </div>
                <button className={style.resetFilterButton} onClick={handleResetFilter}>Remove Filters</button>
            

        </div>
          {filteredPokemonList.slice((pagina -1)* porPagina, (pagina - 1)* porPagina + porPagina).map(char => (
             <Card 
                //key={char.id} //-- APAGUE LA KEY!! VOLVER ACTIVAR SI NECESARIO
                id={char.id}
                //fid={char.fid}
                name={char.name} 
                height={char.height}
                weight={char.weight}
                image={char.image}
                hp={char.hp}
                attack={char.attack}
                defense={char.defense}
                speed={char.speed}
                types={char.types}
                />
             ))
            
          }
         <div className={style.pageNumberContainer}>
             <button className={style.pageButtons}  onClick={prevPage} disabled={pagina === 1 || pagina < 1} >Previous</button>
             <input className={style.pageInputContainer} name='page' autoComplete='off' onKeyDown={(e)=> onKeyDown(e)} onChange={(e) => onChange(e)} value={input} title="Press ENTER" /> 
             <p className={style.pageEnterMessage} > of {maximo} </p>
             <button className={style.pageButtons} onClick={nextPage} disabled={pagina === Math.ceil(maximo) || pagina > Math.ceil(maximo)}>Next</button>
             <br/>
             <p className={style.pageEnterMessage}></p>
          </div>
       </div>
    )
 }

