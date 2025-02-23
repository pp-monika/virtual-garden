import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PopUpHerb from './popUpHerb.jsx'

createRoot(document.getElementById('popup')).render(
  <StrictMode>
    <PopUpHerb />
  </StrictMode>,
)
