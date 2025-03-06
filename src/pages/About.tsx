import Layout from '../components/Layout'
import { useLocation } from 'react-router'

export default function About() {

    const location = useLocation()
  
    const { selectedDogs } = location.state || {};

  return (
    <Layout selectedDogs={[]} isLoggedIn={false} handleLogout={() => false}>
      <div className="content-page">
        <h2 className="about-headline">Scott Delbango is a software engineer who lives in Brooklyn, NY.</h2>
        <p>Focused on frontend UI engineering</p>
        <p>Skilled in JavaScript, TypeScript, HTML, and CSS.</p>
        <p>Experienced in frontend technologies including React, Vue, and Web Components.</p>
        <p>Has an extensive background as a creative technologist and digital marketer.</p>
        <p>Specializes in cross-functional work, particularly with marketers, designers, and design systems teams.</p>
      </div>
    </Layout>
  )
}