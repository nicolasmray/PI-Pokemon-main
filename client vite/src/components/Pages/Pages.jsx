 import { useState } from 'react';
 import Card from '../Card/Card';
 import style from './Pages.module.css'

 export default function Pages({pagina, porPagina, setPagina, maximo, characters}) { 
     const [input, setInput] =useState(1)

    const nextPage = () => {
         setInput(parseInt(input) + 1)
         setPagina(parseInt(pagina) + 1)
    }

    const prevPage = () => {
     setInput(parseInt(input) - 1)
     setPagina(parseInt(pagina) - 1)
 }

const onKeyDown = (e) => {
    if (e.keyCode === 13) {
        const pageNumber = parseInt(e.target.value);
        if (pageNumber < 1 || pageNumber > Math.ceil(maximo) || isNaN(pageNumber)) {
            setPagina(1);
            setInput(1);
        } else {
            setPagina(pageNumber);
            setInput(pageNumber.toString());
        }
    }
}

 const onChange = (e) => {
     setInput(e.target.value)
 }

    return (
       <div className={style.container}>
          {characters.slice((pagina -1)* porPagina, (pagina - 1)* porPagina + porPagina).map(char => (
             <Card 
                //key={char.id} //-- APAGUE LA KEY!! VOLVER ACTIVAR SI NECESARIO
                id={char.id}
                //fid={char.fid}
                name={char.name} 
                height={char.height}
                weight={char.weight}
                image={char.image}
                hp={char.hp}
                attack={char.attack}
                defense={char.defense}
                speed={char.speed}
                types={char.types}
                />
             ))
            
          }
         <div className={style.container}>
             <button onClick={prevPage} disabled={pagina === 1 || pagina < 1} >Previous</button>
             <input className={style.inputContainer} name='page' autoComplete='off' onKeyDown={(e)=> onKeyDown(e)} onChange={(e) => onChange(e)} value={input} title="Press ENTER" /> 
             <p> of {maximo} </p>
             <button onClick={nextPage} disabled={pagina === Math.ceil(maximo) || pagina > Math.ceil(maximo)}>Next</button>
             <br/>
             <p className={style.enterMessage}> Press Enter </p>
          </div>
       </div>
    )
 }

