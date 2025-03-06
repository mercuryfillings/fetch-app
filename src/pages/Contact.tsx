import Layout from '../components/Layout'
import { useLocation } from 'react-router'

export default function Contact() {

  const location = useLocation()

  const { selectedDogs } = location.state || {};

  return (
    <Layout selectedDogs={[]} isLoggedIn={false} handleLogout={() => false}>
      <div className="content-page">
        <h2 className="about-headline">Get in Touch</h2>
        <p>scott.delbango@gmail.com</p>
        <p><a className="nav-link" href="https://www.linkedin.com/in/scottraphaeldelbango" target="_blank">LinkedIn</a></p>
      </div>
    </Layout>
  )
}