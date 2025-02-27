import React from 'react'
import Layout from '../components/Layout'

export default function About() {
  return (
    <Layout isLoggedIn={false} handleLogout={() => false}>
      <div>About</div>
    </Layout>
  )
}