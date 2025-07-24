import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Screens
import DashboardScreen from '../screens/DashboardScreen';
import DuelScreen from '../screens/DuelScreen';
import SkillsScreen from '../screens/SkillsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ChallengeDetailScreen from '../screens/ChallengeDetailScreen';
import RecordScreen from '../screens/RecordScreen';
import DuelResultScreen from '../screens/DuelResultScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import AuthScreen from '../screens/AuthScreen';

// Types
import {RootTabParamList, RootStackParamList} from '../types/navigation';

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName: string;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Duel') {
            iconName = 'sports-esports';
          } else if (route.name === 'Skills') {
            iconName = 'library-books';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          } else {
            iconName = 'circle';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6366f1',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={DashboardScreen} />
      <Tab.Screen name="Duel" component={DuelScreen} />
      <Tab.Screen name="Skills" component={SkillsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Auth"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen 
          name="ChallengeDetail" 
          component={ChallengeDetailScreen}
          options={{
            headerShown: true,
            title: 'Challenge',
          }}
        />
        <Stack.Screen 
          name="Record" 
          component={RecordScreen}
          options={{
            headerShown: true,
            title: 'Record Challenge',
          }}
        />
        <Stack.Screen 
          name="DuelResult" 
          component={DuelResultScreen}
          options={{
            headerShown: true,
            title: 'Duel Result',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 