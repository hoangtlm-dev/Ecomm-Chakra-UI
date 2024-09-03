import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

// Constants
import { MESSAGES } from '@app/constants'

const domNode = document.getElementById('root')

if (domNode) {
  createRoot(domNode).render(
    <StrictMode>
      <App />
    </StrictMode>
  )
} else {
  throw new Error(MESSAGES.DOM_NOT_FOUND)
}
