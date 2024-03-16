import { FETCH_CHARACTERS, ADD_CHARACTER, RESET_CHARACTERS, FILTER_TYPE, FILTER_API, ORDER_ALPHABET, ORDER_ATTACK, ORDER_CANCEL, ERROR } from "./actionTypes";
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

export const filterCardsType = (characters) => {
    return {
        type: FILTER_TYPE,
        payload:characters
    }
}

export const filterCardsApi = (characters) => {
    return {
        type: FILTER_API,
        payload:characters
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

export const orderCardsCancel = (ordenCancel) => {
    return {
        type: ORDER_CANCEL,
        payload:ordenCancel
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