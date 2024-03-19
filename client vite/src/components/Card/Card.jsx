import { Link, useLocation } from 'react-router-dom'
import style from './Card.module.css'

// Destructuring input variables received by Card
function Card({id, name, height, weight, image, hp, attack, defense, speed, types}) { //, fid

   const formattedName = name.charAt(0).toUpperCase() + name.slice(1)

   const capitalizeFirstLetter = (str) => {return str.charAt(0).toUpperCase() + str.slice(1)}
   const formatTypes = (types) => {
      if (!Array.isArray(types)) return ''; // Check if types is an array
      return types
         .map(type => capitalizeFirstLetter(type)) // Capitalize the first letter of each type
         .join(', '); // Join the types back with ", " separator
   }

  const formattedTypes = formatTypes(types)
    
   return (
      <Link to={`/detail/${id}`} >
         <div className={style.container} >
            {/* <h2>Id number: {id}</h2> */}
            {/* <h2>FId number: {fid}</h2> */}
            {/* <h2>Height: {height}</h2>
            <h2>Weight: {weight}</h2> */}
            <img src={image} alt={name} className={style.image} />
            <h2 className={style.name}> {formattedName}</h2>
            {/* <h2>HP: {hp}</h2> */}
            {/* <h2>Attack: {attack}</h2> */}
            {/*<h2>Defense: {defense}</h2>
            <h2>Speed: {speed}</h2> */}
            <h2 className={style.types}>{formattedTypes}</h2>
         </div>
      </Link>
   )
}

export default (Card)

