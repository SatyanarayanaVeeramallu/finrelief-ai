import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles/variables.css'
import './styles/index.css'
import './styles/layout.css'
import './styles/cards.css'
import './styles/forms.css'
import './styles/table.css'
import './styles/letter.css'
import './styles/dashboard.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
