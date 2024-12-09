import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Login } from './auth/Login'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes'
import './styles.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <AppRoutes />
    </StrictMode>
  </BrowserRouter>,
)
