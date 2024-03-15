import { FETCH_CHARACTERS, ADD_CHARACTER, RESET_CHARACTERS, FILTER_TYPE, FILTER_API, ORDER_ALPHABET, ORDER_ATTACK, ERROR } from "./actionTypes";
import axios from "axios"

export const fetchCharacters = (characters) => {
    return {
        type: FETCH_CHARACTERS,
        payload: characters,
    }
}
  
export const addCharacter = (character) => {
    return {
        type: ADD_CHARACTER,
        payload: character,
    }
}

export const resetCharacters = () => {
    return {
        type: RESET_CHARACTERS,
    }
}

export const filterCardsType = (types) => {
    return {
        type: FILTER_TYPE,
        payload:types
    }
}

export const filterCardsApi = (id) => {
    return {
        type: FILTER_API,
        payload:id
    }
}

export const orderCardsAlphabet = (ordenAlfabet) => {
    return {
        type: ORDER_ALPHABET,
        payload:ordenAlfabet
    }
}

export const orderCardsAttack = (ordenAtaque) => {
    return {
        type: ORDER_ATTACK,
        payload:ordenAtaque
    }
}

//  import { FILTER_POKEMON, ORDER_POKEMON } from "./actionTypes";
//  import axios from "axios"

// export const filterPokemon = (ids) => ({
//     type: FILTER_POKEMON,
//     payload: {
//       ids,
//     },
//   });
  
//   export const orderPokemon = (field) => ({
//     type: ORDER_POKEMON,
//     payload: {
//       field,
//     },
//   });