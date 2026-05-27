import { View, Text, TextInput, StyleSheet } from 'react-native';

import { FONT_WEIGHT, FONT_SIZE, SPACING, RADIUS, COLORS } from '@/constants';

const Input = ({ label, error, ...props }) => (
  <View style={s.container}>
    {label && <Text style={s.label}>{label}</Text>}

    <TextInput
      style={[s.input, error && s.inputError]}
      placeholderTextColor={COLORS.textDisabled}
      {...props}
    />

    {error && <Text style={s.errorText}>{error}</Text>}
  </View>
);

const s = StyleSheet.create({
  container: { marginBottom: SPACING.md },
  label: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.textSecondary,
    marginBottom: 6,
  },
  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.separator,
    borderRadius: RADIUS.sm,
    padding: 14,
    fontSize: FONT_SIZE.base,
    color: COLORS.textPrimary,
  },
  inputError: { borderColor: COLORS.danger },
  errorText: {
    color: COLORS.danger,
    fontSize: FONT_SIZE.xs,
    marginTop: SPACING.xs,
    fontWeight: FONT_WEIGHT.medium,
  },
});

export default Input;
