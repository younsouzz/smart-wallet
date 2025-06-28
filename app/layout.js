// app/layout.js
export const metadata = {
  title: 'Smart Wallet',
  description: 'Dashboard',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          margin: 0,
          fontFamily: "'Inter', sans-serif",
          backgroundColor: '#121212',
          color: '#eee',
          minHeight: '100vh',
        }}
      >
        {children}
      </body>
    </html>
  )
}
