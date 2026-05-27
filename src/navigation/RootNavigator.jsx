import { useMemo, memo } from 'react';
import { Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TransactionHistory from '@/screens/TransactionHistory';
import Dashboard from '@/screens/Dashboard';
import Transfer from '@/screens/Transfer';

import { COLORS, FONT_SIZE, FONT_WEIGHT } from '@/constants';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TAB_ICONS = {
  Dashboard: { focus: '💳', idle: '🏦' },
  History: { focus: '📋', idle: '⏳' },
};

const TabIcon = memo(({ routeName, focused }) => {
  const { focus, idle } = TAB_ICONS[routeName];

  return <Text style={styles.icon}>{focused ? focus : idle}</Text>;
});

const buildTabScreenOptions =
  insets =>
  ({ route }) => ({
    headerShown: false,
    tabBarActiveTintColor: COLORS.primary,
    tabBarInactiveTintColor: COLORS.textSecondary,
    tabBarStyle: {
      backgroundColor: COLORS.white,
      borderTopWidth: 1,
      borderTopColor: COLORS.separator,
      height: 60 + (insets.bottom > 0 ? insets.bottom : 10),
      paddingBottom: insets.bottom > 0 ? insets.bottom : 10,
      paddingTop: 8,
    },
    tabBarLabelStyle: {
      fontSize: FONT_SIZE.xs,
      fontWeight: FONT_WEIGHT.semibold,
    },
    tabBarIcon: ({ focused }) => (
      <TabIcon routeName={route.name} focused={focused} />
    ),
  });

const HomeTabs = () => {
  const insets = useSafeAreaInsets();
  const screenOptions = useMemo(() => buildTabScreenOptions(insets), [insets]);

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ title: 'Главная' }}
      />
      <Tab.Screen
        name="History"
        component={TransactionHistory}
        options={{ title: 'История' }}
      />
    </Tab.Navigator>
  );
};

const RootNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="HomeTabs">
      <Stack.Screen
        name="HomeTabs"
        component={HomeTabs}
        options={{ title: 'Главная', headerShown: false }}
      />
      <Stack.Screen
        name="Transfer"
        component={Transfer}
        options={{ title: 'Новый перевод', headerBackTitleVisible: false }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

const styles = StyleSheet.create({ icon: { fontSize: FONT_SIZE.xl } });

export default RootNavigator;
