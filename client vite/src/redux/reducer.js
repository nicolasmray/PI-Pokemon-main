import { FETCH_CHARACTERS, ADD_CHARACTER, RESET_CHARACTERS, FILTER_TYPE, FILTER_API, ORDER_ALPHABET, ORDER_ATTACK, ORDER_CANCEL, ERROR } from "./actionTypes"

const initialState = {
    pokemonList: [],
    filteredPokemonList: [],
    orderedPokemonList: [],
};

function reducer(state = initialState, { type, payload }){
        switch(type){
                case FETCH_CHARACTERS:
                    return {
                        pokemonList: payload,
                        filteredPokemonList: payload,
                        orderedPokemonList: payload,
                    }
                case ADD_CHARACTER:
                    return { 
                        ...state, 
                        pokemonList: [payload, ...state.pokemonList],
                        filteredPokemonList: [payload, ...state.filteredPokemonList], // Update filtered list
                        orderedPokemonList: [payload, ...state.orderedPokemonList],
                    }
                case RESET_CHARACTERS:
                    return { 
                        ...initialState
                        // pokemonList: [],
                        // filteredPokemonList: [],
                        // orderedPokemonList: [],
                    }
                case FILTER_TYPE: // tengo que recibir el payload
                    const typeFilteredCharacters = [...state.pokemonList]
                    return {
                        ...state,
                        filteredPokemonList: typeFilteredCharacters,
                    }
                case FILTER_API: //tengo que recibir de payload characters y mapearlo con la condicion "si el character.id length" es mayor a 10. en caso que si que me los guarde en un objeto y que ese objeto sea mi nuevo estado filtered pokemon list
                    let filteredCharacters;
                    if (payload === "API") {
                        filteredCharacters = state.pokemonList.filter(character => character.id.toString().length <= 10);
                    } else if (payload === "DB") {
                        filteredCharacters = state.pokemonList.filter(character => character.id.toString().length > 10);
                    } else {
                        // Si el payload no es "API" ni "DB", no se aplica ningún filtro
                        filteredCharacters = state.pokemonList;
                    }
                    return {
                        ...state,
                        //pokemonList: state.pokemonList,
                        filteredPokemonList: filteredCharacters, 
                        //orderedPokemonList: state.orderedPokemonList,
                    }
                case ORDER_ALPHABET:
                    const orderedCharacter = [...state.filteredPokemonList].sort((a, b) => {
                        if (payload === 'asc') return a.name.localeCompare(b.name);
                        return b.name.localeCompare(a.name);
                    });
                    return {
                        ...state,
                        orderedPokemonList: orderedCharacter,
                        filteredPokemonList: orderedCharacter,
                        //filteredPokemonList: state.orderedCharacter,
                    }
                case ORDER_ATTACK:
                    const orderedAttackCharacter = [...state.filteredPokemonList].sort((a, b) => {
                        if (payload === 'asc') return a.attack - b.attack;
                        return b.attack - a.attack;
                    });
                    return {
                        ...state,
                        orderedPokemonList: orderedAttackCharacter,
                        filteredPokemonList: orderedAttackCharacter,
                        //filteredPokemonList: state.orderedCharacter,
                    };
                case ORDER_CANCEL:
                    const cancelOrdered = [...state.filteredPokemonList].sort((a, b) => {
                        if (payload === 'asc') return a.attack - b.attack;
                        return b.attack - a.attack;
                    });
                    return {
                        ...state,
                        orderedPokemonList: orderedAttackCharacter,
                        };    
                case ERROR:
                    return {
                        ...state,
                        errors: payload
                    }
            default:
                return state
        }
    }

export default reducer