import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import { fetchDashboardData } from '@/store/bankSlice';
import AccountCard from '@/components/AccountCard';
import Button from '@/components/Button';

import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT } from '@/constants/theme';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { accounts, loading } = useSelector(state => state.bank);

  useEffect(() => {
    if (isFocused) dispatch(fetchDashboardData());
  }, [dispatch, isFocused]);

  const goToTransfer = useCallback(
    () => navigation.navigate('Transfer'),
    [navigation],
  );

  if (loading && accounts.length === 0) {
    return (
      <View style={s.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={s.container} edges={['top', 'bottom']}>
      <Text style={s.title}>Мои счета</Text>

      <FlatList
        data={accounts}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <AccountCard {...item} />}
      />

      <Button title="Перевести средства" onPress={goToTransfer} />
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    backgroundColor: COLORS.background,
    paddingBottom: SPACING.sm,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: FONT_WEIGHT.bold,
    marginBottom: SPACING.lg,
    color: COLORS.textPrimary,
    marginTop: SPACING.sm,
  },
});

export default Dashboard;
