import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css' // Updated to point to our reset css
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
