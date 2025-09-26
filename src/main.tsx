
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import ReactProvider from './context-api/React-Context-Provider.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ReactProvider>
      <App />
    </ReactProvider>
  </BrowserRouter>,
)
