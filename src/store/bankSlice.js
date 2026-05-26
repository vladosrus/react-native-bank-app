import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../services/api';

export const fetchDashboardData = createAsyncThunk(
  'bank/fetchDashboard',
  async () => {
    const accounts = await api.getAccounts();
    const transactions = await api.getTransactions();
    return { accounts, transactions };
  },
);

export const executeTransfer = createAsyncThunk(
  'bank/executeTransfer',
  async (transferData, { rejectWithValue }) => {
    try {
      const response = await api.postTransfer(transferData);

      return {
        ...transferData,
        amount: Number(transferData.amount),
        ...response,
      };
    } catch (error) {
      // Передаем именно текст ошибки, чтобы поймать его в компонент через unwrapped результат
      return rejectWithValue(error.message || 'Ошибка сервера');
    }
  },
);

const bankSlice = createSlice({
  name: 'bank',
  initialState: {
    accounts: [],
    transactions: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      // Получение данных дашборда
      .addCase(fetchDashboardData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.accounts = action.payload.accounts;
        state.transactions = action.payload.transactions;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Выполнение перевода (Включаем лоадер для кнопки перевода)
      .addCase(executeTransfer.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(executeTransfer.fulfilled, (state, action) => {
        state.loading = false;
        const { fromAccount, toAccount, amount, transaction } = action.payload;

        // Чистое обновление массивов через создание новых объектов
        state.accounts = state.accounts.map(acc => {
          if (acc.id === fromAccount) {
            return { ...acc, balance: acc.balance - amount };
          }
          if (acc.id === toAccount) {
            return { ...acc, balance: acc.balance + amount };
          }
          return acc;
        });

        // Добавляем новую транзакцию в начало списка истории
        if (transaction) {
          state.transactions.unshift(transaction);
        }
      })
      .addCase(executeTransfer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bankSlice.reducer;
