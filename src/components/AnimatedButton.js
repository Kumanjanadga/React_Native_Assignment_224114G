import React from 'react';
import { TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  interpolate,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const AnimatedButton = ({
  children,
  onPress,
  style,
  gradient = true,
  colors,
  icon,
  iconPosition = 'right',
  disabled = false,
  ...props
}) => {
  const { theme } = useTheme();
  const scale = useSharedValue(1);
  const rotateZ = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { rotateZ: `${rotateZ.value}deg` },
      ],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.95, {
      damping: 15,
      stiffness: 300,
    });
    rotateZ.value = withSequence(
      withSpring(-2, { damping: 10 }),
      withSpring(2, { damping: 10 }),
      withSpring(0, { damping: 10 })
    );
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {
      damping: 15,
      stiffness: 300,
    });
    rotateZ.value = withSpring(0);
  };

  const buttonColors = colors || [
    theme.colors.gradientStart,
    theme.colors.gradientEnd,
    theme.colors.gradientAccent,
  ];

  const content = (
    <Animated.View style={[styles(theme).buttonContent, animatedStyle]}>
      {icon && iconPosition === 'left' && (
        <Feather name={icon} size={20} color="#FFFFFF" style={styles(theme).iconLeft} />
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <Feather name={icon} size={20} color="#FFFFFF" style={styles(theme).iconRight} />
      )}
    </Animated.View>
  );

  if (gradient) {
    return (
      <AnimatedTouchable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        activeOpacity={1}
        {...props}
      >
        <LinearGradient
          colors={buttonColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles(theme).button, style, disabled && styles(theme).buttonDisabled]}
        >
          {content}
        </LinearGradient>
      </AnimatedTouchable>
    );
  }

  return (
    <AnimatedTouchable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      activeOpacity={1}
      style={[styles(theme).button, style, disabled && styles(theme).buttonDisabled]}
      {...props}
    >
      {content}
    </AnimatedTouchable>
  );
};

const styles = (theme) =>
  StyleSheet.create({
    button: {
      borderRadius: theme.borderRadius.xl,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.2)',
      ...Platform.select({
        ios: theme.shadows.lg,
        android: theme.shadows.lg,
        web: {
          boxShadow: `0 ${theme.shadows.lg.shadowOffset.height}px ${theme.shadows.lg.shadowRadius}px rgba(0, 0, 0, ${theme.shadows.lg.shadowOpacity})`,
        },
      }),
    },
    buttonContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonDisabled: {
      opacity: 0.6,
    },
    iconLeft: {
      marginRight: theme.spacing.sm,
    },
    iconRight: {
      marginLeft: theme.spacing.sm,
    },
  });

export default AnimatedButton;

