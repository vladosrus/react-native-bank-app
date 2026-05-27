import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { memo } from 'react';
import { COLORS, RADIUS, FONT_SIZE, FONT_WEIGHT } from '@/constants';

const Button = ({ title, onPress, loading, disabled, style }) => (
  <TouchableOpacity
    style={[s.button, disabled && s.disabled, style]}
    activeOpacity={0.8}
    disabled={disabled || loading}
    onPress={onPress}
  >
    {loading ? (
      <ActivityIndicator color={COLORS.white} />
    ) : (
      <Text style={s.text}>{title}</Text>
    )}
  </TouchableOpacity>
);

const s = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 54,
  },
  disabled: { backgroundColor: COLORS.textDisabled },
  text: {
    color: COLORS.white,
    fontSize: FONT_SIZE.base,
    fontWeight: FONT_WEIGHT.semibold,
  },
});

export default memo(Button);
