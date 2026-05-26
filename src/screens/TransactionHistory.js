import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';

const TransactionHistory = () => {
  const transactions = useSelector(state => state.bank.transactions);
  const [filter, setFilter] = useState('all'); // 'all' | 'deposit' | 'transfer'

  // Состояния для кастомного диапазона дат
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Состояния для управления видимостью системных дата-пикеров
  const [showPicker, setShowPicker] = useState(false); // показывает пикер
  const [pickerMode, setPickerMode] = useState('date'); // 'date' | 'time'
  const [activeTarget, setActiveTarget] = useState('start'); // 'start' | 'end'

  // Временный объект даты, который мы настраиваем пошагово (сначала дата, потом время)
  const [tempDate, setTempDate] = useState(new Date());

  // Логика фильтрации
  const filteredTransactions = transactions.filter(tx => {
    // 1. Фильтр по типу
    const matchesType = filter === 'all' || tx.type === filter;

    // 2. Фильтр по диапазону дата-время
    const txTimestamp = new Date(tx.date).getTime();

    let matchesStartDate = true;
    let matchesEndDate = true;

    if (startDate) {
      matchesStartDate = txTimestamp >= startDate.getTime();
    }
    if (endDate) {
      matchesEndDate = txTimestamp <= endDate.getTime();
    }

    return matchesType && matchesStartDate && matchesEndDate;
  });

  const openPickerChain = target => {
    setActiveTarget(target);
    setTempDate(
      target === 'start' ? startDate || new Date() : endDate || new Date(),
    );
    setPickerMode('date');
    setShowPicker(true);
  };

  // Обработчик выбора в системном пикере
  const onPickerChange = (event, selectedDate) => {
    // Если пользователь нажал "Отмена" (на Android)
    if (event.type === 'dismissed') {
      setShowPicker(false);
      return;
    }

    if (Platform.OS === 'android') {
      setShowPicker(false); // Android требует закрыть текущий пикер перед открытием нового
    }

    if (pickerMode === 'date') {
      // Сохраняем выбранную дату и сразу переключаем на выбор времени
      const updatedDate = new Date(tempDate);
      updatedDate.setFullYear(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
      );
      setTempDate(updatedDate);

      // Переключаем режим на время
      setPickerMode('time');
      if (Platform.OS === 'android') {
        // Небольшой хак для Android, чтобы успело закрыться окно даты перед окном времени
        setTimeout(() => setShowPicker(true), 100);
      }
    } else {
      // Время выбрано, финализируем объект даты-времени
      const finalDate = new Date(tempDate);
      finalDate.setHours(
        selectedDate.getHours(),
        selectedDate.getMinutes(),
        0,
        0,
      );

      if (activeTarget === 'start') {
        setStartDate(finalDate);
      } else {
        setEndDate(finalDate);
      }
      setShowPicker(false); // Закрываем полностью цепочку
    }
  };

  // Красивое форматирование для кнопок выбора
  const formatBtnDate = date => {
    if (!date) return 'Выбрать';
    return date.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>История операций</Text>

      {/* Фильтр по типу */}
      <Text style={styles.sectionLabel}>Тип операции</Text>
      <View style={styles.filterContainer}>
        {['all', 'deposit', 'transfer'].map(type => (
          <TouchableOpacity
            key={type}
            style={[
              styles.filterButton,
              filter === type && styles.activeFilter,
            ]}
            onPress={() => setFilter(type)}
          >
            <Text
              style={[
                styles.filterText,
                filter === type && styles.activeFilterText,
              ]}
            >
              {type === 'all'
                ? 'Все'
                : type === 'deposit'
                ? 'Доходы'
                : 'Расходы'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Фильтр по кастомной Дате и Времени */}
      <View style={styles.dateHeaderRow}>
        <Text style={styles.sectionLabel}>Интервал дата-время</Text>
        {(startDate || endDate) && (
          <TouchableOpacity
            onPress={() => {
              setStartDate(null);
              setEndDate(null);
            }}
          >
            <Text style={styles.resetText}>Сбросить</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.dateTimeRangeContainer}>
        <TouchableOpacity
          style={[styles.dateInputBtn, startDate && styles.activeDateBtn]}
          onPress={() => openPickerChain('start')}
        >
          <Text style={styles.dateInputSub}>От:</Text>
          <Text style={styles.dateInputText}>{formatBtnDate(startDate)}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.dateInputBtn, endDate && styles.activeDateBtn]}
          onPress={() => openPickerChain('end')}
        >
          <Text style={styles.dateInputSub}>До:</Text>
          <Text style={styles.dateInputText}>{formatBtnDate(endDate)}</Text>
        </TouchableOpacity>
      </View>

      {/* Нативный пикер (рендерится только по требованию) */}
      {showPicker && (
        <DateTimePicker
          value={tempDate}
          mode={pickerMode}
          is24Hour={true}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onPickerChange}
        />
      )}

      {/* Список транзакций */}
      <FlatList
        data={filteredTransactions}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.txCard}>
            <View style={styles.txInfo}>
              <Text style={styles.txDescription}>{item.description}</Text>
              <Text style={styles.txDate}>
                {new Date(item.date).toLocaleString('ru-RU', {
                  day: 'numeric',
                  month: 'short',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </View>
            <Text
              style={[
                styles.txAmount,
                item.amount > 0 ? styles.deposit : styles.withdraw,
              ]}
            >
              {item.amount > 0 ? `+${item.amount}` : item.amount} ₽
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Операций за выбранный период не найдено
          </Text>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F5F7FA' },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    color: '#1A1C1E',
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6C727A',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  dateHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resetText: {
    fontSize: 12,
    color: '#FF3B30',
    fontWeight: '600',
    marginBottom: 8,
  },
  filterContainer: { flexDirection: 'row', marginBottom: 20, gap: 8 },
  filterButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#E1E3E6',
    alignItems: 'center',
  },
  activeFilter: { backgroundColor: '#007AFF' },
  filterText: { fontSize: 13, fontWeight: '600', color: '#6C727A' },
  activeFilterText: { color: '#FFF' },

  // Стили для новых кнопок выбора даты
  dateTimeRangeContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  dateInputBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E1E3E6',
  },
  activeDateBtn: {
    borderColor: '#007AFF',
    backgroundColor: '#F0F7FF',
  },
  dateInputSub: {
    fontSize: 13,
    color: '#9AA1A9',
    marginRight: 4,
  },
  dateInputText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1C1E',
  },

  txCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  txInfo: { flex: 1 },
  txDescription: { fontSize: 16, fontWeight: '500', color: '#1A1C1E' },
  txDate: { fontSize: 12, color: '#9AA1A9', marginTop: 4 },
  txAmount: { fontSize: 16, fontWeight: '600' },
  deposit: { color: '#34C759' },
  withdraw: { color: '#FF3B30' },
  emptyText: {
    textAlign: 'center',
    color: '#9AA1A9',
    marginTop: 40,
    fontSize: 16,
  },
});

export default TransactionHistory;
