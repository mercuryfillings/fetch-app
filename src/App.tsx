import Login from './components/Login'
import './styles/styles.css'
import Swup from 'swup'

function App() {

  const swup = new Swup()

  return (
    <div className='app'>
     <Login />
    </div>
  )
}

export default App
