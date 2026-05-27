import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useState, useCallback } from 'react';

import SelectModal from './SelectModal';

import { formatCurrency } from '@/utils';
import { COLORS, RADIUS, SPACING, FONT_SIZE, FONT_WEIGHT } from '@/constants';

const Select = ({ label, data, value, onSelect, placeholder, error }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const selectedItem = data.find(({ id }) => id === value);

  const handleSelect = useCallback(
    id => {
      onSelect(id);
      setModalVisible(false);
    },
    [onSelect],
  );

  const openModal = useCallback(() => setModalVisible(true), []);
  const closeModal = useCallback(() => setModalVisible(false), []);

  return (
    <View style={s.container}>
      <Text style={s.label}>{label}</Text>

      <TouchableOpacity
        style={[s.selectButton, error && s.errorBorder]}
        activeOpacity={0.7}
        onPress={openModal}
      >
        <Text style={[s.selectText, !selectedItem && s.placeholderText]}>
          {selectedItem
            ? `${selectedItem.name} (${formatCurrency(
                selectedItem.balance,
                selectedItem.currency,
              )})`
            : placeholder || 'Выберите из списка'}
        </Text>

        <Text style={s.arrow}>▼</Text>
      </TouchableOpacity>

      {error && <Text style={s.errorText}>{error}</Text>}

      <SelectModal
        visible={modalVisible}
        label={label}
        data={data}
        value={value}
        onSelect={handleSelect}
        onClose={closeModal}
      />
    </View>
  );
};

const s = StyleSheet.create({
  container: { marginBottom: SPACING.md },
  label: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  selectButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.md,
    paddingVertical: 14,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.separator,
  },
  errorBorder: { borderColor: COLORS.danger },
  selectText: { fontSize: FONT_SIZE.base, color: COLORS.textPrimary },
  placeholderText: { color: COLORS.textDisabled },
  arrow: { fontSize: FONT_SIZE.xs, color: COLORS.textDisabled },
  errorText: {
    color: COLORS.danger,
    fontSize: FONT_SIZE.xs,
    marginTop: SPACING.xs,
  },
});

export default Select;
