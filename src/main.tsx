// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/reset.css'
import App from './App.tsx'
import About from './pages/About.tsx'
import Contact from './pages/Contact.tsx'
import Match from './pages/Match.tsx'
import { BrowserRouter, Routes, Route } from "react-router";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/match" element={<Match />} />
          <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>,
)
