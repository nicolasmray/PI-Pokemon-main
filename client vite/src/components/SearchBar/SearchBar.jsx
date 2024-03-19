import { useState } from "react"
import style from './SearchBar.module.css'

export default function SearchBar(props) {
   const [name, setName] = useState('')
   const [isValid, setIsValid] = useState(true)
   const [errorMessage, setErrorMessage] = useState('')

   function handleChange(evento){
      const newName = evento.target.value.toLowerCase()
      const regex = /^[a-zA-Z]{0,30}$/
      const isValidInput = regex.test(newName)
      setIsValid(isValidInput) 
      setErrorMessage('')
      if (isValidInput) {
         setName(newName) // Update the state with the new name if it's valid
         setErrorMessage('Only letters accepted, maximum 30 characters')
      }else {
         setErrorMessage('Only letters accepted, maximum 30 characters') // Show error message if input is invalid
      }
   }

   const searchName = () => {
      props.onSearchName(name)
      setName('')
   }

   const handleTypeChange = (event) => {
    setSearchType(event.target.value)
  };


   return (
      <div className={style.container}>
         <input type='search' onChange={handleChange} placeholder="Search Pokémon..." value={name} className={style.searchBar} style={{ color: 'white' }} /> 
         {/* <select onChange={handleTypeChange} value={searchType} className={style.searchTypeDropdown}>
            <option value="id">ID</option>
            <option value="name">Name</option>
        </select> */}
         <button onClick={searchName} className={style.searchButton} disabled={!isValid} >Go!</button>
         {/* <button onClick={RandomCharacter} className={style.addRandomButton} >Add Random Character</button> */}
      </div>
   )
}
