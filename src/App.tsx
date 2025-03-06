import Login from './components/Login'
import Search from './components/Search'
import Browse from './components/Browse'
import Layout from './components/Layout'
import Pagination from './components/Pagination'
import { useState, useEffect, useCallback } from 'react'
import { fetchDogs, fetchDogIds, checkAuth, logoutUser, fetchNext, fetchPrev } from './helpers'
import { Dog } from './types'
import './styles/styles.css'

const App: React.FC = () => {

  //State

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [browseHeader, setBrowseHeader] = useState<string>('browse-header')
  const [loading, setLoading] = useState<boolean>(true)
  const [dogIds, setDogIds] = useState<string[]>([])
  const [dogs, setDogs] = useState<Dog[]>([])
  const [totalResults, setTotalResults] = useState<number>(1)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [selectedDogs, setSelectedDogs] = useState<string[]>([])
  const [prev, setPrev] = useState<string>('')
  const [next, setNext] = useState<string>('')
  const [returnedBreedIds, setReturnedBreedIds] = useState<string[]>([])
  const [numberOfResults, setNumberOfResults] = useState<number>(12)
  const copy = {
    standard: "Select poential matches below",
    alert: "No results found. Try again." 
  }

  const { standard, alert } = copy

  const totalPages = Math.ceil(totalResults / numberOfResults)

  const handleLogout = () => {
    setSelectedDogs([])
    logoutUser(setIsLoggedIn)
  }

  const onNext = async () => {
    if (!next) return
    await fetchNext(next, setReturnedBreedIds, setPrev, setNext)
    setCurrentPage((prevPage) => prevPage + 1)
  }

  const onPrev = async () => {
    if (!prev) return
    await fetchPrev(prev, setReturnedBreedIds, setPrev, setNext)
    setCurrentPage(currentPage - 1)
  }

  //function callbacks

  const fetchDogIdsCallback = useCallback(() => {
    fetchDogIds(setDogIds, setLoading, setTotalResults, setNext)
  }, [])

  const fetchDogsCallback = useCallback(() => {
    if (dogIds.length > 0) {
      fetchDogs(dogIds, setDogs, setLoading)
    }
  }, [dogIds, setDogs, setLoading])
  
  const updateDogIds = useCallback((newIds: string[]) => {
    if (!Array.isArray(newIds)) {
      console.error("updateDogIds received a non-array value:", newIds)
      return
    }
    setDogIds((prevIds) => {
      if (JSON.stringify(prevIds) !== JSON.stringify(newIds)) {
        return [...newIds]
      }
      return prevIds
    })
  }, [])

  const handleResultCopy = useCallback(() => {
    if (totalResults > 0) {
      setBrowseHeader('browse-header')
      setCurrentPage(1)
    }
    if (totalResults === 0) {
          setBrowseHeader('browse-header alert')
        }
      }, [totalResults, setBrowseHeader])

  useEffect(() => {
    if (isLoggedIn) {
      fetchDogIdsCallback()
      setCurrentPage(1)
    }
  }, [isLoggedIn, fetchDogIdsCallback])

  useEffect(() => {
    fetchDogsCallback()
  }, [dogIds, fetchDogsCallback])

  useEffect(() => {
    checkAuth(setIsLoggedIn)
  }, [])

  useEffect(() => {
    handleResultCopy()
  }, [handleResultCopy])

  return (

    <>
      <Layout isLoggedIn={isLoggedIn} handleLogout={handleLogout} selectedDogs={selectedDogs}>
        <main className="app-container">
              {!isLoggedIn && 
              <div className="login-container">
                <div className="login-copy-container">
                  <h2 className="login-headline">Bring Love Home</h2>
                  <p className="login-copy">Choose from hundreds of dogs available for adoption. Build your perfect wish list. Search by breed and zip code. Click match and let our algorithm connect you with your new best friend.</p>
                </div>
                <Login 
                  setIsLoggedIn={setIsLoggedIn}
                />
              </div>}
              {isLoggedIn &&
               <div className="app-content-container">
                <Search 
                  updateDogIds={updateDogIds} 
                  setTotalResults={setTotalResults}
                  setNext={setNext}
                  setPrev={setPrev}
                  returnedBreedIds={returnedBreedIds}
                  setReturnedBreedIds={setReturnedBreedIds}
                  setNumberOfResults={setNumberOfResults}
                />
                <div className="page-container">
                  <h2 className={browseHeader}>{totalResults === 0 ? alert : standard}</h2>
                  <Browse 
                    dogs={dogs} 
                    selectedDogs={selectedDogs} 
                    setSelectedDogs={setSelectedDogs}
                    match={''}
                    x={false}
                  />
                  <Pagination 
                    onNext={onNext}
                    onPrev={onPrev}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                  />
                </div>
              </div>
               }
        </main>
      </Layout>
    </>
  )
}

export default App
