import { Link, useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'
import style from './Nav.module.css'

//FILTROS:
import { useSelector, useDispatch } from 'react-redux'
import { resetCharacters } from '../../redux/actions.js'

function Nav({onSearchId, onSearchName, setIsDataLoaded}){
    const navigate = useNavigate()
     //FILTROS:
     const dispatch = useDispatch();

      const handleLandingClick = () => {
        // Navigate to the landing page
        //onDataChange([])

        //FILTROS:
        setIsDataLoaded(false)
        //dispatch(resetCharacters())
        navigate('/')
      }
      const handleFormClick = () => {
        // Navigate to the landing page
        navigate('/new/')
      }


    return <div className={style.outterContainer}>
           <div className={style.innerContainer}> 
              <div><Link to='/pokemons'><button className={style.homeButton}>Home</button></Link></div>
              <button onClick={handleFormClick} className={style.formButton}>¡Add New Pokémon!</button>
              <div><SearchBar onSearchId={onSearchId} onSearchName={onSearchName} /></div>
              <button onClick={handleLandingClick} className={style.landingButton}>Reset App</button>
            </div>
            </div>
}

export default Nav