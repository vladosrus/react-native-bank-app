import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Dashboard from '../screens/Dashboard';
import Transfer from '../screens/Transfer';
import TransactionHistory from '../screens/TransactionHistory';
import { COLORS } from '../constants/theme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabIcon = React.memo(({ routeName, focused }) => {
  let icon;

  if (routeName === 'Dashboard') {
    icon = focused ? '💳' : '🏦';
  } else if (routeName === 'History') {
    icon = focused ? '📋' : '⏳';
  }

  return <Text style={{ fontSize: 20 }}>{icon}</Text>;
});

const getScreenOptions =
  insets =>
  ({ route }) => ({
    headerShown: false,
    tabBarActiveTintColor: COLORS.primary,
    tabBarInactiveTintColor: COLORS.textSecondary,
    tabBarStyle: {
      backgroundColor: COLORS.card,
      borderTopWidth: 1,
      borderTopColor: COLORS.border,
      height: 60 + (insets.bottom > 0 ? insets.bottom : 10),
      paddingBottom: insets.bottom > 0 ? insets.bottom : 10,
      paddingTop: 8,
    },
    tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: '600',
    },
    tabBarIcon: ({ focused }) => (
      <TabIcon routeName={route.name} focused={focused} />
    ),
  });

export default function RootNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeTabs">
        <Stack.Screen name="HomeTabs" options={{ headerShown: false }}>
          {() => (
            <Tab.Navigator screenOptions={getScreenOptions(insets)}>
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
          )}
        </Stack.Screen>

        <Stack.Screen
          name="Transfer"
          component={Transfer}
          options={{ title: 'Новый перевод', headerBackTitleVisible: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
