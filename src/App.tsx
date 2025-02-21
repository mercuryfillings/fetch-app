import Login from './components/Login'
import Search from './components/Search'
import Browse from './components/Browse'
import { useState, useEffect, useCallback } from 'react'
import { fetchDogs, fetchDogIds, checkAuth } from './helpers'
import { Dog } from './types'
import './styles/styles.css'

const App: React.FC = () => {

  const [login, setLogin] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [dogIds, setDogIds] = useState<string[]>([])
  const [dogs, setDogs] = useState<Dog[]>([])

  //function callbacks

  const fetchDogIdsCallback = useCallback(() => {
    fetchDogIds(setDogIds, setLoading)
  }, [])

  const fetchDogsCallback = useCallback(() => {
    console.log("Fetching dogs with dogIds:", dogIds); // Debugging
    if (dogIds.length > 0) {
      fetchDogs(dogIds, setDogs, setLoading);
    }
  }, [dogIds, setDogs, setLoading]);
  
  const updateDogIds = useCallback((newIds: string[]) => {
    if (!Array.isArray(newIds)) {
      console.error("updateDogIds received a non-array value:", newIds);
      return
    }
    setDogIds((prevIds) => {
      if (JSON.stringify(prevIds) !== JSON.stringify(newIds)) {
        return [...newIds]
      }
      return prevIds;
    })
  }, [])

  useEffect(() => {
    if (login) {
      fetchDogIdsCallback()
    }
  }, [login, fetchDogIdsCallback])

  useEffect(() => {
    console.log("dogIds updated:", dogIds);
    fetchDogsCallback()
  }, [dogIds, fetchDogsCallback])

  useEffect(() => {
    checkAuth(setLogin)
  }, []);


  return (

    <main className="app-container">
        <div className="app-content-container">
          {!login && <Login />}
          {login &&
           <>
            <Search updateDogIds={updateDogIds} />  
            <Browse dogs={dogs}/>
           </>}
        </div>
    </main>
  )
}

export default App
