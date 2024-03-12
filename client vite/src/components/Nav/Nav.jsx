import { Link, useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'
import style from './Nav.module.css'



function Nav({onSearch}){
    const navigate = useNavigate()

      const handleLandingClick = () => {
        // Navigate to the landing page
        navigate('/')
      }


    return <div className={style.outterContainer}>
           <div className={style.innerContainer}> 
              <Link to='/pokemons'><button className={style.button}>Home</button></Link>
              <button onClick={handleLandingClick} className={style.landingButton}>Landing</button>
              <SearchBar onSearch={onSearch} />
            </div>
            </div>
}

export default Nav