import { FC } from "react";
import Logo from '../assets/FuzzBiz.png'
import FooterLogo from '../assets/FuzzBiz2.png'
import { LayoutProps } from "../types";


const Header = () => {

  return (
    <header className='header'>
      <div className='header-logo-container'>
        <img src={Logo} />
      </div>
      <div className='nav-container'>
        <ul className='nav-list'>
            <li className='nav-list-item'><a className="nav-link" href="/about">About</a></li>
            <li className='nav-list-item'><a className="nav-link" href="https://github.com/mercuryfillings/fetch-app" target='_blank'>Repo</a></li>
            <li className='nav-list-item'><a className="nav-link" href="/contact">Contact</a></li>
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


const Layout: FC<LayoutProps> = ({ children }) => {
   
    return (
        <>
            <Header />
                <div >{children}</div>
            <Footer />
        </>
    )
  }
  
  export default Layout;