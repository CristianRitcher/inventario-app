import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Productos',
          tabBarIcon: ({ color }) => <Ionicons name="clipboard-outline" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Acciones"
        options={{
          title: 'Acciones',
          tabBarIcon: ({ color }) => <Ionicons name="swap-horizontal-outline" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Registros"
        options={{
          title: 'Registros',
          tabBarIcon: ({ color }) => <Ionicons name="file-tray-stacked-outline" size={28} color={color} />,    
        }}
      />
      <Tabs.Screen
        name="Secciones"
        options={{
          title: 'Secciones',
          tabBarIcon: ({ color }) => <Ionicons name="grid-outline" size={28} color={color} />,  
        }}
      />
      <Tabs.Screen
        name="Perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
