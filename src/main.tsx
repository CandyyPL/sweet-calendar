import React from 'react'
import ReactDOM from 'react-dom/client'
import GlobalStyle from '@/assets/GlobalStyle'
import App from '@/pages/App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
)
