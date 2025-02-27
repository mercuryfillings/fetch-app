import { Dog } from './types'

//For App

export const checkAuth = async (setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
        const response = await fetch("https://frontend-take-home-service.fetch.com/dogs/search", {
            method: "GET",
            credentials: "include",
        })

        if (!response.ok) throw new Error("Not authenticated")

        setIsLoggedIn(true)
    } catch (error) {
        console.error("Auth check failed:", error)
        setIsLoggedIn(false)
    }
}

export const loginUser = async (myHeaders: Headers, formData: { name: string; email: string }, setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
        const response = await fetch('https://frontend-take-home-service.fetch.com/auth/login', {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify({...formData}),
            credentials: "include"
          });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }
        const data = await response;
        setIsLoggedIn(true)
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
}

export const logoutUser = async (setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
        const response = await fetch("https://frontend-take-home-service.fetch.com/auth/logout", {
            method: "POST",
            credentials: "include",
        })

        if (!response.ok) throw new Error("Not authenticated")

        setIsLoggedIn(false)
    } catch (error) {
        console.error("Auth check failed:", error)
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
        setDogs(json)
    } catch (error) {
        console.error(error)
    } finally {
        setLoading(false)
    }
}

export const fetchDogIds = async (
    setDogIds: React.Dispatch<React.SetStateAction<string[]>>, 
    setLoading: React.Dispatch<React.SetStateAction<boolean>>, 
    setTotalResults: React.Dispatch<React.SetStateAction<number>>, 
    zipCode: number,
    numberOfResults: number, 
    sortBy: string, 
    minAge: number, 
    maxAge: number) => {
    try {
        const response = await fetch(`https://frontend-take-home-service.fetch.com/dogs/search?size=${numberOfResults}&sort=breed:${sortBy}`, {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        })

        if (!response.ok) {
            throw new Error("Failed")
        }

        const json = await response.json()
        console.log(json)
        setDogIds(json.resultIds)
        setTotalResults(json.total)
    } catch (error) {
        console.error(error)
    } finally {
        setLoading(false)
    }
}

export const fetchContent = async (
    selectedBreeds: string[], 
    zipCode: string,
    numResults: string,
    minAge: string,
    maxAge: string,
    sortBy: string,
    setReturnedBreeds: React.Dispatch<React.SetStateAction<string[]>>) => {
    try {
        const queryParams = new URLSearchParams()
        selectedBreeds.forEach((breed) => queryParams.append("breeds", breed))
        if (zipCode) queryParams.append("zipCodes", zipCode)
        if (numResults) queryParams.append("size", numResults)
        if (minAge) queryParams.append("ageMin", minAge)
        if (maxAge) queryParams.append("ageMax", maxAge)
        if (sortBy) queryParams.append("sort", sortBy)

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

    } catch (error) {
        console.error('Login failed:', error)
        throw error
    }
}

export const fetchContentByLocation = async (value: string) => {
    try {
        const response = await fetch(`https://frontend-take-home-service.fetch.com/locations/search/${value}`, {
            method: "POST",
            credentials: "include",
        })
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
        }
        const json = await response.json()
        console.log(json)
        return json

    } catch (error) {
        console.error('Login failed:', error)
        throw error
    }
}

//search component

export const fetchOptions = async (option:string, setBreeds: React.Dispatch<React.SetStateAction<string[]>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
        const response = await fetch(`https://frontend-take-home-service.fetch.com/dogs/${option}`, {
            method: "GET",
            credentials: "include",
        })
        if (!response.ok) {
            throw new Error("Failed")
        }
        const json: string[] = await response.json()
        setBreeds(json)
    } catch (error) {
        console.error(error)
    } finally {
        setLoading(false)
    }
}

