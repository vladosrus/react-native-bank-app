import { memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { COLORS, RADIUS, SPACING, FONT_SIZE, FONT_WEIGHT } from '@/constants';
import { formatCurrency } from '@/utils';

const OptionItem = ({ name, id, balance, currency, isSelected, onPress }) => (
  <TouchableOpacity
    style={[s.optionItem, isSelected && s.selectedOptionItem]}
    activeOpacity={0.7}
    onPress={onPress}
  >
    <View>
      <Text style={s.name}>{name}</Text>
      <Text style={s.id}>Счёт №****{id}</Text>
    </View>

    <Text style={s.balance}>{formatCurrency(balance, currency)}</Text>
  </TouchableOpacity>
);

const s = StyleSheet.create({
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: RADIUS.sm,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.separator,
  },
  selectedOptionItem: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  name: {
    fontSize: FONT_SIZE.base,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.textPrimary,
  },
  id: { fontSize: FONT_SIZE.xs, color: COLORS.textDisabled, marginTop: 2 },
  balance: {
    fontSize: FONT_SIZE.base,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.success,
  },
});

export default memo(OptionItem);
