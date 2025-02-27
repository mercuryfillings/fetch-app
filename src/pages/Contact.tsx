import React from 'react'
import Layout from '../components/Layout'

export default function Contact() {
  return (
    <Layout isLoggedIn={false} handleLogout={() => false}>
      <div>Contact</div>
    </Layout>
  )
}