import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginView from './views/Login';
import DashboardView from './views/Dashboard';
import ProfileView from './views/Profile';
import PaymentsView from './views/Payments';
import ChatView from './views/Chat';
import TasksView from './views/Tasks';

const Stack = createStackNavigator();

export default function App() {
   return (
      <NavigationContainer>
         <Stack.Navigator headerMode="none">
            <Stack.Screen name="Login" component={LoginView} />
            <Stack.Screen name="Dashboard" component={DashboardView} />
            <Stack.Screen name="Profile" component={ProfileView} />
            <Stack.Screen name="Payments" component={PaymentsView} />
            <Stack.Screen name="Chat" component={ChatView} />
            <Stack.Screen name="Tasks" component={TasksView} />
         </Stack.Navigator>
      </NavigationContainer>
   );
}
