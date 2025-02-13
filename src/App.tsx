import Login from './components/Login'
import Search from './components/Search'
import { useState } from 'react'
import './styles/styles.css'

function App() {

  const [login, setLogin] = useState(false)

  const userLogin = () => {
    setLogin(true)
  }

  return (

    <main className="app">
      {!login && <Login userLogin={userLogin}/>}
      {login && <Search />}
      <button className='test-button' onClick={userLogin}>Test</button>
    </main>
  )
}

export default App
