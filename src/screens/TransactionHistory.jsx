import { Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useFilteredTransactions } from '@/hooks';
import TransactionCard from '@/components/TransactionCard';
import TransactionFilters from '@/components/TransactionFilters';
import { FONT_WEIGHT, FONT_SIZE, SPACING, COLORS } from '@/constants';

const TransactionHistory = () => {
  const { filteredTransactions, ...filterProps } = useFilteredTransactions();

  return (
    <SafeAreaView style={s.container}>
      <Text style={s.title}>История операций</Text>

      <TransactionFilters {...filterProps} />

      <FlatList
        data={filteredTransactions}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <TransactionCard {...item} />}
        ListEmptyComponent={
          <Text style={s.emptyText}>
            Операций за выбранный период не найдено
          </Text>
        }
      />
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.lg,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: FONT_WEIGHT.bold,
    marginBottom: SPACING.lg,
    color: COLORS.textPrimary,
  },
  emptyText: {
    textAlign: 'center',
    color: COLORS.textDisabled,
    marginTop: 40,
    fontSize: FONT_SIZE.base,
  },
});

export default TransactionHistory;
