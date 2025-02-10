import { ReactNode, FC, Image } from "react";
import Logo from '../assets/FuzzBiz.png'

interface MyComponentProps {
    children: ReactNode;
}

const Header = () => {
  return (
    <header className='header'>
      <div className='logo'>
        <img src={Logo} />
      </div>
      <div className='nav-elements'>
        <div className='nav-element'>Link</div>
        <div className='nav-element'>Link</div>
        <div className='nav-element'>Link</div>
      </div>
    </header>
  )
}

const Footer = () => {
  return (
    <div className='footer'>Footer</div>
  )
}


const Layout: FC<MyComponentProps> = ({ children }) => {
   
    return (
        <>
        <Header />
        <div id="swup" className="swup-transition-fade">{children}</div>;
        <Footer />
        </>
    )
  }
  
  export default Layout;