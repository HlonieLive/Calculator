import React, { useState, useEffect } from 'react'
import nerdamer from 'nerdamer'
import 'nerdamer/Algebra'
import 'nerdamer/Calculus'
import 'nerdamer/Solve'
import 'nerdamer/Extra'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const Mathematics = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('solver') // solver, graph, reference
  
  return (
    <div className="calculator-layout animate-fade-in" style={{maxWidth: '900px'}}>
      <div className="calc-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <span className="calc-title">Mathematics Hub</span>
        <div style={{width: 48}}></div>
      </div>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        
        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <TabBtn label="Algebra Solver" active={activeTab === 'solver'} onClick={() => setActiveTab('solver')} />
          <TabBtn label="Graphing" active={activeTab === 'graph'} onClick={() => setActiveTab('graph')} />
          <TabBtn label="Theorems & Proofs" active={activeTab === 'reference'} onClick={() => setActiveTab('reference')} />
        </div>

        {activeTab === 'solver' && <Solver />}
        {activeTab === 'graph' && <Grapher />}
        {activeTab === 'reference' && <Reference />}

      </div>
    </div>
  )
}

const TabBtn = ({ label, active, onClick }) => (
  <button 
    onClick={onClick}
    style={{
      padding: '0.75rem 1.5rem',
      borderRadius: '2rem',
      background: active ? 'var(--color-primary)' : 'rgba(255,255,255,0.05)',
      color: active ? 'white' : 'var(--color-text-muted)',
      fontWeight: '600',
      border: active ? 'none' : '1px solid var(--glass-border)',
      transition: 'all 0.2s',
      flex: '1 1 auto'
    }}
  >
    {label}
  </button>
)

