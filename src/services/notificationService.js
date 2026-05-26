import notifee, { AndroidImportance } from '@notifee/react-native';
import { Platform } from 'react-native';

export const NotificationService = {
  async init() {
    // Для Android создаем обязательный канал уведомлений (требование Android 8+)
    if (Platform.OS === 'android') {
      await notifee.createChannel({
        id: 'bank-operations',
        name: 'Банковские операции',
        importance: AndroidImportance.HIGH,
      });
    }
  },

  async requestPermissions() {
    // Запрос разрешений встроенными средствами Notifee
    if (Platform.OS === 'ios') {
      const settings = await notifee.requestPermission();
      return settings.authorizationStatus >= 1; // 1 = Authorized
    }

    // На Android 13+ разрешения запрашиваются через систему, Notifee делает это под капотом
    await notifee.requestPermission();
    return true;
  },

  async sendLocalNotification(title, body) {
    // Отображаем пуш-уведомление
    await notifee.displayNotification({
      title: title,
      body: body,
      android: {
        channelId: 'bank-operations',
        importance: AndroidImportance.HIGH,
        // Для финтех-пушей лучше ставить приоритет повыше, чтобы всплывали на экране
        pressAction: {
          id: 'default',
        },
      },
    });
  },
};
