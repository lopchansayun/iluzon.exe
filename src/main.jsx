import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import App from './App.jsx'
import { typography } from './config'

document.documentElement.style.setProperty('--font-display', typography.fontDisplay)
document.documentElement.style.setProperty('--font-body', typography.fontBody)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
