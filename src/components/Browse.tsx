import React from 'react'
import { BrowseProps } from '../types'
import Card from './Card'
  
const Browse: React.FC<BrowseProps> = ({ dogs, selectedDogs, setSelectedDogs }) => {

    //handle user clicks

    //

  return (
    <div className="browse-page"> 
        <div className="browse-container">
            {dogs.map(dog => 
                <Card key={dog.id} dog={dog} selectedDogs={selectedDogs} setSelectedDogs={setSelectedDogs}/>
            )}
        </div>
    </div>
  )
}

export default Browse