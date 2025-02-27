import React from 'react'
import { useState, useCallback, useEffect } from 'react'
import Layout from '../components/Layout'
import { Dog } from '../types'
import { useLocation } from 'react-router'
import { fetchDogs } from '../helpers'
import Browse from '../components/Browse'

const Match = () => {

    const location = useLocation();
    const { selectedDogs } = location.state || {};
    const [dogs, setDogs] = useState<Dog[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    

    const fetchDogsCallback = useCallback(() => {
      if (selectedDogs.length > 0) {
        fetchDogs(selectedDogs, setDogs, setLoading)
      }
    }, [selectedDogs, setDogs, setLoading])

    useEffect(() => {
      fetchDogsCallback()
    }, [fetchDogsCallback])

  return (
    <Layout isLoggedIn={true} handleLogout={() => console.log('test')} selectedDogs={selectedDogs}>
      <Browse dogs={dogs} selectedDogs={selectedDogs} setSelectedDogs={() => console.log('test')}/>
    </Layout>
  )
}

export default Match