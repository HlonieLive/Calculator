import React from 'react'

const Menu = ({ onSelect }) => {
  const options = [
    { id: 'arithmetic', title: 'Arithmetic', icon: '🧮', desc: 'Standard & Scientific Operations' },
    { id: 'converter', title: 'Converter', icon: '🔄', desc: 'Length, Mass, Temp, & More' },
    { id: 'bmi', title: 'BMI Calculator', icon: '⚖️', desc: 'Body Mass Index & Analysis' },
    { id: 'physics', title: 'Physics', icon: '⚛️', desc: 'Velocity, Force, Displacement' },
    { id: 'finance', title: 'Finance', icon: '📈', desc: 'Investment Growth & Interest' },
    { id: 'math', title: 'Mathematics', icon: '📐', desc: 'Algebra, Graphing & Theorms' },
  ]

  return (
    <div className="menu-container animate-fade-in">
      <header className="app-header">
        <h1 className="app-title">Omni<span className="text-gradient">Calc</span></h1>
        <p className="app-subtitle">Select a tool to get started</p>
      </header>
      
      <div className="grid-menu">
        {options.map(opt => (
          <button 
            key={opt.id} 
            className="menu-card glass-panel"
            onClick={() => onSelect(opt.id)}
          >
            <div className="icon">{opt.icon}</div>
            <h3>{opt.title}</h3>
            <p>{opt.desc}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

export default Menu
