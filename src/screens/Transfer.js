import React, { useState } from 'react';
import { ScrollView, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { executeTransfer } from '../store/bankSlice';

import { COLORS, SIZES } from '../constants/theme';
import Input from '../components/Input';
import Button from '../components/Button';
import Select from '../components/Select'; // Импортируем новый селектор

const Transfer = ({ navigation }) => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.bank.loading);

  // Достаем массив аккаунтов, которые лежат в вашем Redux ( mockAccounts )
  const accounts = useSelector(state => state.bank.accounts || []);

  const [fromAccount, setFromAccount] = useState('');
  const [toAccount, setToAccount] = useState('');
  const [amount, setAmount] = useState('');

  const [errors, setErrors] = useState({});

  const handleTransfer = async () => {
    let currentErrors = {};
    if (!fromAccount) currentErrors.fromAccount = 'Выберите счет списания';
    if (!toAccount) currentErrors.toAccount = 'Выберите счет получателя';
    if (fromAccount && toAccount && fromAccount === toAccount) {
      currentErrors.toAccount = 'Счет списания и получения не должны совпадать';
    }
    if (!amount || Number(amount) <= 0)
      currentErrors.amount = 'Укажите корректную сумму';

    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      return;
    }

    setErrors({});

    try {
      await dispatch(
        executeTransfer({ fromAccount, toAccount, amount }),
      ).unwrap();

      Alert.alert('Успешно', 'Перевод выполнен', [
        {
          text: 'ОК',
          onPress: () =>
            navigation.navigate('HomeTabs', { screen: 'Dashboard' }),
        },
      ]);
    } catch (err) {
      console.error('Ошибка при выполнении перевода:', err);
      Alert.alert('Ошибка операции', err.message || 'Что-то пошло не так');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Селектор счета списания */}
      <Select
        label="Счет списания"
        placeholder="Выберите ваш счет"
        data={accounts}
        value={fromAccount}
        onSelect={setFromAccount}
        error={errors.fromAccount}
      />

      {/* Селектор счета получения */}
      <Select
        label="Счет получателя"
        placeholder="Выберите получателя"
        data={accounts}
        value={toAccount}
        onSelect={setToAccount}
        error={errors.toAccount}
      />

      {/* Поле ввода суммы (остается инпутом) */}
      <Input
        label="Сумма перевода (₽)"
        placeholder="0.00"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        error={errors.amount}
      />

      <Button
        title="Подтвердить перевод"
        onPress={handleTransfer}
        loading={loading}
        style={styles.submitBtn}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SIZES.padding,
  },
  submitBtn: {
    marginTop: 10,
  },
});

export default Transfer;
