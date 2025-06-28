'use client'

export default function InvestmentCard({ investment, onDelete }) {
  return (
    <div style={{
      border: '1px solid #ccc',
      padding: 12,
      borderRadius: 6,
      marginBottom: 12,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        <strong>{investment.symbol}</strong> — {investment.type} <br />
        ${investment.amount} on {investment.date}
      </div>
      <button
        onClick={() => onDelete(investment)}
        style={{
          backgroundColor: '#ef4444',
          color: 'white',
          border: 'none',
          padding: '6px 12px',
          borderRadius: 4,
          cursor: 'pointer'
        }}
      >
        Delete
      </button>
    </div>
  )
}
