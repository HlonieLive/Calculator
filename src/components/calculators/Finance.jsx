import React, { useState, useEffect } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts'

const Finance = ({ onBack }) => {
  const [mode, setMode] = useState('investment') // 'investment', 'loan', 'salary'
  const [currency, setCurrency] = useState('$')
  
  // Currencies
  const currencies = [
    { code: 'USD', symbol: '$' },
    { code: 'EUR', symbol: '€' },
    { code: 'GBP', symbol: '£' },
    { code: 'JPY', symbol: '¥' },
    { code: 'CAD', symbol: 'C$' },
    { code: 'ZAR', symbol: 'R' }
  ]

  return (
    <div className="calculator-layout animate-fade-in" style={{maxWidth: '800px'}}>
      <div className="calc-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <span className="calc-title">Finance Hub</span>
        <div style={{width: 48}}></div>
      </div>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        
        {/* Top Controls: Currency & Mode */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
           <select 
              className="select-field"
              style={{ width: 'auto' }}
              value={currency}
              onChange={e => setCurrency(e.target.value)}
            >
              {currencies.map(c => <option key={c.code} value={c.symbol}>{c.code} ({c.symbol})</option>)}
            </select>

            <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(0,0,0,0.2)', padding: '0.25rem', borderRadius: '0.5rem', flex: 1 }}>
              <ModeBtn label="Investment" active={mode === 'investment'} onClick={() => setMode('investment')} />
              <ModeBtn label="Loan / Mortgage" active={mode === 'loan'} onClick={() => setMode('loan')} />
              <ModeBtn label="Salary" active={mode === 'salary'} onClick={() => setMode('salary')} />
            </div>
        </div>

        {mode === 'investment' && <InvestmentCalc currency={currency} />}
        {mode === 'loan' && <LoanCalc currency={currency} />}
        {mode === 'salary' && <SalaryCalc currency={currency} />}

      </div>
    </div>
  )
}

const ModeBtn = ({ label, active, onClick }) => (
  <button 
    onClick={onClick}
    style={{
      flex: 1,
      padding: '0.5rem',
      borderRadius: '0.3rem',
      background: active ? 'var(--color-primary)' : 'transparent',
      color: active ? 'white' : 'var(--color-text-muted)',
      fontWeight: '500',
      transition: 'all 0.2s'
    }}
  >
    {label}
  </button>
)

// --- Sub-Components ---

const InvestmentCalc = ({ currency }) => {
  const [principal, setPrincipal] = useState(1000)
  const [monthly, setMonthly] = useState(200)
  const [rate, setRate] = useState(7)
  const [years, setYears] = useState(10)
  const [data, setData] = useState([])
  const [summary, setSummary] = useState({ total: 0, interest: 0, invested: 0 })

  useEffect(() => {
    let currentBalance = parseFloat(principal) || 0
    let totalInvested = parseFloat(principal) || 0
    const r = (parseFloat(rate) || 0) / 100 / 12
    const n = (parseFloat(years) || 0) * 12
    const pmt = parseFloat(monthly) || 0
    const newData = []

    for (let month = 0; month <= n; month++) {
      if (month % 12 === 0) {
        newData.push({
          year: month / 12,
          balance: Math.round(currentBalance),
          invested: Math.round(totalInvested)
        })
      }
      currentBalance = (currentBalance * (1 + r)) + pmt
      totalInvested += pmt
    }

    setData(newData)
    setSummary({
      total: Math.round(currentBalance - pmt),
      interest: Math.round((currentBalance - pmt) - (totalInvested - pmt)),
      invested: Math.round(totalInvested - pmt)
    })
  }, [principal, monthly, rate, years])

  return (
    <div className="animate-fade-in">
      <div className="input-grid">
        <Input label={`Starting Amount (${currency})`} value={principal} set={setPrincipal} />
        <Input label={`Monthly Contribution (${currency})`} value={monthly} set={setMonthly} />
        <Input label="Annual Return (%)" value={rate} set={setRate} />
        <Input label="Time Period (Years)" value={years} set={setYears} />
      </div>

      <div style={{ height: '250px', marginBottom: '2rem' }}>
        <ResponsiveContainer>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorBal" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/><stop offset="95%" stopColor="#10b981" stopOpacity={0}/></linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="year" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }} />
            <Area type="monotone" dataKey="balance" stroke="#10b981" fill="url(#colorBal)" name="Total Value" />
            <Area type="monotone" dataKey="invested" stroke="#3b82f6" fill="transparent" name="Invested" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="summary-grid">
        <Card label="Total Invested" value={summary.invested} currency={currency} color="#3b82f6" />
        <Card label="Total Value" value={summary.total} currency={currency} color="#10b981" />
        <Card label="Interest Earned" value={summary.interest} currency={currency} color="#ec4899" />
      </div>
    </div>
  )
}

const LoanCalc = ({ currency }) => {
  const [amount, setAmount] = useState(200000)
  const [rate, setRate] = useState(5.5)
  const [years, setYears] = useState(30)
  const [summary, setSummary] = useState({ monthlyInfo: 0, totalPay: 0, totalInt: 0 })
  const [data, setData] = useState([])

  useEffect(() => {
    const p = parseFloat(amount) || 0
    const r = (parseFloat(rate) || 0) / 100 / 12
    const n = (parseFloat(years) || 0) * 12
    
    // Monthly Payment Formula: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]
    let m = 0
    if (r > 0) {
      m = p * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    } else {
      m = p / n // No interest case
    }

    setSummary({
      monthlyInfo: Math.round(m),
      totalPay: Math.round(m * n),
      totalInt: Math.round((m * n) - p)
    })

    // Generate chart data (Balance over time)
    const newData = []
    let balance = p
    for(let i=0; i<=n; i+=12) { // Yearly points
      newData.push({ year: i/12, balance: Math.round(balance) })
      // Simulate year passing
      for(let j=0; j<12; j++){
         if(balance > 0) {
            const interest = balance * r
            const principalPay = m - interest
            balance -= principalPay
         }
      }
    }
    setData(newData)

  }, [amount, rate, years])

  return (
    <div className="animate-fade-in">
       <div className="input-grid">
        <Input label={`Loan Amount (${currency})`} value={amount} set={setAmount} />
        <Input label="Interest Rate (%)" value={rate} set={setRate} />
        <Input label="Loan Term (Years)" value={years} set={setYears} />
      </div>

      <div style={{ height: '250px', marginBottom: '2rem' }}>
        <ResponsiveContainer>
          <AreaChart data={data}>
            <linearGradient id="colorLoan" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/><stop offset="95%" stopColor="#ef4444" stopOpacity={0}/></linearGradient>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="year" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }} />
            <Area type="monotone" dataKey="balance" stroke="#ef4444" fill="url(#colorLoan)" name="Remaining Balance" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="summary-grid">
        <Card label="Monthly Payment" value={summary.monthlyInfo} currency={currency} color="#3b82f6" />
        <Card label="Total Interest" value={summary.totalInt} currency={currency} color="#ef4444" />
        <Card label="Total Cost" value={summary.totalPay} currency={currency} color="#f59e0b" />
      </div>
    </div>
  )
}

