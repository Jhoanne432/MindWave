// app/TabNavigator.tsx
import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

const Tab = createBottomTabNavigator();

const Placeholder = () => <View style={{ flex: 1, backgroundColor: '#0f172a' }} />;

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: {
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: 'rgba(30, 41, 59, 0.9)',
          borderRadius: 30,
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
          borderTopWidth: 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 10,
        },
        tabBarBackground: () =>
          Platform.OS === 'ios' ? (
            <BlurView tint="dark" intensity={60} style={StyleSheet.absoluteFill} />
          ) : (
            <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(30, 41, 59, 0.9)' }]} />
          ),
        tabBarIcon: ({ focused }) => {
          const icons: Record<string, string> = {
            Home: 'home',
            Trends: 'chart-line',
            Devices: 'microchip',
            Profile: 'user',
          };
          return (
            <FontAwesome5
              name={icons[route.name] || 'circle'}
              size={18}
              color={focused ? '#fff' : '#9ca3af'}
              style={{ marginBottom: 4 }}
            />
          );
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#9ca3af',
      })}
    >
      <Tab.Screen name="Home" component={Placeholder} />
      <Tab.Screen name="Trends" component={Placeholder} />
      <Tab.Screen name="Devices" component={Placeholder} />
      <Tab.Screen name="Profile" component={Placeholder} />
    </Tab.Navigator>
  );
}
