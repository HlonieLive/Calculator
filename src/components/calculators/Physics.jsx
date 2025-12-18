import React, { useState } from 'react'

const Physics = ({ onBack }) => {
  const [formula, setFormula] = useState('velocity')
  const [inputs, setInputs] = useState({})
  const [result, setResult] = useState(null)

  const formulas = {
    velocity: {
      name: 'Velocity',
      eqn: 'v = d / t',
      fields: [
        { name: 'd', label: 'Distance (m)' },
        { name: 't', label: 'Time (s)' }
      ],
      calc: (vals) => vals.d / vals.t,
      unit: 'm/s'
    },
    displacement: {
      name: 'Displacement',
      eqn: 'd = v × t',
      fields: [
        { name: 'v', label: 'Velocity (m/s)' },
        { name: 't', label: 'Time (s)' }
      ],
      calc: (vals) => vals.v * vals.t,
      unit: 'm'
    },
    force: {
      name: 'Force',
      eqn: 'F = m × a',
      fields: [
        { name: 'm', label: 'Mass (kg)' },
        { name: 'a', label: 'Acceleration (m/s²)' }
      ],
      calc: (vals) => vals.m * vals.a,
      unit: 'N'
    },
    kinetic: {
      name: 'Kinetic Energy',
      eqn: 'KE = 0.5 × m × v²',
      fields: [
        { name: 'm', label: 'Mass (kg)' },
        { name: 'v', label: 'Velocity (m/s)' }
      ],
      calc: (vals) => 0.5 * vals.m * vals.v * vals.v,
      unit: 'J'
    }
  }

  const handleCalculate = () => {
    const current = formulas[formula]
    const values = {}
    let valid = true
    
    current.fields.forEach(field => {
      const val = parseFloat(inputs[field.name])
      if (isNaN(val)) valid = false
      values[field.name] = val
    })

    if (valid) {
      setResult({
        value: current.calc(values),
        unit: current.unit
      })
    } else {
      setResult(null)
    }
  }

  const handleInputChange = (field, value) => {
    setInputs(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="calculator-layout animate-fade-in">
      <div className="calc-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <span className="calc-title">Physics</span>
        <div style={{width: 48}}></div>
      </div>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        
        <div className="input-group">
          <label className="input-label">Select Formula</label>
          <select 
            className="select-field"
            value={formula}
            onChange={(e) => {
              setFormula(e.target.value)
              setInputs({})
              setResult(null)
            }}
          >
            {Object.entries(formulas).map(([key, data]) => (
              <option key={key} value={key}>{data.name}</option>
            ))}
          </select>
        </div>

        <div style={{ 
          background: 'rgba(255,255,255,0.05)', 
          padding: '1rem', 
          borderRadius: '0.5rem', 
          marginBottom: '2rem',
          textAlign: 'center',
          fontFamily: 'monospace',
          fontSize: '1.2rem',
          color: 'var(--color-secondary)'
        }}>
          {formulas[formula].eqn}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
          {formulas[formula].fields.map(field => (
            <div className="input-group" key={field.name} style={{ marginBottom: 0 }}>
              <label className="input-label">{field.label}</label>
              <input 
                type="number" 
                className="input-field"
                value={inputs[field.name] || ''}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                placeholder="0"
              />
            </div>
          ))}
        </div>

        <button className="action-btn" onClick={handleCalculate}>Calculate</button>

        {result && (
          <div className="result-box">
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>Result</p>
            <div className="result-value">
              {parseFloat(result.value.toFixed(4))} <span style={{fontSize: '1.5rem'}}>{result.unit}</span>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default Physics
