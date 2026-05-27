import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '../services';

export const fetchDashboardData = createAsyncThunk(
  'bank/fetchDashboard',
  async (_, { rejectWithValue }) => {
    try {
      const [accounts, transactions] = await Promise.all([
        api.getAccounts(),
        api.getTransactions(),
      ]);
      return { accounts, transactions };
    } catch (error) {
      return rejectWithValue(error.message || 'Ошибка загрузки данных');
    }
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
      return rejectWithValue(error.message || 'Ошибка сервера');
    }
  },
);

const setLoading = state => {
  state.loading = true;
  state.error = null;
};

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
      .addCase(fetchDashboardData.pending, setLoading)
      .addCase(fetchDashboardData.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.accounts = payload.accounts;
        state.transactions = payload.transactions;
      })
      .addCase(fetchDashboardData.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      .addCase(executeTransfer.pending, setLoading)
      .addCase(executeTransfer.fulfilled, (state, { payload }) => {
        state.loading = false;
        const { fromAccount, toAccount, amount, transaction } = payload;

        state.accounts = state.accounts.map(account => {
          switch (account.id) {
            case fromAccount:
              return { ...account, balance: account.balance - amount };
            case toAccount:
              return { ...account, balance: account.balance + amount };
            default:
              return account;
          }
        });

        if (transaction) state.transactions.unshift(transaction);
      })
      .addCase(executeTransfer.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default bankSlice.reducer;
