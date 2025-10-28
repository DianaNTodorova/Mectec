import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/global.css';
import './assets/styles/home.css';
import './assets/styles/products.css';
import './assets/styles/productdetails.css';


import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
