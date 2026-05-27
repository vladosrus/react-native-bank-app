import { Platform } from 'react-native';
import notifee, { AndroidImportance } from '@notifee/react-native';

const CHANNEL_ID = 'bank-operations';

export const NotificationService = {
  async init() {
    if (Platform.OS === 'android') {
      await notifee.createChannel({
        id: CHANNEL_ID,
        name: 'Банковские операции',
        importance: AndroidImportance.HIGH,
      });
    }
  },

  async requestPermissions() {
    if (Platform.OS === 'ios') {
      const settings = await notifee.requestPermission();
      return settings.authorizationStatus >= 1;
    }

    await notifee.requestPermission();

    return true;
  },

  async sendLocalNotification(title, body) {
    await notifee.displayNotification({
      title,
      body,
      android: {
        channelId: CHANNEL_ID,
        importance: AndroidImportance.HIGH,
        pressAction: { id: 'default' },
      },
    });
  },
};
