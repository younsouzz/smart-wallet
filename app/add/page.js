'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AddInvestmentPage() {
  const router = useRouter()
  const [type, setType] = useState('stock')
  const [symbol, setSymbol] = useState('')
  const [amount, setAmount] = useState('')
  const [quantity, setQuantity] = useState('')
  const [price, setPrice] = useState(null)
  const [inputMode, setInputMode] = useState('amount') // or 'quantity'

  useEffect(() => {
    if (!symbol) return

    const fetchPrice = async () => {
      try {
        if (type === 'crypto') {
          const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${symbol.toLowerCase()}&vs_currencies=eur`)
          const data = await res.json()
          setPrice(data[symbol.toLowerCase()]?.eur || null)
        } else {
          const res = await fetch(`https://api.twelvedata.com/price?symbol=${symbol.toUpperCase()}&apikey=demo`)
          const data = await res.json()
          setPrice(parseFloat(data.price) || null)
        }
      } catch {
        setPrice(null)
      }
    }

    fetchPrice()
  }, [symbol, type])

  useEffect(() => {
    if (!price) return

    if (inputMode === 'amount' && amount !== '') {
      const qty = parseFloat(amount) / price
      setQuantity(qty ? qty.toFixed(6) : '')
    } else if (inputMode === 'quantity' && quantity !== '') {
      const amt = parseFloat(quantity) * price
      setAmount(amt ? amt.toFixed(2) : '')
    }
  }, [amount, quantity, price, inputMode])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!symbol || (!amount && !quantity)) {
      alert('Please fill all fields')
      return
    }
    const data = {
      type,
      symbol: symbol.toUpperCase(),
      quantity: parseFloat(quantity),
      amount: parseFloat(amount),
      price
    }
    const stored = localStorage.getItem('investments')
    const investments = stored ? JSON.parse(stored) : []
    investments.push(data)
    localStorage.setItem('investments', JSON.stringify(investments))
    router.push('/')
  }

  return (
    <main style={{
      maxWidth: 600,
      margin: 'auto',
      padding: 20,
      background: '#1a1a1a',
      color: '#f0f0f0',
      fontFamily: 'sans-serif',
      minHeight: '100vh'
    }}>
      <h1 style={{ fontSize: 24, marginBottom: 20 }}>Add Investment</h1>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 15 }}>
        <div>
          <label style={{ fontWeight: 'bold' }}>Type:</label><br />
          <label><input type="radio" name="type" value="stock" checked={type === 'stock'} onChange={() => setType('stock')} /> Stock</label>
          <label style={{ marginLeft: 10 }}><input type="radio" name="type" value="crypto" checked={type === 'crypto'} onChange={() => setType('crypto')} /> Crypto</label>
        </div>

        <label>
          Symbol:
          <input
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            placeholder={type === 'crypto' ? 'e.g. BTC' : 'e.g. AAPL'}
            required
            style={inputStyle}
          />
        </label>

        <label>
          Amount (EUR):
          <input
            value={amount}
            onChange={(e) => {
              setInputMode('amount')
              setAmount(e.target.value)
            }}
            placeholder="Enter total amount"
            type="number"
            min="0"
            style={inputStyle}
          />
        </label>

        <label>
          Quantity:
          <input
            value={quantity}
            onChange={(e) => {
              setInputMode('quantity')
              setQuantity(e.target.value)
            }}
            placeholder="Enter quantity"
            type="number"
            min="0"
            step="any"
            style={inputStyle}
          />
        </label>

        {price && (
          <p style={{ fontSize: 14, color: '#ccc' }}>
            Current {type} price: €{price}
          </p>
        )}

        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#2563EB',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
          }}
        >
          Add
        </button>
      </form>
    </main>
  )
}

const inputStyle = {
  padding: 8,
  width: '100%',
  boxSizing: 'border-box',
  marginTop: 5,
  background: '#333',
  color: '#fff',
  border: '1px solid #555',
  borderRadius: 4,
}
