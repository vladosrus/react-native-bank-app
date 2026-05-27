import { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { formatCurrency, formatTransactionDate } from '@/utils';
import {
  DEFAULT_CURRENCY,
  FONT_WEIGHT,
  FONT_SIZE,
  SPACING,
  RADIUS,
  COLORS,
} from '@/constants';

const TransactionCard = ({ description, date, amount }) => (
  <View style={s.card}>
    <View style={s.textsBox}>
      <Text style={s.description}>{description}</Text>
      <Text style={s.date}>{formatTransactionDate(date)}</Text>
    </View>

    <Text style={[s.amount, amount > 0 ? s.deposit : s.withdraw]}>
      {formatCurrency(amount, DEFAULT_CURRENCY)}
    </Text>
  </View>
);

const s = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: RADIUS.sm,
    marginBottom: SPACING.sm,
  },
  textsBox: { flex: 1 },
  description: {
    fontSize: FONT_SIZE.base,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.textPrimary,
  },
  date: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textDisabled,
    marginTop: SPACING.xs,
  },
  amount: { fontSize: FONT_SIZE.base, fontWeight: FONT_WEIGHT.semibold },
  deposit: { color: COLORS.success },
  withdraw: { color: COLORS.danger },
});

export default memo(TransactionCard);
