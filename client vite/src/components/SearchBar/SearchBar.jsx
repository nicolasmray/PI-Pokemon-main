import { useState } from "react";
import style from './SearchBar.module.css'

export default function SearchBar(props) {
   const [id, setId] = useState('')
   const [searchType, setSearchType] = useState('id')

   function handleChange(evento){
      setId(evento.target.value)
   }

   const search = () => {
      props.onSearch(id)
      setId('')
   }
   const RandomCharacter = () => {
    props.onSearch('Agregar personaje Aleatorio')
    setId('')
 }
   const handleTypeChange = (event) => {
    setSearchType(event.target.value);
  };


   return (
      <div className={style.container}>
         <input type='search' onChange={handleChange} placeholder="Insert ID/Name" value={id} className={style.searchBar} />
         <select onChange={handleTypeChange} value={searchType} className={style.searchTypeDropdown}>
            <option value="id">ID</option>
            <option value="name">Name</option>
        </select>
         <button onClick={search} className={style.searchButton} >Search</button>
         <button onClick={RandomCharacter} className={style.addRandomButton} >Add Random Character</button>
      </div>
   );
}