// --- 1. Solver Component using Nerdamer ---
const Solver = () => {
  const [input, setInput] = useState('')
  const [result, setResult] = useState(null)
  const [method, setMethod] = useState(null)
  const [error, setError] = useState(null)

  const handleSolve = () => {
    try {
      setError(null)
      setResult(null)
      setMethod(null)
      
      const expr = input.trim()
      if (!expr) return

      let ans = ''
      let explanation = ''

      // Heuristic to detect operation type
      if (expr.includes('=')) {
        // Solving Equation
        // nerdamer.solve(eqn, var)
        // Assume solving for 'x' if present, else 'a' or just the first char
        const vars = expr.match(/[a-zA-Z]/g)
        const targetVar = vars ? vars[0] : 'x'
        
        const sol = nerdamer.solve(expr, targetVar)
        ans = sol.toString()
        explanation = `Solved for variable '${targetVar}'.`
      } else if (expr.toLowerCase().startsWith('diff') || expr.toLowerCase().startsWith('derivative')) {
        // Differentiation
        // Format: diff(x^2) or diff(exp, var)
        const clean = expr.replace(/^(diff|derivative)\(/i, '').replace(/\)$/, '')
        const sol = nerdamer.diff(clean)
        ans = sol.toString()
        explanation = 'Calculated the derivative using the Power Rule and Chain Rule.'
      } else if (expr.toLowerCase().startsWith('integrate') || expr.toLowerCase().startsWith('int')) {
        // Integration
        const clean = expr.replace(/^(integrate|int)\(/i, '').replace(/\)$/, '')
        const sol = nerdamer.integrate(clean)
        ans = sol.toString() + ' + C'
        explanation = 'Computed the indefinite integral.'
      } else {
        // Verification / Evaluation / Simplification
        const sol = nerdamer(expr) // This simplifies/evaluates
        ans = sol.toString()
        if (ans !== expr) {
           explanation = 'Simplification / Evaluation'
        } else {
           // Maybe it's just a number
           explanation = 'Result'
        }
      }

      setResult(ans)
      setMethod(explanation)

    } catch (e) {
      console.error(e)
      setError("Could not parse or solve expression. Please check syntax.")
    }
  }

  const examples = [
    { label: '3x + 5 = 17', desc: 'Linear Equation' },
    { label: 'x^2 + 5x + 6 = 0', desc: 'Quadratic' },
    { label: 'diff(x^2 + cos(x))', desc: 'Derivative' },
    { label: 'integrate(x^2)', desc: 'Integral' },
    { label: 'sin(45) + cos(45)', desc: 'Trig Evaluation' }
  ]

  return (
    <div className="animate-fade-in">
      <h3 style={{fontSize: '1.5rem', marginBottom: '1rem'}}>Advanced Algebra System</h3>
      <p style={{color: '#94a3b8', marginBottom: '1.5rem'}}>
        Enter an equation to solve, or an expression to simplify. Use <b>diff(x)</b> for derivatives and <b>integrate(x)</b> for integrals.
      </p>

      <div className="input-group">
        <input 
          type="text" 
          className="input-field" 
          placeholder="e.g. 2x - 4 = 10" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSolve()}
          style={{ fontSize: '1.2rem', fontFamily: 'monospace' }}
        />
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {examples.map(ex => (
          <button 
            key={ex.label} 
            onClick={() => { setInput(ex.label); }}
            style={{ 
              padding: '0.5rem 1rem', 
              borderRadius: '1rem', 
              background: 'rgba(59, 130, 246, 0.1)', 
              border: '1px solid rgba(59, 130, 246, 0.2)',
              fontSize: '0.9rem', 
              color: '#93c5fd',
              textAlign: 'left'
            }}
          >
            <div style={{fontWeight: 'bold'}}>{ex.label}</div>
            <div style={{fontSize: '0.7rem', opacity: 0.7}}>{ex.desc}</div>
          </button>
        ))}
      </div>

      <button className="action-btn" onClick={handleSolve}>Solve Expression</button>

      {(result || error) && (
        <div className="result-box" style={{ borderColor: error ? '#ef4444' : 'var(--color-primary)', textAlign: 'left' }}>
           <p style={{ color: '#94a3b8', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
             {error ? 'Error' : 'Solution'}
           </p>
           
           {!error && method && (
              <div style={{ marginBottom: '1rem', background: 'rgba(255,255,255,0.05)', padding: '0.5rem', borderRadius: '0.5rem' }}>
                 <span style={{ color: '#ec4899', fontSize: '0.9rem', fontWeight: 'bold' }}>METHOD: </span>
                 <span style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>{method}</span>
              </div>
           )}

           <div className="result-value" style={{ 
             color: error ? '#ef4444' : 'var(--color-primary)', 
             fontSize: '1.8rem',
             wordBreak: 'break-all',
             textAlign: 'center'
           }}>
             {error ? error : Array.isArray(result) ? result.join(', ') : result}
           </div>

           {!error && (
             <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#64748b', textAlign: 'center' }}>
               {/* Tip based on input */}
               {input.includes('diff') ? 'Tip: You can also calculate higher order derivatives like diff(x^4, 2).' : 
                input.includes('=') ? 'Tip: You can solve system of equations by passing an array of equations.' : 
                'Tip: Try complex numbers or matrix operations.'}
             </div>
           )}
        </div>
      )}
    </div>
  )
}

// --- 2. Grapher Component ---
const Grapher = () => {
  const [eq, setEq] = useState('x^2')
  const [data, setData] = useState([])
  const [range, setRange] = useState(10)

  const plot = () => {
    try {
      const pts = []
      // Use nerdamer for safe evaluation of x
      const f = nerdamer(eq).buildFunction(['x']); // Compiles to JS function for speed

      for (let x = -range; x <= range; x += 0.5) {
        try {
           const y = f(x)
           if(!isNaN(y) && isFinite(y)) pts.push({ x, y })
        } catch(e) {}
      }
      setData(pts)
    } catch (e) {
      // console.log(e)
    }
  }

  React.useEffect(() => { plot() }, [])

  return (
    <div className="animate-fade-in">
       <h3 style={{fontSize: '1.5rem', marginBottom: '1rem'}}>Function Grapher</h3>
       
       <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
         <div style={{ flex: 1 }}>
            <label className="input-label">f(x) =</label>
            <input 
              className="input-field" 
              value={eq} 
              onChange={e => setEq(e.target.value)}
              placeholder="x^2"
              onKeyDown={(e) => e.key === 'Enter' && plot()}
            />
         </div>
         <div style={{ width: '100px' }}>
            <label className="input-label">Range (±)</label>
            <input 
              type="number" className="input-field" 
              value={range} 
              onChange={e => setRange(e.target.value)}
            />
         </div>
         <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button className="action-btn" style={{marginTop:0, height: '52px'}} onClick={plot}>Plot</button>
         </div>
       </div>

       <div style={{ height: '400px', background: 'rgba(0,0,0,0.2)', borderRadius: '1rem', padding: '1rem' }}>
         <ResponsiveContainer>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="x" type="number" domain={['auto', 'auto']} stroke="#94a3b8" allowDataOverflow />
              <YAxis dataKey="y" stroke="#94a3b8" allowDataOverflow />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }} labelFormatter={(v) => `x: ${v}`} formatter={(v) => v.toFixed(3)} />
              <Line type="monotone" dataKey="y" stroke="#8b5cf6" strokeWidth={3} dot={false} isAnimationActive={false} />
            </LineChart>
         </ResponsiveContainer>
       </div>
    </div>
  )
}

