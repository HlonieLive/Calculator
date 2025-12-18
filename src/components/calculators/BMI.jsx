import React, { useState } from 'react'

const BMI = ({ onBack }) => {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [result, setResult] = useState(null)

  const calculateBMI = () => {
    if (weight && height) {
      const hM = height / 100 // convert cm to m
      const bmi = weight / (hM * hM)
      
      let category = ''
      let color = ''
      
      if (bmi < 18.5) { category = 'Underweight'; color = '#3b82f6'; }
      else if (bmi < 25) { category = 'Normal'; color = '#10b981'; }
      else if (bmi < 30) { category = 'Overweight'; color = '#f59e0b'; }
      else { category = 'Obese'; color = '#ef4444'; }
      
      setResult({ value: bmi.toFixed(1), category, color })
    }
  }

  return (
    <div className="calculator-layout animate-fade-in">
      <div className="calc-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <span className="calc-title">BMI Calculator</span>
        <div style={{width: 48}}></div>
      </div>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        <div className="input-group">
          <label className="input-label">Weight (kg)</label>
          <input 
            type="number" 
            className="input-field" 
            placeholder="e.g. 70"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        
        <div className="input-group">
          <label className="input-label">Height (cm)</label>
          <input 
            type="number" 
            className="input-field" 
            placeholder="e.g. 175"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>

        <button className="action-btn" onClick={calculateBMI}>Calculate BMI</button>

        {result && (
          <div className="result-box" style={{ borderColor: result.color }}>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>Your BMI</p>
            <div className="result-value" style={{ color: result.color }}>{result.value}</div>
            <div style={{ marginTop: '0.5rem', fontSize: '1.2rem', color: result.color, fontWeight: '500' }}>
              {result.category}
            </div>
            
            <div style={{ marginTop: '1.5rem', height: '8px', background: '#334155', borderRadius: '4px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ 
                position: 'absolute', 
                left: `${Math.min(Math.max((result.value / 40) * 100, 0), 100)}%`, 
                top: 0, bottom: 0, width: '4px', background: 'white',
                transform: 'translateX(-50%)',
                boxShadow: '0 0 10px white'
              }}></div>
              <div style={{ display: 'flex', height: '100%', width: '100%' }}>
                <div style={{ flex: '18.5', background: '#3b82f6', opacity: 0.5 }}></div>
                <div style={{ flex: '6.5', background: '#10b981', opacity: 0.5 }}></div>
                <div style={{ flex: '5', background: '#f59e0b', opacity: 0.5 }}></div>
                <div style={{ flex: '10', background: '#ef4444', opacity: 0.5 }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BMI
