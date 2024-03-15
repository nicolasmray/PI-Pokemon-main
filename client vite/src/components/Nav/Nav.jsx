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
              <Link to='/pokemons'><button className={style.button}>Home</button></Link>
              <button onClick={handleLandingClick} className={style.landingButton}>Landing</button>
              <SearchBar onSearchId={onSearchId} onSearchName={onSearchName} />
              <button onClick={handleFormClick} className={style.formButton}>Add New Pokemon</button>
            </div>
            </div>
}

export default Nav