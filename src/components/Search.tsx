import { useState, useEffect } from 'react'

// type Props = {}

export default function Search() {

    const [input, setInput] = useState('')
    const [breeds, setBreeds] = useState([])

    const handleChange = (e) => {
        setInput(e.target.value)
    }

    const listBreeds = async () => {
        try {
            setBreeds(await getDogs())
            console.log(breeds)
        } catch(error) {
            console.error(error)
            throw Error
        }
        
    }
    
    const getDogs = async () => {
        try {
            const response = await fetch(`https://frontend-take-home-service.fetch.com/dogs/breeds/${input}`, {
                method: "GET",
                credentials: "include", 
        })
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            return data
    
        } catch(error) {
            console.error('Login failed:', error);
            throw error;
        }
    }
  return (
    <div className="search-page">
        <div className="search-container">
            <select className="search-select">
                <option>One</option>
                <option>Two</option>
                <option>Three</option>
                <option>Four</option>
            </select>
            <input type='search' onChange={handleChange}/>
            <button onClick={listBreeds}>Test Get Dogs</button>
        </div>
    </div>
  )
}