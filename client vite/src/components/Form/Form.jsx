import { useState, useEffect } from 'react'
import axios from 'axios'
import validation from "./validation.js"
import style from './Form.module.css'

function Form({data, onDataChange }) {
    const [userData, setUserData] = useState({
      //id:'',
      //fid:'',
      name:'',
      height:'',
      weight:'',
      image:'',
      hp:'',
      attack:'',
      defense:'',
      speed:'',
      types:[], //le agregue el pokemon
    })

    const[errors, setErrors] = useState({})
    //const [successMessage, setSuccessMessage] = useState(null);


    // const handleChange = (evento) => {
    //     setErrors(validation({...userData, [evento.target.name]:evento.target.value}))
    //     setUserData({...userData, [evento.target.name]:evento.target.value})
    //     onDataChange && onDataChange({ ...userData, [evento.target.name]: evento.target.value })
    // }

    const [selectedTypes, setSelectedTypes] = useState([]); 
    const [typesArray, setTypesArray] = useState([]);
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
      const errorsArray = Object.values(errors);
      setIsFormValid(userData.name && userData.height && userData.weight && userData.image && userData.hp && userData.attack && userData.defense && userData.speed && selectedTypes.length > 0 && errorsArray.every(error => !error));
    }, [userData, errors, selectedTypes]);
    //const typesArray = typesForFilter//['grass', 'fire', 'water', 'electric', 'normal', 'psychic', 'dark', 'flying', 'rock', 'ground', 'dragon', 'ice', 'bug', 'poison', 'fairy', 'steel', 'ghost'];
    
    // OBTENER TIPOS DE POKEMON

    useEffect(() => {
        // Fetch types data when component mounts
        fetchTypes();
    }, []);

    const fetchTypes = async () => {
        try {
            const response = await axios.get('http://localhost:3001/types/');
            // Assuming the response.data contains the types
            const typesForFilter = response.data.types;
            console.log(typesForFilter); // Display the types in the console
            //return typesForFilter
            setTypesArray(typesForFilter);
        } catch (error) {
            console.error('Error fetching types:', error);
        }
    };
    const selectionDisplay = selectedTypes.join(", ")
    //<<<<<

    // const handleTypeFilter = () => {
    //     // Enviar acción de filtrado al reducer
    //     dispatch({ type: FILTER_TYPE, payload: selectedTypes });
    // };

    const handleTypeChange = (e) => {
        //setSelectedTypes(Array.from(e.target.selectedOptions, (option) => option.value));
        const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
        setSelectedTypes(selectedValues);
    };

    // const handleChange = (evento) => {
    //     if (evento.target.name === 'types') { //le agregue el pokemon
    //       // Split the input string into an array of types
    //       setUserData({ ...userData, [evento.target.name]: evento.target.value.split(', ') });
    //     } else {
    //       const value = evento.target.name === 'name' ? evento.target.value.toLowerCase() : evento.target.value;
    //       setUserData({ ...userData, [evento.target.name]: evento.target.value });
    //     }
    //     setErrors(validation({ ...userData, [evento.target.name]: evento.target.value }));
    //   };

    const handleChange = (evento) => {
      const fieldName = evento.target.name;
      let fieldValue = evento.target.value;
    
      // Convert name to lowercase if it's the 'name' field
      if (fieldName === 'name') {
        fieldValue = fieldValue.toLowerCase();
      } else if (fieldName === 'image') {
        // For 'image' field, no need to parse to integer
      } else {
        // Parse numeric fields to numbers
        fieldValue = parseInt(fieldValue, 10); // Assuming base 10 for integers
      }
    
      // Validate the current field separately
      const fieldErrors = validation({ [fieldName]: fieldValue });
    
      // Update the error state for the current field only
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: fieldErrors[fieldName] || '', // Clear the error if validation passes
      }));
    
      // Update the user data state
      setUserData((prevUserData) => ({
        ...prevUserData,
        [fieldName]: fieldValue,
      }));
    };
    

    const handleSubmit = async (evento) => {
      evento.preventDefault()
      try {
        // Make a POST request to your back-end endpoint
        const response = await axios.post('http://localhost:3001/pokemons/', {
           ...userData,
          types: selectedTypes,
        });
        
        // Handle the response accordingly
        console.log(response.data); // You may want to handle this response in a different way based on your requirements
        //setSuccessMessage('Pokemon added successfully!')
        if (response.data.created === true) {
            alert('Pokemon added successfully!');
            onDataChange && onDataChange(response.data.pokemon); // Call the callback function to update state
            setUserData({
              name: '',
              height: '',
              weight: '',
              image: '',
              hp: '',
              attack: '',
              defense: '',
              speed: '',
              types: []
            });
    
            // Clear the errors state
            setErrors({});
            setSelectedTypes([]);

            
          } else if (response.data.created === false) {
            alert('El pokemon ya existe en la base de datos!');
          }
        // You can also pass the response data to the parent component if needed
        //data(response.data);
      } catch (error) {
        console.error('Error submitting the form:', error);
        //setSuccessMessage(null)
      }
    }

  return <div className={style.container} >
        <img src={"https://64.media.tumblr.com/61c23463929fd552d6dfc5f757538f49/tumblr_p23duqIatc1td9nt5o1_540.gif"} alt="error" className={style.img} />
        <form onSubmit={handleSubmit} className={style.form}>
         {/* <label htmlFor="fid">
           FID: 
          <input type="number" placeholder="Insert FID" id="fid" name="fid" value={userData.id} onChange={handleChange} className={errors.fid ? style.error : style.fid}/>
         </label>
         { errors.fid && <p>{errors.fid}</p> }
         <br /> */}
        <label htmlFor="name">
           Name: 
           <input type="text" placeholder="Insert Name" id="name" name="name" value={userData.name} onChange={handleChange} className={errors.name ? style.error : style.name}/>
        </label>
        { errors.name && <p>{errors.name}</p> }
        <br/>
        <label htmlFor="height">
        Height: 
           <input type="number" placeholder="Insert Height" id="height" name="height" value={userData.height} onChange={handleChange} className={errors.height ? style.errorHeight : style.characteristic}/>
        </label>
        { errors.height && <p>{errors.height}</p> }
        <br/>
        <label htmlFor="weight">
        Weight: 
           <input type="number" placeholder="Insert Weight" id="weight" name="weight" value={userData.weight} onChange={handleChange} className={errors.weight ? style.errorWeight : style.characteristic}/>
        </label>
        { errors.weight && <p>{errors.weight}</p> }
        <br/>
        <label htmlFor="image">
        Image:
        <input type="text" placeholder="Insert Image URL" id="image" name="image" value={userData.image} onChange={handleChange} className={errors.image ? style.error : style.characteristic}/>
        </label>
        { errors.image && <p>{errors.image}</p> }
        <br/> 
        <label htmlFor="hp">
        HP: 
           <input type="number" placeholder="Insert HP value" id="hp" name="hp" value={userData.hp} onChange={handleChange} className={errors.hp ? style.error : style.characteristic}/>
        </label>
        { errors.hp && <p>{errors.hp}</p> }
        <br/>
        <label htmlFor="attack">
        Attack: 
           <input type="number" placeholder="Insert Attack" id="attack" name="attack" value={userData.attack} onChange={handleChange} className={errors.attack ? style.error : style.characteristic}/>
        </label>
        { errors.attack && <p>{errors.attack}</p> }
        <br/>
        <label htmlFor="defense">
        Defense: 
           <input type="number" placeholder="Insert Defense" id="defense" name="defense" value={userData.defense} onChange={handleChange} className={errors.defense ? style.error : style.characteristic}/>
        </label>
        { errors.defense && <p>{errors.defense}</p> }
        <br/>
        <label htmlFor="speed">
        Speed: 
           <input type="number" placeholder="Insert Speed" id="speed" name="speed" value={userData.speed} onChange={handleChange} className={errors.speed ? style.errorSpeed : style.characteristic}/>
        </label>
        { errors.speed && <p>{errors.speed}</p> }
        <br/>
        <div>
                <h4>Select Types:</h4>
                <select multiple={true} onChange={handleTypeChange} value={selectedTypes}>
                    {typesArray.map((type) => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
                <h4>Selection:</h4>
                <h4>{selectionDisplay}</h4>
            </div>
        <br/>

        <button className={style.submitButton}type='submit' disabled={!isFormValid} >Submit</button>
    </form>
    
  </div>
  
}

export default Form
       
        // <label htmlFor="id">
        //   ID: 
        //   <input type="number" placeholder="Insert ID" id="id" name="id" value={userData.id} onChange={handleChange} className={errors.id ? style.error : style.id}/>
        // </label>
        // { errors.id && <p>{errors.id}</p> }
        // <br />