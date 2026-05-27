import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, StyleSheet, Alert } from 'react-native';

import { executeTransfer } from '@/store/bankSlice';
import Button from '@/components/Button';
import Select from '@/components/Select';
import Input from '@/components/Input';

import { COLORS, SPACING } from '@/constants';

const validateTransfer = (fromAccount, toAccount, amount) => {
  const errors = {};

  if (!fromAccount) errors.fromAccount = 'Выберите счет списания';
  if (!toAccount) errors.toAccount = 'Выберите счет получателя';
  if (fromAccount && toAccount && fromAccount === toAccount) {
    errors.toAccount = 'Счет списания и получения не должны совпадать';
  }
  if (isNaN(Number(amount)) || !amount || Number(amount) <= 0) {
    errors.amount = 'Укажите корректную сумму';
  }

  return errors;
};

const Transfer = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const loading = useSelector(state => state.bank.loading);
  const accounts = useSelector(state => state.bank.accounts);

  const [fromAccount, setFromAccount] = useState('');
  const [toAccount, setToAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [errors, setErrors] = useState({});

  const handleTransfer = useCallback(async () => {
    const validationErrors = validateTransfer(fromAccount, toAccount, amount);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
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
      Alert.alert(
        'Ошибка операции',
        typeof err === 'string' ? err : err.message || 'Что-то пошло не так',
      );
    }
  }, [dispatch, navigation, fromAccount, toAccount, amount]);

  return (
    <ScrollView style={s.container} contentContainerStyle={s.content}>
      <Select
        label="Счет списания"
        placeholder="Выберите ваш счет"
        data={accounts}
        value={fromAccount}
        onSelect={setFromAccount}
        error={errors.fromAccount}
      />

      <Select
        label="Счет получателя"
        placeholder="Выберите получателя"
        data={accounts}
        value={toAccount}
        onSelect={setToAccount}
        error={errors.toAccount}
      />

      <Input
        label="Сумма перевода (₽)"
        placeholder="0.00"
        value={amount}
        onChangeText={text => setAmount(text)}
        keyboardType="numeric"
        error={errors.amount}
      />

      <Button
        title="Подтвердить перевод"
        onPress={handleTransfer}
        loading={loading}
        style={s.submitBtn}
      />
    </ScrollView>
  );
};

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.lg },
  submitBtn: { marginTop: SPACING.base },
});

export default Transfer;
