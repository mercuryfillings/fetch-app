import Layout from '../components/Layout'

export default function Contact() {

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