import { CURRENCY_SIGNS, DEFAULT_CURRENCY } from '@/constants/currencies';

export const formatCurrency = (amount, currency = DEFAULT_CURRENCY) => {
  const sign = CURRENCY_SIGNS[currency] ?? currency;
  const num = Number(amount);

  if (!Number.isFinite(num)) return `0 ${sign}`;

  return `${num.toLocaleString('ru-RU')} ${sign}`;
};

export const formatTransactionDate = dateString =>
  new Date(dateString).toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
