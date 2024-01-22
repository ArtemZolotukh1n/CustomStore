import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { enableMapSet, setAutoFreeze } from 'immer'
import { createStore } from './store/index.ts'
import { StoreProvider } from './store/adapter.tsx'

enableMapSet() // enable sets to be mutable
setAutoFreeze(false) // optimize shit

const store = createStore()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  </React.StrictMode>
)
