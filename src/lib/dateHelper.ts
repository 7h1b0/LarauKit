export function formatDate(time: string | number) {
  if (time == null) return '';
  const date = new Date(time);
  const intl = new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
  return intl.format(date);
}

export function getShortMonths() {
  const intl = new Intl.DateTimeFormat('en-US', { month: 'short' });

  return Array.from({ length: 12 }, (_, i) => i).map((index) => {
    const date = new Date(2020, index, 5);
    return intl.format(date);
  });
}
