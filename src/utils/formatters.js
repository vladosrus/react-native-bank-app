/**
 * Форматирует число в валютный формат (например: 150 000 ₽)
 */
export const formatCurrency = (amount, currency = 'RUB') => {
  const currencySigns = {
    RUB: '₽',
    USD: '$',
    EUR: '€',
  };

  if (isNaN(amount)) return `0 ${currencySigns[currency] || currency}`;

  return `${Number(amount).toLocaleString('ru-RU')} ${
    currencySigns[currency] || currency
  }`;
};

/**
 * Форматирует строку даты в красивый вид (например: 21 мая 2026)
 */
export const formatDate = dateString => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};
