import React, { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'

const Finance = ({ onBack }) => {
  const [principal, setPrincipal] = useState(1000)
  const [monthly, setMonthly] = useState(200)
  const [rate, setRate] = useState(7)
  const [years, setYears] = useState(10)
  const [data, setData] = useState([])
  const [summary, setSummary] = useState({ total: 0, interest: 0, invested: 0 })

  useEffect(() => {
    calculateGrowth()
  }, [principal, monthly, rate, years])

  const calculateGrowth = () => {
    const newData = []
    let currentBalance = parseFloat(principal) || 0
    let totalInvested = parseFloat(principal) || 0
    const r = (parseFloat(rate) || 0) / 100 / 12
    const n = (parseFloat(years) || 0) * 12
    const pmt = parseFloat(monthly) || 0

    for (let month = 0; month <= n; month++) {
      if (month % 12 === 0) {
        newData.push({
          year: month / 12,
          balance: Math.round(currentBalance),
          invested: Math.round(totalInvested)
        })
      }
      // Compound Interest Formula for Monthly Contributions
      currentBalance = (currentBalance * (1 + r)) + pmt
      totalInvested += pmt
    }

    setData(newData)
    setSummary({
      total: Math.round(currentBalance - pmt), // Adjust for last loop addition
      interest: Math.round((currentBalance - pmt) - (totalInvested - pmt)),
      invested: Math.round(totalInvested - pmt)
    })
  }

  return (
    <div className="calculator-layout animate-fade-in" style={{maxWidth: '800px'}}>
      <div className="calc-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <span className="calc-title">Investment Growth</span>
        <div style={{width: 48}}></div>
      </div>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        
        {/* Input Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          <div className="input-group">
            <label className="input-label">Starting Amount ($)</label>
            <input 
              type="number" className="input-field" 
              value={principal} onChange={e => setPrincipal(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label className="input-label">Monthly Contribution ($)</label>
            <input 
              type="number" className="input-field" 
              value={monthly} onChange={e => setMonthly(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label className="input-label">Annual Return (%)</label>
            <input 
              type="number" className="input-field" 
              value={rate} onChange={e => setRate(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label className="input-label">Time Period (Years)</label>
            <input 
              type="number" className="input-field" 
              value={years} onChange={e => setYears(e.target.value)}
            />
          </div>
        </div>

        {/* Chart Area */}
        <div style={{ height: '300px', marginBottom: '2rem' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="year" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px' }}
                itemStyle={{ color: '#f8fafc' }}
              />
              <Area type="monotone" dataKey="balance" stroke="#10b981" fillOpacity={1} fill="url(#colorBalance)" name="Total Value" strokeWidth={3} />
              <Area type="monotone" dataKey="invested" stroke="#3b82f6" fillOpacity={1} fill="url(#colorInvested)" name="Invested" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Summary Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', textAlign: 'center' }}>
          <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '1rem', borderRadius: '1rem', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
            <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Total Invested</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#3b82f6' }}>${summary.invested.toLocaleString()}</div>
          </div>
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '1rem', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
            <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Total Value</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>${summary.total.toLocaleString()}</div>
          </div>
          <div style={{ background: 'rgba(236, 72, 153, 0.1)', padding: '1rem', borderRadius: '1rem', border: '1px solid rgba(236, 72, 153, 0.2)' }}>
            <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Interest Earned</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#ec4899' }}>${summary.interest.toLocaleString()}</div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Finance
