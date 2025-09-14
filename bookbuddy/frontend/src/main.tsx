import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import Search from "./Search";

const root = createRoot(document.getElementById('root')!)
root.render(
  <StrictMode>
    <App />
      <Search/>
  </StrictMode>
)
