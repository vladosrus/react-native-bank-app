import { Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { useState, useMemo, useCallback } from 'react';

export function useFilteredTransactions() {
  const transactions = useSelector(state => state.bank.transactions);
  const [filter, setFilter] = useState('all');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState('date');
  const [activeTarget, setActiveTarget] = useState('start');
  const [tempDate, setTempDate] = useState(new Date());

  const filteredTransactions = useMemo(() => {
    return transactions.filter(transaction => {
      const matchesType = filter === 'all' || transaction.type === filter;
      const transactionTimestamp = new Date(transaction.date).getTime();
      const afterStart = startDate
        ? transactionTimestamp >= startDate.getTime()
        : true;
      const beforeEnd = endDate
        ? transactionTimestamp <= endDate.getTime()
        : true;

      return matchesType && afterStart && beforeEnd;
    });
  }, [transactions, filter, startDate, endDate]);

  const openPickerChain = useCallback(
    target => {
      setActiveTarget(target);
      setTempDate(
        target === 'start' ? startDate || new Date() : endDate || new Date(),
      );
      setPickerMode('date');
      setShowPicker(true);
    },
    [startDate, endDate],
  );

  const onPickerChange = useCallback(
    (event, selectedDate) => {
      if (event.type === 'dismissed') {
        setShowPicker(false);
        return;
      }

      if (Platform.OS === 'android') {
        setShowPicker(false);
      }

      if (pickerMode === 'date') {
        const updatedDate = new Date(tempDate);
        updatedDate.setFullYear(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
        );
        setTempDate(updatedDate);
        setPickerMode('time');
        if (Platform.OS === 'android') {
          // Android closes the picker synchronously — small delay before opening the next one
          setTimeout(() => setShowPicker(true), 100);
        }
      } else {
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
        setShowPicker(false);
      }
    },
    [pickerMode, tempDate, activeTarget],
  );

  const resetDateRange = useCallback(() => {
    setStartDate(null);
    setEndDate(null);
  }, []);

  return {
    filteredTransactions,
    filter,
    startDate,
    endDate,
    showPicker,
    pickerMode,
    tempDate,
    onFilterChange: setFilter,
    onOpenPicker: openPickerChain,
    onPickerChange,
    onResetDateRange: resetDateRange,
  };
}
