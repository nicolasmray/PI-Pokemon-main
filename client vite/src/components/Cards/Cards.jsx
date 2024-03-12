import Card from '../Card/Card';
import style from './Cards.module.css'


export default function Cards(props) {
   const {characters} = props
   return (
      <div className={style.container}>
         {characters.map(char => (
            <Card 
               key={char.id}
               id={char.id}
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
      </div>
   )
}
