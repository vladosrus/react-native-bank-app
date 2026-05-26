import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { store } from './src/store';
import RootNavigator from './src/navigation/RootNavigator';
import { useAppInit } from './src/hooks/useAppInit';
import { COLORS } from './src/constants/theme';

const AppContent = () => {
  const { checking, hasPermission } = useAppInit();

  if (checking) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (!hasPermission) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.errorText}>
          Для работы прототипа приложения требуется доступ к геопозиции и
          уведомлениям.
        </Text>
      </SafeAreaView>
    );
  }

  return <RootNavigator />;
};

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppContent />
      </SafeAreaProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: COLORS.background,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    color: COLORS.error,
    fontWeight: '500',
    lineHeight: 22,
  },
});

export default App;
