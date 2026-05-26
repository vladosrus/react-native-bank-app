import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import { formatCurrency } from '../utils/formatters';

const AccountCard = ({ name, id, balance, currency }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.accountName}>{name}</Text>
      <Text style={styles.accountNumber}>*{id.slice(-4)}</Text>
      <Text style={styles.balance}>{formatCurrency(balance, currency)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    padding: 20,
    borderRadius: SIZES.radiusCard,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  accountName: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  accountNumber: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginVertical: 4,
  },
  balance: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.textMain,
    marginTop: 8,
  },
});

export default AccountCard;
