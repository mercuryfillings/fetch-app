import { useState, useCallback, useEffect } from 'react'
import Layout from '../components/Layout'
import { Dog } from '../types'
import { useLocation } from 'react-router'
import { fetchDogs, fetchMatches } from '../helpers'
import Browse from '../components/Browse'

const MatchPage = () => {

    //location variables

    const location = useLocation()
    const { isLoggedIn } = location.state || {}
    
    
    //state
    const [selectedDogs, setSelectedDogs] = useState<string[]>(location.state?.selectedDogs || [])
    const [dogs, setDogs] = useState<Dog[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [match, setMatch] = useState<string>('')
    const [disabled, setDisabled] = useState<boolean>(false)
    const buttonCopy = {
      find: "Find your match",
      found: "Match Found!"
    }
    const headerCopy = {
      find: `You have ${selectedDogs.length} potential matches. Edit your matches, or click Find Your Match when ready`,
      found: 'Congratulations!'
    }

    const handleClick = async () => {
      fetchMatches(selectedDogs, setMatch)
      setDisabled(true)
    }
    

    const fetchDogsCallback = useCallback(() => {
      if (selectedDogs.length > 0) {
        fetchDogs(selectedDogs, setDogs, setLoading)
      }
    }, [selectedDogs, setDogs, setLoading])

    useEffect(() => {
      fetchDogsCallback()
    }, [fetchDogsCallback, selectedDogs])

    console.log(loading)

  return (
    <Layout isLoggedIn={isLoggedIn} handleLogout={() => console.log('test')} selectedDogs={selectedDogs}>
      <div className="match-container">
        <div className="match-gutter">
          <button disabled={disabled} className="login-button" onClick={handleClick}>{match ? buttonCopy.found : buttonCopy.find}</button>
        </div>
        <div className="match-content-container">
          <h2 className="browse-header">{match ? headerCopy.found : headerCopy.find}</h2>
          {selectedDogs.length < 1 && <p className="match-copy-container">No matches found</p>}
          {selectedDogs.length > 0 && <Browse dogs={dogs} selectedDogs={selectedDogs} match={match} setSelectedDogs={setSelectedDogs} x={true}/>}
        </div>
      </div>
    </Layout>
  )
}

export default MatchPage