import React from 'react'
import { BrowseProps } from '../types'
import Card from './Card'
  
const Browse: React.FC<BrowseProps> = ({ dogs, selectedDogs, setSelectedDogs, match, x }) => {
 
  const matchDetails = dogs.filter(item => item.id === match)[0] || {
    name: "",
    id: "",
    age: 0,
    breed: "",
    img: "",
    zip_code: "",
  }

  const { name, age, breed, img } = matchDetails


  return (    
    <div className="browse-page"> 
    {
      match &&
        <div className="match-results">
          <div className="match-image-container"><img className="match-image" src={img} /></div>
          <div className="match-copy-container">
            <p className="match-copy">Your new dog is</p>
            <p className="match-madlib">{name}!</p>
            <p className="match-madlib"> {name}</p> 
            <p className="match-copy">is a</p> 
            <p className="match-madlib">{age}</p> 
            <p className="match-copy">year old</p> 
            <p className="match-madlib">{breed.toLowerCase()}</p> 
            <p className="match-copy">who is very excited to join your family.</p>
          </div>
        </div>
    }
        <div className="browse-container">
            {!match && dogs.map(dog => 
                <Card key={dog.id} dog={dog} selectedDogs={selectedDogs} setSelectedDogs={setSelectedDogs} x={x}/>
            )}
        </div>
    </div>
  )
}

export default Browse