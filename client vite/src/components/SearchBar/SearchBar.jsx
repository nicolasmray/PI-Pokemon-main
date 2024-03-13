import { useState } from "react";
import style from './SearchBar.module.css'

export default function SearchBar(props) {
   //const [id, setId] = useState('')
   const [inputValue, setInputValue] = useState('');
   const [searchType, setSearchType] = useState('id')

   const handleChange = (event) => {
      setInputValue(event.target.value);
    };
  
    const handleTypeChange = (event) => {
      setSearchType(event.target.value);
    };
  
    const handleSearch = () => {
      if (searchType === 'id') {
        props.onSearchId(inputValue);
      } else if (searchType === 'name') {
        props.onSearchName(inputValue);
      }
      setInputValue('');
    };
  
    const handleRandomCharacter = () => {
      props.onSearchId('Agregar personaje Aleatorio');
      setInputValue('');
    };
  
    return (
      <div className={style.container}>
        <input
          type='search'
          onChange={handleChange}
          placeholder="Insert ID/Name"
          value={inputValue}
          className={style.searchBar}
        />
        <select
          onChange={handleTypeChange}
          value={searchType}
          className={style.searchTypeDropdown}
        >
          <option value="id">ID</option>
          <option value="name">Name</option>
        </select>
        <button onClick={handleSearch} className={style.searchButton}>
          Search
        </button>
        <button onClick={handleRandomCharacter} className={style.addRandomButton}>
          Add Random Character
        </button>
      </div>
    );
  }

//    function handleChange(evento){
//       setId(evento.target.value)
//    }

//    const searchId = () => {
//       props.onSearchId(id)
//       setId('')
//    }
//    const searchName = () => {
//       props.onSearchName(name)
//       setId('')
//    }
//    const RandomCharacter = () => {
//     props.onSearchId('Agregar personaje Aleatorio')
//     setId('')
//  }
//    const handleTypeChange = (event) => {
//     setSearchType(event.target.value);
//   };


//    return (
//       <div className={style.container}>
//          <input type='search' onChange={handleChange} placeholder="Insert ID/Name" value={id} className={style.searchBar} />
//          <select onChange={handleTypeChange} value={searchType} className={style.searchTypeDropdown}>
//             <option value="id">ID</option>
//             <option value="name">Name</option>
//         </select>
//          <button onClick={searchId} className={style.searchButton} >Search</button>
//          <button onClick={RandomCharacter} className={style.addRandomButton} >Add Random Character</button>
//       </div>
//    );
// }
