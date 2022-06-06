export function formatToCurrency(number: number) {
  if (!number || number === 0 || isNaN(number)) {
    return '-';
  }
  const roundNumber = Math.round(number * 100) / 100;
  if (roundNumber === 0) {
    return '-';
  }

  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    currency: 'EUR',
    style: 'currency'
  }).format(number);
}

export function formatToPercent(number: number) {
  if (!number || number === 0 || isNaN(number)) {
    return '-';
  }

  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    style: 'percent'
  }).format(number);
}
