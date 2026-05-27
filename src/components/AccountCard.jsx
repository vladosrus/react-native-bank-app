import { View, Text, StyleSheet } from 'react-native';

import {
  COLORS,
  RADIUS,
  SHADOW,
  SPACING,
  FONT_SIZE,
  FONT_WEIGHT,
} from '@/constants';
import { formatCurrency } from '@/utils';

const AccountCard = ({ name, id, balance, currency }) => (
  <View style={s.card}>
    <Text style={s.accountName}>{name}</Text>
    <Text style={s.accountNumber}>*{id.slice(-4)}</Text>
    <Text style={s.balance}>{formatCurrency(balance, currency)}</Text>
  </View>
);

const s = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.md,
    ...SHADOW,
  },
  accountName: {
    fontSize: FONT_SIZE.base,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.textSecondary,
  },
  accountNumber: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textDisabled,
    marginVertical: SPACING.xs,
  },
  balance: {
    fontSize: FONT_SIZE.xxxl,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.textPrimary,
    marginTop: SPACING.sm,
  },
});

export default AccountCard;
