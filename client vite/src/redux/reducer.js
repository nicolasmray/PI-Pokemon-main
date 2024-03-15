import { FETCH_CHARACTERS, ADD_CHARACTER, RESET_CHARACTERS, FILTER_TYPE, FILTER_API, ORDER_ALPHABET, ORDER_ATTACK, ERROR } from "./actionTypes"

const initialState = {
    pokemonList: [],
    filteredPokemonList: [],
    orderedPokemonList: [],
};

function reducer(state = initialState, { type, payload }){
        switch(type){
                case FETCH_CHARACTERS:
                    return {
                        pokemonList: payload
                    }
                case ADD_CHARACTER:
                    return { 
                        ...state, 
                        pokemonList: [payload, ...state.pokemonList]
                    }
                case RESET_CHARACTERS:
                    return { 
                        ...initialState
                        // pokemonList: [],
                        // filteredPokemonList: [],
                        // orderedPokemonList: [],
                    }
                case FILTER_TYPE:
                    const typeFiltered = state.allCharacters.filter(char => char.types === payload)
                    return {
                        ...state,
                        myFavorites: payload === 'All' ? state.allCharacters : typeFiltered
                    }
                case FILTER_API:
                    const apiFiltered = state.allCharacters.filter(char => char.id === payload)
                    return {
                        ...state,
                        myFavorites: payload === 'All' ? state.allCharacters : apiFiltered
                    }
                case ORDER_ALPHABET:
                    const orderedCharacter = state.myFavorites.sort((a, b) => {
                        if(payload === 'ascendente')
                        return a.name - b.name
                        return b.name - a.name
                    }) 
                    return {
                        ...state,
                        myFavorites: [...orderedCharacter]
                    }
                case ORDER_ATTACK:
                    const orderedCharacte = state.myFavorites.sort((a, b) => {
                        if(payload === 'ascendente')
                        return a.attack - b.attack
                        return b.attack - a.attack
                    }) 
                    return {
                        ...state,
                        myFavorites: [...orderedCharacter]
                    }
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