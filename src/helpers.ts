import { Dog, BreedsData, SearchProps } from './types'

//For App

export const checkAuth = async (setLogin: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
      const response = await fetch("https://frontend-take-home-service.fetch.com/dogs/search", {
        method: "GET",
        credentials: "include",
      })
  
      if (!response.ok) throw new Error("Not authenticated")
  
      setLogin(true)
    } catch (error) {
      console.error("Auth check failed:", error)
      setLogin(false)
    }
  }

export const fetchDogs = async (dogIds: string[], setDogs: React.Dispatch<React.SetStateAction<Dog[]>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (dogIds.length === 0) return
  
    try {
      const response = await fetch("https://frontend-take-home-service.fetch.com/dogs/", {
        method: "POST",
        body: JSON.stringify(dogIds),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })
  
      if (!response.ok) {
        throw new Error("Failed")
      }
  
      const json = await response.json()
      console.log(json, 'worked')
      setDogs(json)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  
  export const fetchDogIds = async (setDogIds: React.Dispatch<React.SetStateAction<string[]>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
      const response = await fetch("https://frontend-take-home-service.fetch.com/dogs/search", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      })
  
      if (!response.ok) {
        throw new Error("Failed")
      }
  
      const json = await response.json()
      setDogIds(json.resultIds)
      console.log(json.resultIds, 'dogids')
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

export const fetchContentByBreed = async (selectedBreeds: string[], setReturnedBreeds: React.Dispatch<React.SetStateAction<string[]>>) => {
     try {
        const queryParams = new URLSearchParams();
        selectedBreeds.forEach((breed) => queryParams.append("breeds", breed))

         const response = await fetch(`https://frontend-take-home-service.fetch.com/dogs/search/?${queryParams.toString()}`, {
             method: "GET",
             credentials: "include", 
     })
         if (!response.ok) {
             throw new Error(`Response status: ${response.status}`)
         }
         const json = await response.json()
         console.log(json)
         setReturnedBreeds(json.resultIds)
 
     } catch(error) {
         console.error('Login failed:', error)
         throw error
     }
 }

 // NOT DONE DO NOT USE -- Add map functionality?

 export const fetchContentByLocation = async (value: string) => {
    try {
        const response = await fetch(`https://frontend-take-home-service.fetch.com/locations/search/${value}`, {
            method: "GET",
            credentials: "include", 
    })
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
        }
        const json = await response.json()
        console.log(json)
        return json

    } catch(error) {
        console.error('Login failed:', error)
        throw error
    }
}

 //search component

export const fetchBreeds = async (setBreeds: React.Dispatch<React.SetStateAction<string[] | null>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
     try {
         const response = await fetch("https://frontend-take-home-service.fetch.com/dogs/breeds/", {
             method: "GET",
             credentials: "include",
         })
         if (!response.ok) {
             throw new Error("Failed")
         }
         const json: string[] | null = await response.json()
         setBreeds(json) 
     } catch (error) {
         console.error(error)
     } finally {
         setLoading(false)
     }
 }
  