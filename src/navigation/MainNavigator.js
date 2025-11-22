import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { initializeFavourites } from '../redux/slices/favouritesSlice';
import HomeScreen from '../screens/Home/HomeScreen';
import DetailsScreen from '../screens/Details/DetailsScreen';
import FavouritesScreen from '../screens/Favourites/FavouritesScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          title: 'Exercise Details',
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

const FavouritesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FavouritesMain"
        component={FavouritesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          title: 'Exercise Details',
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeFavourites());
  }, [dispatch]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Favourites') {
            iconName = 'heart';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          }

          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopWidth: 1.5,
          borderTopColor: theme.colors.borderLight,
          height: 65,
          paddingBottom: 8,
          paddingTop: 8,
          ...theme.shadows.lg,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          letterSpacing: 0.3,
        },
        headerStyle: {
          backgroundColor: theme.colors.background,
          borderBottomWidth: 1.5,
          borderBottomColor: theme.colors.borderLight,
          ...theme.shadows.sm,
        },
        headerTintColor: theme.colors.text,
        headerTitleStyle: {
          fontWeight: '800',
          fontSize: 20,
          letterSpacing: -0.3,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Favourites"
        component={FavouritesStack}
        options={{ headerShown: false, title: 'My Favourites' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;

