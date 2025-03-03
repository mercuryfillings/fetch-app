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
        console.log('fetchDogs', json)
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
    setNext: React.Dispatch<React.SetStateAction<string>>,
    numberOfResults: number | undefined, 
    sortBy: string) => {
    try {

        const size = numberOfResults ?? 10

        console.log('size', size)

        const response = await fetch(`https://frontend-take-home-service.fetch.com/dogs/search?size=${size}&sort=${sortBy}`, {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        })

        if (!response.ok) {
            throw new Error("Failed")
        }

        const json = await response.json()
        console.log('fetchDogIds', json, `next: ${json.next}, total: ${json.total}`)
        setNext(json.next)
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
    numResults: string | undefined,
    minAge: string,
    maxAge: string,
    sortBy: string,
    setReturnedBreedIds: React.Dispatch<React.SetStateAction<string[]>>,
    setTotalResults: React.Dispatch<React.SetStateAction<number>>,
    setNext: React.Dispatch<React.SetStateAction<string>>,
    setSearchParameters: React.Dispatch<React.SetStateAction<object>>
) => {
    try {
        const queryParams = new URLSearchParams()
        if (selectedBreeds.length > 0) {
            selectedBreeds.forEach((breed) => queryParams.append("breeds", breed))
        } 
        if (zipCode && zipCode.length === 5) queryParams.append("zipCodes", zipCode)
        queryParams.append("size", numResults && numResults.trim() !== "" ? numResults : "10")
        if (minAge) queryParams.append("ageMin", minAge)
        if (maxAge) queryParams.append("ageMax", maxAge)
        queryParams.append("sort", sortBy ? sortBy : "breed:asc")

            console.log('queryParams', queryParams.toString())

        const response = await fetch(`https://frontend-take-home-service.fetch.com/dogs/search/?${queryParams.toString()}`, {
            method: "GET",
            credentials: "include",
        })
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
        }
        const json = await response.json()
        console.log('fetchContent', json)
        setTotalResults(json.total)
        setNext(json.next)
        setReturnedBreedIds(json.resultIds)

        if (numResults) {
            setSearchParameters((prev) => ({
            ...prev,
            numberOfResults: parseInt(numResults),
          }))}

    } catch (error) {
        console.error('Login failed:', error)
        throw error
    }
}

export const fetchNext = async (
    next: string,
    setReturnedBreedIds: React.Dispatch<React.SetStateAction<string[]>>,
    setPrev: React.Dispatch<React.SetStateAction<string>>, 
    setNext: React.Dispatch<React.SetStateAction<string>>) => {
    try {
        const response = await fetch('https://frontend-take-home-service.fetch.com' + next, {
            method: "GET",
            credentials: "include",
        })
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
        }
        const json = await response.json() 
        console.log('fetchContent', json)
        setPrev(json.prev)
        setNext(json.next)
        setReturnedBreedIds(json.resultIds)

    } catch (error) {
        console.error('Next failed:', error)
        throw error
    }
}

export const fetchPrev = async (
    prev: string,
    setReturnedBreedIds: React.Dispatch<React.SetStateAction<string[]>>,
    setPrev:React.Dispatch<React.SetStateAction<string>>, 
    setNext: React.Dispatch<React.SetStateAction<string>>) => {
    try {
        const response = await fetch('https://frontend-take-home-service.fetch.com' + prev, {
            method: "GET",
            credentials: "include",
        })
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
        }
        const json = await response.json() 
        console.log('fetchContent', json)
        setPrev(json.prev)
        setNext(json.next)
        setReturnedBreedIds(json.resultIds)

    } catch (error) {
        console.error('Next failed:', error)
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