const SalaryCalc = ({ currency }) => {
  const [hourly, setHourly] = useState(25)
  const [hours, setHours] = useState(40)
  const [weeks, setWeeks] = useState(52)
  
  const annual = hourly * hours * weeks
  const monthly = annual / 12
  const weekly = annual / 52
  const daily = weekly / 5 // Assuming 5 day work week

  const data = [
    { name: 'Day', amount: daily },
    { name: 'Week', amount: weekly },
    { name: 'Month', amount: monthly },
    { name: 'Year', amount: annual },
  ]

  return (
    <div className="animate-fade-in">
      <div className="input-grid">
        <Input label={`Hourly Rate (${currency})`} value={hourly} set={setHourly} />
        <Input label="Hours per Week" value={hours} set={setHours} />
        <Input label="Weeks per Year" value={weeks} set={setWeeks} />
      </div>

      <div style={{ height: '250px', marginBottom: '2rem' }}>
        <ResponsiveContainer>
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis type="number" stroke="#94a3b8" hide />
            <YAxis dataKey="name" type="category" stroke="#94a3b8" width={60} />
            <Tooltip 
               cursor={{fill: 'rgba(255,255,255,0.05)'}}
               contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }} 
               formatter={(value) => `${currency}${Math.round(value).toLocaleString()}`}
            />
            <Bar dataKey="amount" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
         
      <div className="summary-grid">
        <Card label="Weekly" value={Math.round(weekly)} currency={currency} color="#8b5cf6" />
        <Card label="Monthly" value={Math.round(monthly)} currency={currency} color="#8b5cf6" />
        <Card label="Annual" value={Math.round(annual)} currency={currency} color="#10b981" />
      </div>
    </div>
  )
}

// --- Helpers ---

const Input = ({ label, value, set }) => (
  <div className="input-group" style={{marginBottom: 0}}>
    <label className="input-label">{label}</label>
    <input type="number" className="input-field" value={value} onChange={e => set(e.target.value)} />
  </div>
)

const Card = ({ label, value, currency, color }) => (
  <div style={{ background: `${color}1a`, padding: '1rem', borderRadius: '1rem', border: `1px solid ${color}33`, textAlign: 'center' }}>
    <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>{label}</div>
    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: color }}>
      {currency}{typeof value === 'number' ? value.toLocaleString() : value}
    </div>
  </div>
)

// Shared Styles injected via logic to avoid massive CSS file for now
const style = document.createElement('style')
style.textContent = `
  .input-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
  .summary-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
`
document.head.appendChild(style)

export default Finance
