import { useState } from 'react'
import './App.css'
import Menu from './components/Menu'
import Arithmetic from './components/calculators/Arithmetic'
import Converter from './components/calculators/Converter'
import BMI from './components/calculators/BMI'
import Physics from './components/calculators/Physics'
import Finance from './components/calculators/Finance'

function App() {
  const [view, setView] = useState('menu')

  const renderView = () => {
    switch(view) {
      case 'arithmetic': return <Arithmetic onBack={() => setView('menu')} />
      case 'converter': return <Converter onBack={() => setView('menu')} />
      case 'bmi': return <BMI onBack={() => setView('menu')} />
      case 'physics': return <Physics onBack={() => setView('menu')} />
      case 'finance': return <Finance onBack={() => setView('menu')} />
      default: return <Menu onSelect={setView} />
    }
  }

  return (
    <>
      {renderView()}
    </>
  )
}

export default App
