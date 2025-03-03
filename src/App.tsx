import Login from './components/Login'
import Search from './components/Search'
import Browse from './components/Browse'
import Layout from './components/Layout'
import Pagination from './components/Pagination'
import { useState, useEffect, useCallback } from 'react'
import { fetchDogs, fetchDogIds, checkAuth, logoutUser, fetchNext, fetchPrev } from './helpers'
import { Dog, SearchParameters } from './types'
import './styles/styles.css'

const App: React.FC = () => {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [dogIds, setDogIds] = useState<string[]>([])
  const [dogs, setDogs] = useState<Dog[]>([])
  const [totalResults, setTotalResults] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [selectedDogs, setSelectedDogs] = useState<string[]>([])
  const [prev, setPrev] = useState<string>('')
  const [next, setNext] = useState<string>('')
  const [returnedBreedIds, setReturnedBreedIds] = useState<string[]>([])
  const [searchParameters, setSearchParameters] = useState<SearchParameters>({numberOfResults: 10, sortBy: 'asc', minAge: 0, maxAge: 30})
  const { numberOfResults, sortBy } = searchParameters
  const totalPages = Math.ceil(totalResults / numberOfResults)

  const handleLogout = () => {
    setSelectedDogs([])
    logoutUser(setIsLoggedIn)
  }

  const onNext = async () => {
    if (!next) return
    console.log("next", next);
    await fetchNext(next, setReturnedBreedIds, setPrev, setNext);
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const onPrev = async () => {
    if (!prev) return
    console.log('prev', prev)
    await fetchPrev(prev, setReturnedBreedIds, setPrev, setNext)
    setCurrentPage(currentPage - 1)
  }

  const updateSearchParameters = (newParams: Partial<SearchParameters>) => {
    setSearchParameters((prev) => ({
      ...prev,
      ...newParams
    }));
    setCurrentPage(1)
  };

  //function callbacks

  const fetchDogIdsCallback = useCallback(() => {
    fetchDogIds(setDogIds, setLoading, setTotalResults, setNext, numberOfResults, sortBy)
  }, [numberOfResults, sortBy])

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

  useEffect(() => {
    if (isLoggedIn) {
      fetchDogIdsCallback()
      setCurrentPage(1)
    }
  }, [isLoggedIn, fetchDogIdsCallback, numberOfResults, sortBy])

  useEffect(() => {
    fetchDogsCallback()
  }, [dogIds, fetchDogsCallback])

  useEffect(() => {
    checkAuth(setIsLoggedIn)
  }, [])

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
                />
                <div className="page-container">
                  <h2 className="browse-header">Select potential matches below</h2>
                  <Browse 
                    dogs={dogs} 
                    selectedDogs={selectedDogs} 
                    setSelectedDogs={setSelectedDogs}
                  />
                  <Pagination 
                    onNext={onNext}
                    onPrev={onPrev}
                    currentPage={currentPage}
                    totalPages={totalPages}
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
