import { useState, useEffect } from 'react';
import { Alert, Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { NotificationService } from '../services/notificationService';

export function useAppInit() {
  const [hasPermission, setHasPermission] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const initAppModules = async () => {
      try {
        // Инициализация пушей
        await NotificationService.init();
        await NotificationService.requestPermissions();

        // Проверка локации
        const locationPermission =
          Platform.OS === 'ios'
            ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
            : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

        const status = await check(locationPermission);

        if (status !== RESULTS.GRANTED) {
          const requestResult = await request(locationPermission);
          setHasPermission(requestResult === RESULTS.GRANTED);
        } else {
          setHasPermission(true);
        }
      } catch (err) {
        Alert.alert(
          'Ошибка инициализации',
          'Не удалось настроить системные модули',
        );
      } finally {
        setChecking(false);
      }
    };

    initAppModules();
  }, []);

  return { checking, hasPermission };
}
