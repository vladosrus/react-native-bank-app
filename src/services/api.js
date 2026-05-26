import { delay } from '../utils/delay';
import { NotificationService } from './notificationService';

// Имитация базы данных на сервере
let mockAccounts = [
  { id: '123456', name: 'Основной счет', balance: 5000.0, currency: '₽' },
  {
    id: '654321',
    name: 'Сберегательный вклад',
    balance: 15000.0,
    currency: '₽',
  },
  {
    id: '000000',
    name: 'Копилка',
    balance: 0,
    currency: '₽',
  },
];

let mockTransactions = [
  {
    id: '1',
    date: '2026-05-20',
    amount: 500.0,
    type: 'deposit',
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
    return mockAccounts.map(acc => ({ ...acc }));
  },

  async getTransactions() {
    await delay(600);
    return mockTransactions.map(t => ({ ...t }));
  },

  async postTransfer({ fromAccount, toAccount, amount }) {
    await delay(1000);

    const source = mockAccounts.find(a => a.id === fromAccount);

    const transferAmount = Number(amount);

    if (!source || source.balance < transferAmount) {
      throw new Error('Недостаточно средств для перевода');
    }

    // Вместо мутации объектов, полностью заменяем их в mock-базе данных на новые копии
    mockAccounts = mockAccounts.map(acc => {
      if (acc.id === fromAccount) {
        return { ...acc, balance: acc.balance - transferAmount };
      }
      if (acc.id === toAccount) {
        return { ...acc, balance: acc.balance + transferAmount };
      }
      return acc;
    });

    const newTransaction = {
      id: Math.random().toString(),
      date: new Date().toISOString(),
      amount: -transferAmount,
      type: 'transfer',
      description: `Перевод на счет ${toAccount}`,
    };

    mockTransactions = [newTransaction, ...mockTransactions];

    NotificationService.sendLocalNotification(
      'Списание средств',
      `Успешный перевод на сумму ${transferAmount} ₽`,
    );

    return { status: 'success', transaction: newTransaction };
  },
};
