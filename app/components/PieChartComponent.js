'use client'

import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'

const TYPE_COLORS = {
  stock: '#4F46E5',   // Indigo
  crypto: '#F97316',  // Orange
  default: '#A1A1AA'  // Gray
}

export default function PieChartComponent({ data }) {
  if (!data || data.length === 0) return <p>No data to show</p>

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="symbol"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label={({ name, percent }) =>
            `${name}: ${(percent * 100).toFixed(0)}%`
          }
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={
                TYPE_COLORS[entry.type?.toLowerCase()] || TYPE_COLORS.default
              }
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  )
}
