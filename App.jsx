import { Provider } from 'react-redux';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import RootNavigator from '@/navigation/RootNavigator';
import { useAppInit } from '@/hooks/';
import { COLORS } from '@/constants/';
import { store } from '@/store';

const AppContent = () => {
  const { checking, hasPermission } = useAppInit();

  if (checking) {
    return (
      <View style={s.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (!hasPermission) {
    return (
      <SafeAreaView style={s.center}>
        <Text style={s.errorText}>
          Для работы прототипа приложения требуется доступ к геопозиции и
          уведомлениям.
        </Text>
      </SafeAreaView>
    );
  }

  return <RootNavigator />;
};

const App = () => (
  <Provider store={store}>
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  </Provider>
);

const s = StyleSheet.create({
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
    color: COLORS.danger,
    fontWeight: '500',
    lineHeight: 22,
  },
});

export default App;
