import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Search from "./Search";

const root = createRoot(document.getElementById('root')!)
root.render(
    <StrictMode>
        <Search/>
    </StrictMode>
)
