import { CardProps } from '../types'
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io"


const Card: React.FC<CardProps> = ({dog, selectedDogs, setSelectedDogs, x}) => {

  const handleClick = () => {
    if (!x) {
      if (!selectedDogs.includes(dog.id) && selectedDogs.length < 100) {
        setSelectedDogs([...selectedDogs, dog.id])
      } 
      if (selectedDogs.includes(dog.id)) {
        setSelectedDogs(selectedDogs.filter(item => item !== dog.id))
      }
    }
}

  const handleRemove = () => {
    setSelectedDogs(prev => prev.filter(item => item !== dog.id))
  }

  return (
    <div className="card-container" onClick={handleClick}>
      <div className="card-image-container">
          <img className="card-image" src={dog.img}/>
      </div>
      <div className="card-info-container">
          <p className="card-dog-name">{dog.name}</p>
          <p className="card-breed-name">{dog.breed}</p>
          <p className="card-content">Age: {dog.age}</p>
          <p className="card-content">Zip: {dog.zip_code}</p>
      </div>
      <div className="card-icon-container">
        {
          x ? <button className="x" onClick={handleRemove}>remove</button> : 
          selectedDogs.includes(dog.id) ? <div className="icon"><IoIosHeart /></div> : <div className="icon"><IoIosHeartEmpty /></div>
        }
      </div>
    </div>
  )
}

export default Card