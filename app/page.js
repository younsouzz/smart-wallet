'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function HomePage() {
  const [investments, setInvestments] = useState([])

  useEffect(() => {
    const stored = localStorage.getItem('investments')
    if (stored) {
      setInvestments(JSON.parse(stored))
    }
  }, [])

  const total = investments.reduce((sum, inv) => sum + inv.amount, 0)

  const grouped = investments.reduce((acc, inv) => {
    acc[inv.type] = (acc[inv.type] || 0) + inv.amount
    return acc
  }, {})

  const percentages = {}
  for (const key in grouped) {
    percentages[key] = ((grouped[key] / total) * 100).toFixed(1)
  }

  return (
    <main
      style={{
        maxWidth: 700,
        margin: '40px auto',
        padding: 20,
        backgroundColor: '#1E1E1E',
        borderRadius: 12,
        boxShadow: '0 6px 15px rgba(0,0,0,0.7)',
      }}
    >
      <h1 style={{ fontWeight: 600, fontSize: 32, marginBottom: 20, color: '#fff' }}>
        Smart Wallet Dashboard
      </h1>

      <div style={{ marginBottom: 30 }}>
        <Link href="/add">
          <button
            style={{
              padding: '12px 28px',
              backgroundColor: '#2563EB',
              color: 'white',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              fontSize: 18,
              fontWeight: 600,
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#1E40AF')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#2563EB')}
          >
            Add Investment
          </button>
        </Link>
      </div>

      <h2 style={{ fontWeight: 600, fontSize: 24, marginBottom: 16, color: '#ccc' }}>
        Your Investments
      </h2>

      {investments.length === 0 ? (
        <p style={{ fontSize: 18, color: '#777' }}>No investments yet. Add some!</p>
      ) : (
        <>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 25 }}>
            <thead>
              <tr>
                <th
                  style={{
                    textAlign: 'left',
                    borderBottom: '2px solid #444',
                    paddingBottom: 8,
                    fontWeight: 600,
                    color: '#ddd',
                  }}
                >
                  Type
                </th>
                <th
                  style={{
                    textAlign: 'left',
                    borderBottom: '2px solid #444',
                    paddingBottom: 8,
                    fontWeight: 600,
                    color: '#ddd',
                  }}
                >
                  Symbol
                </th>
                <th
                  style={{
                    textAlign: 'right',
                    borderBottom: '2px solid #444',
                    paddingBottom: 8,
                    fontWeight: 600,
                    color: '#ddd',
                  }}
                >
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {investments.map((inv, i) => (
                <tr
                  key={i}
                  style={{
                    borderBottom: '1px solid #333',
                    color: '#eee',
                  }}
                >
                  <td style={{ padding: '10px 0' }}>{inv.type}</td>
                  <td style={{ padding: '10px 0', fontWeight: 600 }}>{inv.symbol}</td>
                  <td style={{ padding: '10px 0', textAlign: 'right' }}>
                    {inv.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 style={{ fontWeight: 600, fontSize: 20, marginBottom: 20, color: '#fff' }}>
            Total Invested: ${total.toFixed(2)}
          </h3>

          <h3 style={{ fontWeight: 600, fontSize: 20, marginBottom: 12, color: '#ccc' }}>
            Investment Distribution
          </h3>
          <svg
            width="300"
            height="300"
            viewBox="0 0 32 32"
            style={{ display: 'block', margin: 'auto', marginBottom: 20 }}
          >
            {total > 0 && (
              <>
                <circle r="16" cx="16" cy="16" fill="#333" />
                {Object.entries(percentages).map(([type, percent], index, arr) => {
                  const start = arr
                    .slice(0, index)
                    .reduce((acc, [, p]) => acc + parseFloat(p), 0)
                  const end = start + parseFloat(percent)
                  const startAngle = (start / 100) * 2 * Math.PI - Math.PI / 2
                  const endAngle = (end / 100) * 2 * Math.PI - Math.PI / 2

                  const x1 = 16 + 16 * Math.cos(startAngle)
                  const y1 = 16 + 16 * Math.sin(startAngle)
                  const x2 = 16 + 16 * Math.cos(endAngle)
                  const y2 = 16 + 16 * Math.sin(endAngle)

                  const largeArcFlag = percent > 50 ? 1 : 0

                  const pathData = `
                    M 16 16
                    L ${x1} ${y1}
                    A 16 16 0 ${largeArcFlag} 1 ${x2} ${y2}
                    Z
                  `

                  const colors = {
                    stock: '#2563EB',
                    crypto: '#16A34A',
                  }

                  return <path key={type} d={pathData} fill={colors[type] || '#888'} />
                })}
              </>
            )}
          </svg>

          <div
            style={{
              marginTop: 10,
              textAlign: 'center',
              fontSize: 16,
              color: '#bbb',
              display: 'flex',
              justifyContent: 'center',
              gap: '24px',
            }}
          >
            {Object.entries(percentages).map(([type, percent]) => (
              <div
                key={type}
                style={{ display: 'flex', alignItems: 'center', gap: 6, userSelect: 'none' }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: 16,
                    height: 16,
                    backgroundColor: type === 'stock' ? '#2563EB' : '#16A34A',
                    borderRadius: 4,
                  }}
                ></span>
                <span style={{ fontWeight: 600, textTransform: 'capitalize' }}>
                  {type}: {percent}%
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  )
}
