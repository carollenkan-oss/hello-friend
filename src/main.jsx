import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles.css'

// Netlify uses clean URLs (BrowserRouter + the redirect in netlify.toml).
// Set VITE_HASH_ROUTER=1 only for static previews that can't rewrite URLs.
const Router = import.meta.env.VITE_HASH_ROUTER ? HashRouter : BrowserRouter

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router><App /></Router>
  </React.StrictMode>,
)
