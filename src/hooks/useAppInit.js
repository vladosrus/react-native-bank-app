import { useState, useEffect } from 'react';
import { Alert, Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

import { NotificationService } from '@/services';

const LOCATION_PERMISSION = Platform.select({
  ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
});

export function useAppInit() {
  const [checking, setChecking] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    const initAppModules = async () => {
      try {
        await NotificationService.init();
        await NotificationService.requestPermissions();

        const status = await check(LOCATION_PERMISSION);

        if (status !== RESULTS.GRANTED) {
          const result = await request(LOCATION_PERMISSION);
          setHasPermission(result === RESULTS.GRANTED);
        } else {
          setHasPermission(true);
        }
      } catch {
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
