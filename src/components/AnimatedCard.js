import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { useTheme } from '../theme/ThemeContext';

const AnimatedCard = ({ children, style, index = 0, onPress }) => {
  const { theme } = useTheme();
  const translateY = useSharedValue(50);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);
  const rotateX = useSharedValue(15);
  const rotateY = useSharedValue(-15);

  useEffect(() => {
    const delay = index * 100;
    
    setTimeout(() => {
      translateY.value = withSpring(0, {
        damping: 15,
        stiffness: 150,
      });
      opacity.value = withTiming(1, { duration: 400 });
      scale.value = withSpring(1, {
        damping: 12,
        stiffness: 200,
      });
      rotateX.value = withSpring(0, {
        damping: 15,
        stiffness: 150,
      });
      rotateY.value = withSpring(0, {
        damping: 15,
        stiffness: 150,
      });
    }, delay);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        { translateY: translateY.value },
        { scale: scale.value },
        {
          rotateX: `${rotateX.value}deg`,
        },
        {
          rotateY: `${rotateY.value}deg`,
        },
        {
          perspective: 1000,
        },
      ],
    };
  });

  const pressStyle = useAnimatedStyle(() => {
    const pressedScale = onPress ? 0.98 : 1;
    return {
      transform: [{ scale: pressedScale }],
    };
  });

  return (
    <Animated.View
      style={[
        styles(theme).card,
        style,
        animatedStyle,
        pressStyle,
      ]}
    >
      {children}
    </Animated.View>
  );
};

const styles = (theme) =>
  StyleSheet.create({
    card: {
      transform: [{ perspective: 1000 }],
    },
  });

export default AnimatedCard;