// --- 3. Reference Component (Theorems & Proofs) ---
const Reference = () => {
  const [topic, setTopic] = useState('geometry')
  const [levelfilter, setLevelFilter] = useState('All')
  const [expandedId, setExpandedId] = useState(null)

  const levels = ['All', 'Basic', 'Intermediate', 'Expert']

  const theoremData = {
    geometry: [
      { 
        id: 'pythag',
        title: 'Pythagorean Theorem', 
        level: 'Basic',
        desc: 'Relating the sides of a right triangle.',
        formula: 'a² + b² = c²',
        proof: [
          'Proof by Rearrangement:',
          '1. Consider a large square with side length (a + b). Its area is (a + b)².',
          '2. Place 4 identical right triangles (sides a, b, c) inside the corners.',
          '3. The central empty space is a square with side c and area c².',
          '4. Total Area = 4 × (Area of Triangle) + Area of Setup Square.',
          '5. (a + b)² = 4(½ab) + c²',
          '6. a² + 2ab + b² = 2ab + c²',
          '7. Subtract 2ab from both sides: a² + b² = c².'
        ]
      },
      { 
        id: 'angle_sum',
        title: 'Sum of Angles in Triangle', 
        level: 'Basic',
        desc: 'The interior angles of a triangle sum to 180°.',
        formula: 'α + β + γ = 180°',
        proof: [
          '1. Draw a triangle ABC.',
          '2. Draw a line parallel to the base BC passing through vertex A.',
          '3. By alternate interior angles, the angles formed at A with the sides AB and AC are equal to angles B and C respectively.',
          '4. These three angles at A form a straight line, which measures 180°.',
          '5. Therefore, Angle A + Angle B + Angle C = 180°.'
        ]
      },
      {
        id: 'law_cosines',
        title: 'Law of Cosines',
        level: 'Intermediate',
        desc: 'Generalization of Pythagorean theorem for any triangle.',
        formula: 'c² = a² + b² - 2ab cos(C)',
        proof: [
          '1. Drop an altitude h from vertex A to side a (BC), dividing a into x and (a-x).',
          '2. In the right triangle with hypotenuse b: h² = b² - x².',
          '3. In the right triangle with hypotenuse c: h² = c² - (a-x)²',
          '4. Equate h²: b² - x² = c² - (a² - 2ax + x²).',
          '5. Simplify: b² = c² - a² + 2ax.',
          '6. Note that x = b cos(C).',
          '7. Substitute x: b² = c² - a² + 2ab cos(C).',
          '8. Rearrange: c² = a² + b² - 2ab cos(C).'
        ]
      },
      {
        id: 'circles_area',
        title: 'Area of a Circle',
        level: 'Intermediate',
        desc: 'Derivation using concentric rings (integration notion).',
        formula: 'A = ∫ 2πr dr = πr²',
        proof: [
          '1. Divide the circle into thin concentric rings of radius x and width dx.',
          '2. The circumference of a ring is 2πx.',
          '3. The area of one thin ring is approx 2πx dx.',
          '4. Integrate from x=0 to x=r:',
          '5. Area = ∫(0 to r) 2πx dx',
          '6. = 2π [x²/2] from 0 to r',
          '7. = 2π (r²/2 - 0) = πr².'
        ]
      }
    ],
    algebra: [
      {
        title: 'Difference of Squares',
        level: 'Basic',
        desc: 'Algebraic expansion verification.',
        formula: 'a² - b² = (a - b)(a + b)',
        proof: [
          '1. Expand the right side (FOIL method).',
          '2. (a - b)(a + b) = a(a) + a(b) - b(a) - b(b)',
          '3. = a² + ab - ab - b²',
          '4. The middle terms cancel out (+ab - ab = 0).',
          '5. Result: a² - b².'
        ]
      },
      {
        title: 'Quadratic Formula',
        level: 'Intermediate',
        desc: 'Derivation by Completing the Square.',
        formula: 'x = (-b ± √(b² - 4ac)) / 2a',
        proof: [
          'Start with ax² + bx + c = 0.',
          '1. Divide by a: x² + (b/a)x + c/a = 0.',
          '2. Move constant: x² + (b/a)x = -c/a.',
          '3. Complete the square: Add (b/2a)² to both sides.',
          '4. x² + (b/a)x + (b/2a)² = -c/a + b²/4a².',
          '5. Factor left side: (x + b/2a)² = (b² - 4ac) / 4a².',
          '6. Square root both sides: x + b/2a = ±√(b² - 4ac) / 2a.',
          '7. Solve for x: x = (-b ± √(b² - 4ac)) / 2a.'
        ]
      },
      {
        title: 'Geometric Series Sum',
        level: 'Advanced',
        desc: 'Sum of finite geometric progression.',
        formula: 'S_n = a(1-r^n)/(1-r)',
        proof: [
          'Let S = a + ar + ar² + ... + ar^(n-1)',
          '1. Multiply S by r:',
          '   rS = ar + ar² + ... + ar^(n-1) + ar^n',
          '2. Subtract eqn(1) from eqn(S):',
          '   S - rS = a - ar^n  (middle terms cancel)',
          '3. Factor out S: S(1 - r) = a(1 - r^n)',
          '4. Divide by (1 - r):',
          '   S = a(1 - r^n) / (1 - r).'
        ]
      },
      {
        title: 'Binomial Theorem',
        level: 'Expert',
        desc: 'Proof by Mathematical Induction.',
        formula: '(x+y)^n = Σ (n k) x^(n-k) y^k',
        proof: [
          'Base Case n=1: (x+y)^1 = x + y. Matches formula.',
          'Inductive Step:',
          '1. Assume true for n = k.',
          '2. Consider n = k + 1: (x+y)^(k+1) = (x+y)(x+y)^k.',
          '3. = (x+y) Σ(k j) x^(k-j)y^j',
          '4. Distribute x and y into the sum.',
          '5. Use Pascal identity: (k j) + (k j-1) = (k+1 j).',
          '6. The terms recombine to form the coefficient for (k+1).',
          'Conclusion: Formula holds for all integers n ≥ 1.'
        ]
      }
    ],
    calculus: [
      {
        title: 'Power Rule',
        level: 'Basic',
        desc: 'Differentiation of polynomials.',
        formula: "d/dx(x^n) = nx^(n-1)",
        proof: [
          'Using the Limit Definition of Derivative:',
          '1. f\'(x) = lim(h→0) [(x+h)^n - x^n] / h',
          '2. Expand (x+h)^n using Binomial Theorem:',
          '   x^n + n*x^(n-1)*h + O(h²) ...',
          '3. Substitute back:',
          '   lim(h→0) [ (x^n + n*x^(n-1)*h + ...) - x^n ] / h',
          '4. Cancel x^n:',
          '   lim(h→0) [ n*x^(n-1)*h + O(h²) ] / h',
          '5. Divide by h:',
          '   lim(h→0) [ n*x^(n-1) + O(h) ]',
          '6. As h→0, O(h) terms vanish.',
          'Result: n*x^(n-1).'
        ]
      },
      {
        title: 'Fundamental Theorem of Calculus',
        level: 'Expert',
        desc: 'Linking differentiation and integration.',
        formula: '∫[a,b] f(x)dx = F(b) - F(a)',
        proof: [
          'Part 1: Let g(x) = ∫[a,x] f(t)dt.',
          '1. g(x+h) - g(x) = ∫[x, x+h] f(t)dt.',
          '2. For small h, this area ≈ f(x)·h.',
          '3. So [g(x+h) - g(x)]/h ≈ f(x).',
          '4. Taking limit h→0 implies g\'(x) = f(x).',
          '5. Thus g(x) is an antiderivative of f(x).Let that be F(x).',
          '6. ∫[a,b] f(t)dt = g(b) = F(b) + C.',
          '7. Since g(a) = 0, F(a) + C = 0 => C = -F(a).',
          '8. Therefore Area = F(b) - F(a).'
        ]
      }
    ]
  }

  const filteredData = theoremData[topic].filter(
    item => levelfilter === 'All' || item.level === levelfilter
  )

  return (
    <div className="animate-fade-in">
       {/* Controls */}
       <div style={{ display: 'flex', gap: '1rem',  marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{flex: 1, minWidth: '200px'}}>
             <label className="input-label" style={{marginBottom: '0.5rem'}}>Topic</label>
             <select className="select-field" value={topic} onChange={e => setTopic(e.target.value)}>
               <option value="geometry">Geometry</option>
               <option value="algebra">Algebra</option>
               <option value="calculus">Calculus</option>
             </select>
          </div>
          <div style={{flex: 1, minWidth: '200px'}}>
             <label className="input-label" style={{marginBottom: '0.5rem'}}>Difficulty Level</label>
             <select className="select-field" value={levelfilter} onChange={e => setLevelFilter(e.target.value)}>
               {levels.map(l => <option key={l} value={l}>{l}</option>)}
             </select>
          </div>
       </div>

       {/* List */}
       <div style={{ display: 'grid', gap: '1rem' }}>
          {filteredData.length === 0 ? (
            <div style={{textAlign: 'center', color: '#64748b', padding: '2rem'}}>No theorems found for this level.</div>
          ) : (
            filteredData.map((item, idx) => {
              const isExpanded = expandedId === idx
              
              // Color coding by level
              let badgeColor = '#3b82f6' // basic blue
              if(item.level === 'Intermediate') badgeColor = '#f59e0b' // orange
              if(item.level === 'Expert' || item.level === 'Advanced') badgeColor = '#ec4899' // pink

              return (
                <div 
                  key={idx} 
                  className="glass-panel" 
                  style={{ 
                    padding: '0', 
                    overflow: 'hidden', 
                    borderLeft: `4px solid ${badgeColor}`,
                    transition: 'all 0.3s ease'
                  }}
                >
                   <div 
                     style={{ padding: '1.5rem', cursor: 'pointer', background: isExpanded ? 'rgba(255,255,255,0.03)' : 'transparent' }}
                     onClick={() => setExpandedId(isExpanded ? null : idx)}
                   >
                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <h4 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-display)', marginBottom: '0.25rem' }}>
                            {item.title}
                          </h4>
                          <span style={{ 
                            fontSize: '0.75rem', 
                            textTransform: 'uppercase', 
                            background: `${badgeColor}33`, 
                            color: badgeColor, 
                            padding: '2px 8px', 
                            borderRadius: '4px',
                            fontWeight: 'bold'
                          }}>
                            {item.level}
                          </span>
                        </div>
                        <div style={{ color: '#94a3b8' }}>{isExpanded ? '▲' : '▼'}</div>
                     </div>
                     
                     {!isExpanded && (
                       <p style={{ color: '#94a3b8', marginTop: '0.5rem', fontSize: '0.9rem' }}>{item.desc}</p>
                     )}
                   </div>

                   {/* Expanded Content */}
                   {isExpanded && (
                     <div style={{ padding: '0 1.5rem 1.5rem 1.5rem', animation: 'fadeIn 0.3s' }}>
                        <div style={{ 
                           background: 'rgba(0,0,0,0.3)', 
                           padding: '1rem', 
                           borderRadius: '0.5rem', 
                           fontFamily: 'monospace', 
                           textAlign: 'center',
                           fontSize: '1.1rem',
                           color: 'var(--color-primary)',
                           marginBottom: '1.5rem'
                        }}>
                          {item.formula}
                        </div>

                        <h5 style={{ color: '#cbd5e1', marginBottom: '0.5rem', borderBottom: '1px solid #334155', paddingBottom: '0.5rem' }}>Proof / Derivation</h5>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          {item.proof.map((step, sIdx) => (
                             <div key={sIdx} style={{ display: 'flex', gap: '0.75rem', fontSize: '0.95rem', color: '#94a3b8' }}>
                                <div style={{ minWidth: '4px', background: '#334155', borderRadius: '2px' }}></div>
                                <div>{step}</div>
                             </div>
                          ))}
                        </div>
                     </div>
                   )}
                </div>
              )
            })
          )}
       </div>
    </div>
  )
}

export default Mathematics
