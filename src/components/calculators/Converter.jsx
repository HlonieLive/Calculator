import React, { useState, useEffect } from 'react'

const Converter = ({ onBack }) => {
  const [category, setCategory] = useState('length')
  const [fromUnit, setFromUnit] = useState('')
  const [toUnit, setToUnit] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [result, setResult] = useState(0)

  const categories = {
    length: { units: ['meter', 'kilometer', 'centimeter', 'millimeter', 'inch', 'foot', 'yard', 'mile'] },
    mass: { units: ['kilogram', 'gram', 'milligram', 'pound', 'ounce'] },
    temperature: { units: ['celsius', 'fahrenheit', 'kelvin'] },
    degrees: { units: ['degree', 'radian', 'gradian'] },
    currency: { units: ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'ZAR'] }
  }

  // Initialize units when category changes
  useEffect(() => {
    setFromUnit(categories[category].units[0])
    setToUnit(categories[category].units[1] || categories[category].units[0])
  }, [category])

  useEffect(() => {
    calculate()
  }, [inputValue, fromUnit, toUnit, category])

  const calculate = () => {
    if (!inputValue) {
      setResult(0)
      return
    }
    const val = parseFloat(inputValue)
    let res = 0

    if (category === 'length') {
      const inMeters = convertToMeters(val, fromUnit)
      res = convertFromMeters(inMeters, toUnit)
    } else if (category === 'mass') {
      const inGrams = convertToGrams(val, fromUnit)
      res = convertFromGrams(inGrams, toUnit)
    } else if (category === 'temperature') {
      res = convertTemp(val, fromUnit, toUnit)
    } else if (category === 'degrees') {
      res = convertAngles(val, fromUnit, toUnit)
    } else if (category === 'currency') {
      res = convertCurrency(val, fromUnit, toUnit)
    }
    setResult(res)
  }

  // Conversion Helpers
  const convertToMeters = (val, unit) => {
    const table = { meter: 1, kilometer: 1000, centimeter: 0.01, millimeter: 0.001, inch: 0.0254, foot: 0.3048, yard: 0.9144, mile: 1609.34 }
    return val * table[unit]
  }
  const convertFromMeters = (val, unit) => {
    const table = { meter: 1, kilometer: 1000, centimeter: 0.01, millimeter: 0.001, inch: 0.0254, foot: 0.3048, yard: 0.9144, mile: 1609.34 }
    return val / table[unit]
  }

  const convertToGrams = (val, unit) => {
    const table = { kilogram: 1000, gram: 1, milligram: 0.001, pound: 453.592, ounce: 28.3495 }
    return val * table[unit]
  }
  const convertFromGrams = (val, unit) => {
    const table = { kilogram: 1000, gram: 1, milligram: 0.001, pound: 453.592, ounce: 28.3495 }
    return val / table[unit]
  }

  const convertTemp = (val, from, to) => {
    let celsius = val
    if (from === 'fahrenheit') celsius = (val - 32) * 5/9
    if (from === 'kelvin') celsius = val - 273.15
    
    if (to === 'celsius') return celsius
    if (to === 'fahrenheit') return (celsius * 9/5) + 32
    if (to === 'kelvin') return celsius + 273.15
    return celsius
  }

  const convertAngles = (val, from, to) => {
    let deg = val
    if (from === 'radian') deg = val * (180/Math.PI)
    if (from === 'gradian') deg = val * 0.9
    
    if (to === 'degree') return deg
    if (to === 'radian') return deg * (Math.PI/180)
    if (to === 'gradian') return deg / 0.9
    return deg
  }

  const convertCurrency = (val, from, to) => {
    // Approximate rates relative to USD (Base: 1 USD)
    // As of Dec 2024 (Estimation)
    const rates = {
      USD: 1,
      EUR: 0.91,
      GBP: 0.76,
      JPY: 142.5,
      CAD: 1.35,
      AUD: 1.50,
      ZAR: 18.50
    }
    const inUSD = val / rates[from]
    return inUSD * rates[to]
  }

  return (
    <div className="calculator-layout animate-fade-in">
      <div className="calc-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <span className="calc-title">Converter</span>
        <div style={{width: 48}}></div>
      </div>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        
        {/* Category Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {Object.keys(categories).map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '2rem',
                background: category === cat ? 'var(--color-primary)' : 'rgba(255,255,255,0.1)',
                textTransform: 'capitalize',
                fontSize: '0.9rem'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="input-group">
          <label className="input-label">From</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <input 
              type="number" 
              className="input-field" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="0"
            />
            <select 
              className="select-field"
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
            >
              {categories[category].units.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem 0', color: 'var(--color-text-muted)' }}>
          ↓
        </div>

        <div className="input-group">
          <label className="input-label">To</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="input-field" style={{ background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center' }}>
              {result.toFixed(4)}
            </div>
            <select 
              className="select-field"
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
            >
              {categories[category].units.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
        </div>

        <div className="result-box">
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>Result</p>
          <div className="result-value">
            {parseFloat(result.toFixed(6))} <span style={{fontSize: '1rem'}}>{toUnit}</span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Converter
