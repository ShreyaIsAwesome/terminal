import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '/index.css'
import Terminal from './components/Terminal.jsx'

createRoot(document.getElementById('terminal')).render(
  <StrictMode>
    <Terminal />
  </StrictMode>
)
