const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3'

/**
 * Fetch current prices of given crypto IDs in USD.
 * @param {string[]} cryptoIds - Array of CoinGecko crypto ids, e.g. ['bitcoin', 'ethereum']
 * @returns {Promise<Object>} - { bitcoin: 45000, ethereum: 3000 }
 */
export async function fetchCryptoPrices(cryptoIds) {
  if (cryptoIds.length === 0) return {}

  const idsParam = cryptoIds.join(',')
  const url = `${COINGECKO_API_URL}/simple/price?ids=${idsParam}&vs_currencies=usd`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Failed to fetch crypto prices')
    }
    const data = await response.json()
    // Map to { id: price }
    const prices = {}
    cryptoIds.forEach((id) => {
      prices[id] = data[id]?.usd ?? null
    })
    return prices
  } catch (error) {
    console.error(error)
    return {}
  }
}
