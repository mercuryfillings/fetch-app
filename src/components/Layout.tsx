import { FC } from "react";
import Logo from '../assets/FuzzBiz.png'
import FooterLogo from '../assets/FuzzBiz2.png'
import { LayoutProps, HeaderProps } from "../types";
import Banner from "./Banner"
import Badge from "./Badge"
import { useNavigate } from "react-router-dom"
import { FaArrowRight } from "react-icons/fa"




const Header: React.FC<HeaderProps> = ({ isLoggedIn, handleLogout, selectedDogs }) => {

  const navigate = useNavigate()

  return (
    <header className='header'>
      <div className='header-logo-container'>
        <button className="logo-button" onClick={() => navigate("/", { state: { selectedDogs } })}><img src={Logo} /></button>
      </div>
      <div className='nav-container'>
        <ul className='nav-list'>
            <li className='nav-list-item'><a className="nav-link" href="/about">About</a></li>
            <li className='nav-list-item'><a className="nav-link" href="https://github.com/mercuryfillings/fetch-app" target='_blank'>Repo</a></li>
            <li className='nav-list-item'><a className="nav-link" href="/contact">Contact</a></li>
            {selectedDogs.length > 0 && <li className='nav-list-item'><Badge count={selectedDogs.length} selectedDogs={selectedDogs}/></li>}
            {isLoggedIn && (
              <li className='nav-list-item'><button onClick={handleLogout} className="logout-button">Log Out <FaArrowRight /></button></li>
            )}
        </ul>
      </div>
    </header>
  )
}

const Footer = () => {
  return (
    <footer className='footer-container'>
        <div className='footer-logo-container'>
            <img src={FooterLogo} />
        </div>
        <div className='footer-text-container'>
            <p className='footer-text'>
                FuzzBiz is a coding exercise completed by candidate Scott Delbango 
                for interviewers at Fetch Rewards. It is intended to represent skill as a frontend engineer, 
                but does not represent any actual product or project undertaken by Fetch Rewards.
                </p>
        </div>
        <div className='footer-text-spacer'>© 2025</div>
    </footer>
  )
}


const Layout: FC<LayoutProps> = ({ children, isLoggedIn, handleLogout, selectedDogs }) => {
   
    return (
        <div className="site">
          <div className="site-wrapper">
            <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} selectedDogs={selectedDogs} />
            <Banner />
                <div >{children}</div>
            <Footer />
          </div>
        </div>
    )
  }
  
  export default Layout;