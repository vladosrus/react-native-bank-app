import React, { useEffect } from 'react';
import { Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { fetchDashboardData } from '../store/bankSlice';

import { COLORS, SIZES } from '../constants/theme';
import AccountCard from '../components/AccountCard';
import Button from '../components/Button';

const Dashboard = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { accounts, loading } = useSelector(state => state.bank);

  useEffect(() => {
    if (isFocused) {
      dispatch(fetchDashboardData());
    }
  }, [dispatch, isFocused]);

  if (loading && accounts.length === 0) {
    return (
      <ActivityIndicator
        size="large"
        style={styles.center}
        color={COLORS.primary}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <Text style={styles.title}>Мои счета</Text>

      <FlatList
        data={accounts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <AccountCard
            name={item.name}
            id={item.id}
            balance={item.balance}
            currency={item.currency}
          />
        )}
      />

      <Button
        title="Перевести средства"
        onPress={() => navigation.navigate('Transfer')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
    backgroundColor: COLORS.background,
    paddingBottom: 10,
  },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    color: COLORS.textMain,
    marginTop: 10,
  },
});

export default Dashboard;
