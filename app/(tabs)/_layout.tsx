import { FontAwesome5 } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import { Platform, StyleSheet, View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
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
        },
        tabBarBackground: () =>
          Platform.OS === 'ios' ? (
            <BlurView tint="dark" intensity={60} style={StyleSheet.absoluteFill} />
          ) : (
            <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(30, 41, 59, 0.9)' }]} />
          ),
        tabBarIcon: ({ focused }) => {
          const icons: Record<string, string> = {
            home: 'home',
            trends: 'chart-line',
            devices: 'microchip',
            profile: 'user',
            health: 'heartbeat'
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
      <Tabs.Screen name="home" />
      <Tabs.Screen name="trends" />
      <Tabs.Screen name="devices" />
      <Tabs.Screen name="profile" />
      <Tabs.Screen name="health" />
    </Tabs>
  );
}
