import {
  View,
  Text,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import {
  TRANSACTION_TYPES,
  FONT_WEIGHT,
  FONT_SIZE,
  SPACING,
  RADIUS,
  COLORS,
} from '@/constants';

const FILTER_OPTIONS = [
  { key: 'all', label: 'Все' },
  { key: TRANSACTION_TYPES.DEPOSIT, label: 'Доходы' },
  { key: TRANSACTION_TYPES.TRANSFER, label: 'Расходы' },
];

const formatBtnDate = date => {
  if (!date) return 'Выбрать';

  return date.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const TransactionFilters = ({
  filter,
  onFilterChange,
  startDate,
  endDate,
  showPicker,
  pickerMode,
  tempDate,
  onOpenPicker,
  onPickerChange,
  onResetDateRange,
}) => {
  return (
    <>
      <Text style={s.sectionLabel}>Тип операции</Text>
      <View style={s.filterContainer}>
        {FILTER_OPTIONS.map(({ key, label }) => (
          <TouchableOpacity
            key={key}
            style={[s.filterButton, filter === key && s.activeFilter]}
            onPress={() => onFilterChange(key)}
            activeOpacity={0.7}
          >
            <Text style={[s.filterText, filter === key && s.activeFilterText]}>
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={s.dateHeaderRow}>
        <Text style={s.sectionLabel}>Интервал дата-время</Text>
        {(startDate || endDate) && (
          <TouchableOpacity onPress={onResetDateRange} activeOpacity={0.7}>
            <Text style={s.resetText}>Сбросить</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={s.dateTimeRangeContainer}>
        <TouchableOpacity
          style={[s.dateInputBtn, startDate && s.activeDateBtn]}
          activeOpacity={0.7}
          onPress={() => onOpenPicker('start')}
        >
          <Text style={s.dateInputSub}>От:</Text>
          <Text style={s.dateInputText}>{formatBtnDate(startDate)}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[s.dateInputBtn, endDate && s.activeDateBtn]}
          activeOpacity={0.7}
          onPress={() => onOpenPicker('end')}
        >
          <Text style={s.dateInputSub}>До:</Text>
          <Text style={s.dateInputText}>{formatBtnDate(endDate)}</Text>
        </TouchableOpacity>
      </View>

      {showPicker && (
        <DateTimePicker
          value={tempDate}
          mode={pickerMode}
          is24Hour={true}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onPickerChange}
        />
      )}
    </>
  );
};

const s = StyleSheet.create({
  sectionLabel: {
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  dateHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resetText: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.danger,
    fontWeight: FONT_WEIGHT.semibold,
    marginBottom: SPACING.sm,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: SPACING.lg,
    gap: SPACING.sm,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: COLORS.separator,
    alignItems: 'center',
  },
  activeFilter: { backgroundColor: COLORS.primary },
  filterText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.textSecondary,
  },
  activeFilterText: { color: COLORS.white },
  dateTimeRangeContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: SPACING.lg,
  },
  dateInputBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.separator,
  },
  activeDateBtn: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  dateInputSub: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textDisabled,
    marginRight: SPACING.xs,
  },
  dateInputText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.textPrimary,
  },
});

export default TransactionFilters;
