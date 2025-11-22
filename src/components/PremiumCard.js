import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../theme/ThemeContext';

const PremiumCard = ({ children, style, variant = 'default' }) => {
  const { theme } = useTheme();
  const stylesObj = createStyles(theme);

  if (variant === 'glass') {
    return (
      <View
        style={[
          stylesObj.glassCard,
          style,
          Platform.OS === 'ios' && stylesObj.glassIOS,
        ]}
      >
        {children}
      </View>
    );
  }

  if (variant === 'gradient') {
    return (
      <LinearGradient
        colors={[theme.colors.gradientStart + '15', theme.colors.gradientEnd + '08']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[stylesObj.gradientCard, style]}
      >
        {children}
      </LinearGradient>
    );
  }

  return (
    <View style={[stylesObj.card, style]}>
      {children}
    </View>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.xl,
      ...theme.shadows.lg,
      borderWidth: 1,
      borderColor: theme.colors.borderLight,
      overflow: 'hidden',
    },
    glassCard: {
      backgroundColor: theme.colors.glass,
      borderRadius: theme.borderRadius.xl,
      borderWidth: 1,
      borderColor: theme.colors.glassBorder,
      ...theme.shadows.lg,
      overflow: 'hidden',
    },
    glassIOS: {
      backgroundColor: theme.colors.glass + 'CC',
    },
    gradientCard: {
      borderRadius: theme.borderRadius.xl,
      ...theme.shadows.md,
      borderWidth: 1,
      borderColor: theme.colors.primary + '20',
      overflow: 'hidden',
    },
  });

export default PremiumCard;

