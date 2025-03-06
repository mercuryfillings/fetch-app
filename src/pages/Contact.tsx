import React from 'react'
import Layout from '../components/Layout'
import { useLocation } from 'react-router'

export default function Contact() {

  const location = useLocation()

  const { selectedDogs } = location.state || {};

  return (
    <Layout selectedDogs={[]} isLoggedIn={false} handleLogout={() => false}>
      <div>Contact</div>
    </Layout>
  )
}