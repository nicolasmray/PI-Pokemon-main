 import { useState } from 'react';
 import Card from '../Card/Card';
 import style from './Pages.module.css'


 export default function Pages({pagina, porPagina, setPagina, maximo, characters}) { //pagina, porPagina, setPagina, maximo, characters
     const [input, setInput] =useState(1)
 // PAGINA APP:
 //    const [pagina, setPagina] = useState(1)
 //   const [porPagina, setPorPagina] = useState(5)
 //const maximo = characters.length / porPagina
  

    const nextPage = () => {
         setInput(parseInt(input) + 1)
         setPagina(parseInt(pagina) + 1)
    }

    const prevPage = () => {
     setInput(parseInt(input) - 1)
     setPagina(parseInt(pagina) - 1)
 }

 const onKeyDown = (e) => {
     if(e.keyCode == 13) {
         setPagina(parseInt(e.target.value))
     }
     if(parseInt(e.target.value < 1) || parseInt(e.target.value > Math.ceil(maximo)) || isNaN(parseInt(e.target.value))) {
         setPagina(1)
         setInput(1)
     } else {
         setPagina(parseInt(e.target.value))
     }
 }

 const onChange = (e) => {
     setInput(e.target.value)
 }

    return (
       <div className={style.container}>
          {characters.slice((pagina -1)* porPagina, (pagina - 1)* porPagina + porPagina).map(char => (
             <Card 
                //key={char.id} -- APAGUE LA KEY!! VOLVER ACTIVAR SI NECESARIO
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
             <input name='page' autoComplete='off' onKeyDown={(e)=> onKeyDown(e)} onChange={(e) => onChange(e)} value={input} /> 
             <p> of {maximo} </p>
             <button onClick={nextPage} disabled={pagina === Math.ceil(maximo) || pagina > Math.ceil(maximo)}>Next</button>
          </div>
       </div>
    )
 }
