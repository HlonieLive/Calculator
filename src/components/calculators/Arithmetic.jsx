import React, { useState } from 'react'

const Arithmetic = ({ onBack }) => {
  const [display, setDisplay] = useState('0')
  const [expression, setExpression] = useState('')

  const handleNum = (num) => {
    if (display === '0') setDisplay(num)
    else setDisplay(display + num)
  }

  const handleOp = (op) => {
    setExpression(display + ' ' + op + ' ')
    setDisplay('0')
  }

  const handleClear = () => {
    setDisplay('0')
    setExpression('')
  }

  const handleCalculate = () => {
    try {
      const fullExpr = expression + display
      // Note: Using eval is generally unsafe, but acceptable for this controlled local calc
      // Replacing visual operators with JS operators
      const sanitized = fullExpr.replace(/×/g, '*').replace(/÷/g, '/')
      // eslint-disable-next-line no-new-func
      const result = new Function('return ' + sanitized)()
      setDisplay(String(result))
      setExpression('')
    } catch (e) {
      setDisplay('Error')
    }
  }

  const btnClass = "h-16 rounded-xl hover:bg-white/10 active:bg-white/20 transition-colors text-xl font-bold font-display border border-white/5"
  const opClass = "h-16 rounded-xl bg-violet-600 hover:bg-violet-500 active:bg-violet-700 transition-colors text-xl font-bold font-display"

  // We'll use inline styles for the grid since we are using vanilla CSS mostly in App.css
  // But here I'll add specific classes or inline styles for the grid layout
  
  return (
    <div className="calculator-layout animate-fade-in">
      <div className="calc-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <span className="calc-title">Arithmetic</span>
        <div style={{width: 48}}></div>
      </div>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        <div className="display-area" style={{ 
          background: 'rgba(0,0,0,0.3)', 
          padding: '1.5rem', 
          borderRadius: '1rem', 
          marginBottom: '1.5rem',
          textAlign: 'right',
          minHeight: '100px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end'
        }}>
          <div style={{ color: '#94a3b8', fontSize: '1rem', height: '1.5rem' }}>{expression}</div>
          <div style={{ fontSize: '3rem', fontWeight: '600' }}>{display}</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
          <button className={btnClass} onClick={handleClear} style={{ color: '#ec4899' }}>AC</button>
          <button className={btnClass} onClick={() => setDisplay(display.slice(0, -1) || '0')}>DEL</button>
          <button className={btnClass} onClick={() => handleOp('%')}>%</button>
          <button className={opClass} onClick={() => handleOp('÷')} style={{ background: '#8b5cf6' }}>÷</button>

          <button className={btnClass} onClick={() => handleNum('7')}>7</button>
          <button className={btnClass} onClick={() => handleNum('8')}>8</button>
          <button className={btnClass} onClick={() => handleNum('9')}>9</button>
          <button className={opClass} onClick={() => handleOp('×')} style={{ background: '#8b5cf6' }}>×</button>

          <button className={btnClass} onClick={() => handleNum('4')}>4</button>
          <button className={btnClass} onClick={() => handleNum('5')}>5</button>
          <button className={btnClass} onClick={() => handleNum('6')}>6</button>
          <button className={opClass} onClick={() => handleOp('-')} style={{ background: '#8b5cf6' }}>-</button>

          <button className={btnClass} onClick={() => handleNum('1')}>1</button>
          <button className={btnClass} onClick={() => handleNum('2')}>2</button>
          <button className={btnClass} onClick={() => handleNum('3')}>3</button>
          <button className={opClass} onClick={() => handleOp('+')} style={{ background: '#8b5cf6' }}>+</button>

          <button className={btnClass} onClick={() => handleNum('00')}>00</button>
          <button className={btnClass} onClick={() => handleNum('0')}>0</button>
          <button className={btnClass} onClick={() => handleNum('.')}>.</button>
          <button className={opClass} onClick={handleCalculate} style={{ background: 'linear-gradient(135deg, #8b5cf6, #ec4899)' }}>=</button>
        </div>
      </div>
    </div>
  )
}

export default Arithmetic
