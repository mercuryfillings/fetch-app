import React from 'react'
import { BrowseProps } from '../types'
  

const Browse: React.FC<BrowseProps> = ( { dogs } ) => {

    //handle user clicks

    //

  return (
    <div className="browse-page"> 
        <h1 className="browse-headline">Avialable Dogs</h1>
        <div className="browse-container">
            {dogs.map(dog => 
                <div key={dog.id} className="result-container">
                    <div className="preview-image-container">
                        <img className="preview-image" src={dog.img}/>
                    </div>
                    <div className="preview-info-container">
                        <p>{dog.name}</p>
                        <p>{dog.breed}</p>
                        <p>Age: {dog.age}</p>
                        <p>Zip: {dog.zip_code}</p>
                    </div>
                </div>
            )}
            <p>Page Numbers</p>
        </div>
    </div>
  )
}

export default Browse