import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import { logout } from '../../redux/slices/authSlice';
import { clearAuthState } from '../../utils/storage';
import FadeInView from '../../components/FadeInView';
import ScalePressable from '../../components/ScalePressable';

const ProfileScreen = () => {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const avatarScale = useSharedValue(0);
  const nameOpacity = useSharedValue(0);
  const nameTranslateY = useSharedValue(20);

  useEffect(() => {
    avatarScale.value = withDelay(200, withSpring(1, {
      damping: 12,
      stiffness: 250,
    }));
    nameOpacity.value = withDelay(400, withTiming(1, { duration: 500 }));
    nameTranslateY.value = withDelay(400, withSpring(0, {
      damping: 18,
      stiffness: 200,
    }));
  }, []);

  const avatarAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: avatarScale.value },
    ],
  }));

  const nameAnimatedStyle = useAnimatedStyle(() => ({
    opacity: nameOpacity.value,
    transform: [{ translateY: nameTranslateY.value }],
  }));

  const handleLogout = async () => {
    console.log('Logout button pressed');
    
    if (Platform.OS === 'web') {
      const confirmed = window.confirm('Are you sure you want to logout?');
      if (!confirmed) {
        console.log('Logout cancelled');
        return;
      }
    } else {
      Alert.alert(
        'Logout',
        'Are you sure you want to logout?',
        [
          { 
            text: 'Cancel', 
            style: 'cancel',
            onPress: () => console.log('Logout cancelled')
          },
          {
            text: 'Logout',
            style: 'destructive',
            onPress: () => performLogout(),
          },
        ],
        { cancelable: true }
      );
      return;
    }
    
    performLogout();
  };

  const performLogout = async () => {
    console.log('Logout confirmed, starting logout process...');
    try {
      dispatch(logout());
      console.log('Logout action dispatched, isAuthenticated should be false now');
      await clearAuthState();
      console.log('Auth state cleared from storage');
    } catch (error) {
      console.error('Logout failed:', error);
      dispatch(logout());
    }
  };

  const stylesObj = styles(theme);

  return (
    <ScrollView style={stylesObj.container} contentContainerStyle={stylesObj.content}>
      <LinearGradient
        colors={[
          theme.colors.gradientStart + '25',
          theme.colors.gradientEnd + '15',
          'transparent',
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={stylesObj.header}
      >
        <Animated.View style={[stylesObj.avatarContainer, avatarAnimatedStyle]}>
          <Feather name="user" size={56} color={theme.colors.primary} />
        </Animated.View>
        <Animated.View style={nameAnimatedStyle}>
          <Text style={stylesObj.name}>{user?.name || 'User'}</Text>
          <FadeInView delay={500}>
            <Text style={stylesObj.email}>{user?.email || 'user@example.com'}</Text>
          </FadeInView>
        </Animated.View>
      </LinearGradient>

      <FadeInView delay={600}>
        <View style={stylesObj.section}>
          <ScalePressable onPress={toggleTheme}>
            <View style={stylesObj.menuItem}>
          <View style={stylesObj.menuItemLeft}>
            <Feather
              name={isDarkMode ? 'sun' : 'moon'}
              size={24}
              color={theme.colors.primary}
            />
            <Text style={stylesObj.menuItemText}>
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </Text>
          </View>
              <Feather
                name="chevron-right"
                size={20}
                color={theme.colors.textSecondary}
              />
            </View>
          </ScalePressable>

          <View style={stylesObj.divider} />

          <ScalePressable>
            <View style={stylesObj.menuItem}>
              <View style={stylesObj.menuItemLeft}>
                <Feather name="settings" size={24} color={theme.colors.primary} />
                <Text style={stylesObj.menuItemText}>Settings</Text>
              </View>
              <Feather
                name="chevron-right"
                size={20}
                color={theme.colors.textSecondary}
              />
            </View>
          </ScalePressable>

          <View style={stylesObj.divider} />

          <ScalePressable>
            <View style={stylesObj.menuItem}>
              <View style={stylesObj.menuItemLeft}>
                <Feather name="help-circle" size={24} color={theme.colors.primary} />
                <Text style={stylesObj.menuItemText}>Help & Support</Text>
              </View>
              <Feather
                name="chevron-right"
                size={20}
                color={theme.colors.textSecondary}
              />
            </View>
          </ScalePressable>
        </View>
      </FadeInView>

      <FadeInView delay={700}>
        <TouchableOpacity 
          onPress={handleLogout}
          activeOpacity={0.8}
          style={stylesObj.logoutButton}
        >
          <Feather name="log-out" size={20} color={theme.colors.error} />
          <Text style={stylesObj.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </FadeInView>

      <View style={stylesObj.footer}>
        <Text style={stylesObj.footerText}>FitBuddy v1.0.0</Text>
        <Text style={stylesObj.footerText}>Health & Wellness Tracker</Text>
      </View>
    </ScrollView>
  );
};

const styles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      padding: theme.spacing.lg,
    },
    header: {
      alignItems: 'center',
      marginBottom: theme.spacing.xl,
      paddingTop: theme.spacing.xl,
      paddingBottom: theme.spacing.lg,
      borderRadius: theme.borderRadius.xl,
      marginHorizontal: -theme.spacing.lg,
      marginTop: -theme.spacing.lg,
    },
    avatarContainer: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: theme.colors.primary + '15',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: theme.spacing.md,
    },
    name: {
      fontSize: theme.typography.h2.fontSize + 2,
      fontWeight: '800',
      color: theme.colors.text,
      marginBottom: theme.spacing.xs,
      letterSpacing: -0.5,
    },
    email: {
      fontSize: theme.typography.body.fontSize,
      color: theme.colors.textSecondary,
    },
    section: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.xl,
      marginBottom: theme.spacing.lg,
      borderWidth: 1.5,
      borderColor: theme.colors.borderLight,
      ...theme.shadows.md,
      overflow: 'hidden',
    },
    menuItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: theme.spacing.lg,
      backgroundColor: 'transparent',
    },
    menuItemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    menuItemText: {
      fontSize: theme.typography.body.fontSize + 1,
      color: theme.colors.text,
      marginLeft: theme.spacing.md,
      fontWeight: '600',
      letterSpacing: 0.2,
    },
    divider: {
      height: 1,
      backgroundColor: theme.colors.border,
      marginLeft: theme.spacing.md,
    },
    logoutButton: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.error + '12',
      borderRadius: theme.borderRadius.xl,
      padding: theme.spacing.lg,
      marginBottom: theme.spacing.xl,
      borderWidth: 2,
      borderColor: theme.colors.error + '30',
      ...theme.shadows.md,
    },
    logoutButtonText: {
      fontSize: theme.typography.body.fontSize + 1,
      fontWeight: '700',
      color: theme.colors.error,
      marginLeft: theme.spacing.sm,
      letterSpacing: 0.3,
    },
    footer: {
      alignItems: 'center',
      paddingVertical: theme.spacing.lg,
    },
    footerText: {
      fontSize: theme.typography.caption.fontSize,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.xs,
    },
  });

export default ProfileScreen;

