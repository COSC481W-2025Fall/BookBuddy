import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Myroute from "./Myroute"


const root = createRoot(document.getElementById('root')!)
root.render(
  <StrictMode>
    <Myroute />   {/* 👈 must be capitalized */}
  </StrictMode>
)