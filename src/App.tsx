import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Approuter from './router/Approuter'
import {Aprovider} from './pages/Auth/Acontext'
import {ContextProvider} from './context/Context'
function App() {
 
  return (
    <>
	<ContextProvider>
	<Aprovider>
	<Approuter />
	</Aprovider>
	</ContextProvider>
    </>
  )
}

export default App
