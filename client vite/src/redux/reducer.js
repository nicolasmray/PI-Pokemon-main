import { FETCH_CHARACTERS, ADD_CHARACTER, RESET_CHARACTERS, FILTER_TYPE, FILTER_API, FILTER_RESET, ORDER_ALPHABET, ORDER_ATTACK, ORDER_CANCEL, ERROR } from "./actionTypes"

const initialState = {
    pokemonList: [],
    filteredPokemonList: [],
    orderedPokemonList: [],
    filteredByType: [],
    filteredByAPI: [],
};

function reducer(state = initialState, { type, payload }){
    switch(type){
        case FETCH_CHARACTERS:
            return {
                pokemonList: payload,
                filteredPokemonList: payload,
                orderedPokemonList: payload,
                filteredByType: payload,
                filteredByAPI: payload,
            }

        case ADD_CHARACTER:
            return { 
                ...state, 
                pokemonList: [payload, ...state.pokemonList],
                filteredPokemonList: [payload, ...state.filteredPokemonList], // Update filtered list
                orderedPokemonList: [payload, ...state.orderedPokemonList],
                filteredByType:  [payload, ...state.filteredByType],
                filteredByAPI:  [payload, ...state.filteredByAPI],
            }

        case RESET_CHARACTERS:
            return { 
                ...initialState
            }

        case FILTER_TYPE:
            let typeFilteredCharacters = state.pokemonList;
            payload.forEach(type => {
                typeFilteredCharacters = typeFilteredCharacters.filter(pokemon => pokemon.types.includes(type));
            });
            return {
                ...state,
                filteredPokemonList: typeFilteredCharacters,
            };
        case FILTER_API:
            let filteredCharacters;
            if (payload === "API") {
                filteredCharacters = state.filteredPokemonList.filter(character => character.id.toString().length <= 10);
            } else if (payload === "DB") {
                filteredCharacters = state.filteredPokemonList.filter(character => character.id.toString().length > 10);
            } else {
                filteredCharacters = state.pokemonList;
            }
            return {
                ...state,
                filteredPokemonList: filteredCharacters,
            };
        case FILTER_RESET:
            return {
                ...state,
                orderedPokemonList: state.pokemonList,
                    filteredPokemonList: state.pokemonList,
            };    
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