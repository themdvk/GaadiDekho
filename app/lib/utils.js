/**
 * Formats a number as a price in Indian Rupees (₹)
 * @param {number} price - The price to format
 * @returns {string} - The formatted price string
 */
export function formatPrice(price) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
}
