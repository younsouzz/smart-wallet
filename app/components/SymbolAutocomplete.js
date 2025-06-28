'use client'

import { useState, useEffect } from 'react'

export default function SymbolAutocomplete({ value, onSelect, type }) {
  const [input, setInput] = useState(value || '')
  const [suggestions, setSuggestions] = useState([])

  const stockSymbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'FB', 'NFLX']
  const cryptoSymbols = ['BTC', 'ETH', 'BNB', 'ADA', 'SOL', 'XRP', 'DOT']

  useEffect(() => {
    setInput(value || '')
  }, [value])

  useEffect(() => {
    if (!input) {
      setSuggestions([])
      return
    }
    const list = type === 'crypto' ? cryptoSymbols : stockSymbols
    const filtered = list.filter((sym) =>
      sym.toLowerCase().startsWith(input.toLowerCase())
    )
    setSuggestions(filtered.slice(0, 5))
  }, [input, type])

  function handleSelect(s) {
    setInput(s)
    setSuggestions([])
    if (onSelect) onSelect(s)
  }

  return (
    <div style={{ position: 'relative' }}>
      <input
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value.toUpperCase())
          if (onSelect) onSelect('')
        }}
        placeholder="Symbol"
        style={{ padding: 8, width: '100%', boxSizing: 'border-box', textTransform: 'uppercase' }}
      />
      {suggestions.length > 0 && (
        <ul
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'white',
            border: '1px solid #ccc',
            margin: 0,
            padding: 0,
            listStyle: 'none',
            maxHeight: 150,
            overflowY: 'auto',
            zIndex: 10,
          }}
        >
          {suggestions.map((s) => (
            <li
              key={s}
              onClick={() => handleSelect(s)}
              style={{
                padding: '8px 12px',
                cursor: 'pointer',
                borderBottom: '1px solid #eee',
              }}
              onMouseDown={e => e.preventDefault()}
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
