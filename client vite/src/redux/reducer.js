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
                    const filteredCharacters = [...state.pokemonList].filter(character => character.id.length > 10);
                    return {
                        ...state,
                        filteredPokemonList: filteredCharacters,
                    }
                case ORDER_ALPHABET:
                    const orderedCharacter = [...state.filteredPokemonList].sort((a, b) => {
                        if (payload === 'asc') return a.name.localeCompare(b.name);
                        return b.name.localeCompare(a.name);
                    });
                    return {
                        ...state,
                        orderedPokemonList: orderedCharacter,
                    }
                case ORDER_ATTACK:
                    const orderedAttackCharacter = [...state.filteredPokemonList].sort((a, b) => {
                        if (payload === 'asc') return a.attack - b.attack;
                        return b.attack - a.attack;
                    });
                    return {
                        ...state,
                        orderedPokemonList: orderedAttackCharacter,
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

// -----------------------------------------------------------------------------------------------------------
// import { FILTER_POKEMON, ORDER_POKEMON } from "./actionTypes";

// const initialState = {
//     pokemonList: [],
//     filteredPokemonList: [],
//     orderedPokemonList: [],
//   };

// const reducer = (state = initialState, action) => {
//     switch (action.type) {
//       case FILTER_POKEMON:
//         const filteredList = state.pokemonList.filter(pokemon => {
//           // Assuming action.payload.ids is an array of integers representing the IDs to filter
//           return action.payload.ids.includes(pokemon.id);
//         });
//         return {
//           ...state,
//           filteredPokemonList: filteredList,
//         };
//       case ORDER_POKEMON:
//         // Assuming action.payload.field is a string representing the field to order by
//         const orderedList = state.pokemonList.slice().sort((a, b) => {
//           if (a[action.payload.field] < b[action.payload.field]) {
//             return -1;
//           }
//           if (a[action.payload.field] > b[action.payload.field]) {
//             return 1;
//           }
//           return 0;
//         });
//         return {
//           ...state,
//           orderedPokemonList: orderedList,
//         };
//       default:
//         return state;
//     }
//   };
//   export default reducer