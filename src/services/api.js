import { delay } from '@/utils';
import { NotificationService } from '@/services';
import { TRANSACTION_TYPES, DEFAULT_CURRENCY } from '@/constants';

let idCounter = 3;
const generateId = () => String(idCounter++);

let mockAccounts = [
  {
    id: '246794',
    name: 'Основной счет',
    balance: 5000.0,
    currency: DEFAULT_CURRENCY,
  },
  {
    id: '654321',
    name: 'Сберегательный вклад',
    balance: 15000.0,
    currency: DEFAULT_CURRENCY,
  },
  { id: '457786', name: 'Копилка', balance: 0, currency: DEFAULT_CURRENCY },
];
let mockTransactions = [
  {
    id: '1',
    date: '2026-05-20',
    amount: 500.0,
    type: TRANSACTION_TYPES.DEPOSIT,
    description: 'Пополнение счета',
  },
  {
    id: '2',
    date: '2026-05-19',
    amount: -200.0,
    type: 'transfer',
    description: 'Перевод средств на счет 654321',
  },
];

export const api = {
  async getAccounts() {
    await delay(800);
    return mockAccounts.map(account => ({ ...account }));
  },

  async getTransactions() {
    await delay(600);
    return mockTransactions.map(transaction => ({ ...transaction }));
  },

  async postTransfer({ fromAccount, toAccount, amount }) {
    await delay(1000);

    const transferAmount = Number(amount);
    const source = mockAccounts.find(({ id }) => id === fromAccount);

    if (!source || source.balance < transferAmount) {
      throw new Error('Недостаточно средств для перевода');
    }

    mockAccounts = mockAccounts.map(acc => {
      if (acc.id === fromAccount)
        return { ...acc, balance: acc.balance - transferAmount };
      if (acc.id === toAccount)
        return { ...acc, balance: acc.balance + transferAmount };
      return acc;
    });

    const newTransaction = {
      id: generateId(),
      date: new Date().toISOString(),
      amount: -transferAmount,
      type: TRANSACTION_TYPES.TRANSFER,
      description: `Перевод на счет ${toAccount}`,
    };

    mockTransactions = [newTransaction, ...mockTransactions];

    NotificationService.sendLocalNotification(
      'Списание средств',
      `Успешный перевод на сумму ${transferAmount} руб.`,
    );

    return { status: 'success', transaction: newTransaction };
  },
};
