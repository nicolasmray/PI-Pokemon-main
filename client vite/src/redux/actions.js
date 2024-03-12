import { FILTER, ORDER, ERROR } from "./actionTypes";
import axios from "axios"
const ENDPOINT = 'http://localhost:3001/rickandmorty/fav';


export const filterCards = (gender) => {
    return {
        type: FILTER,
        payload:gender
    }
}

export const orderCards = (orden) => {
    return {
        type: ORDER,
        payload:orden
    }
}