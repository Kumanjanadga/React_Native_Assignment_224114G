import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import ScalePressable from './ScalePressable';

const ExerciseCard = ({ exercise, onPress, index = 0 }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  
  const translateY = useSharedValue(60);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.85);
  const rotateX = useSharedValue(20);
  const rotateY = useSharedValue(-10);

  useEffect(() => {
    const delay = index * 80;
    
    setTimeout(() => {
      translateY.value = withSpring(0, {
        damping: 18,
        stiffness: 180,
      });
      opacity.value = withTiming(1, { duration: 500 });
      scale.value = withSpring(1, {
        damping: 15,
        stiffness: 200,
      });
      rotateX.value = withSpring(0, {
        damping: 18,
        stiffness: 180,
      });
      rotateY.value = withSpring(0, {
        damping: 18,
        stiffness: 180,
      });
    }, delay);
  }, [index]);

  const getMuscleIcon = (muscle) => {
    const muscleLower = muscle?.toLowerCase() || '';
    if (muscleLower.includes('chest')) return 'target';
    if (muscleLower.includes('leg') || muscleLower.includes('quad')) return 'activity';
    if (muscleLower.includes('arm') || muscleLower.includes('bicep')) return 'zap';
    if (muscleLower.includes('back')) return 'layers';
    if (muscleLower.includes('ab')) return 'circle';
    return 'activity';
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner':
        return theme.colors.success;
      case 'intermediate':
        return theme.colors.warning;
      case 'expert':
        return theme.colors.error;
      default:
        return theme.colors.textSecondary;
    }
  };

  const cardAnimatedStyle = useAnimatedStyle(() => {
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

  return (
    <ScalePressable
      style={[styles.card, cardAnimatedStyle]}
      onPress={onPress}
      scaleValue={0.97}
    >
      <View style={styles.iconContainer}>
        <Feather
          name={getMuscleIcon(exercise.muscle)}
          size={32}
          color={theme.colors.primary}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {exercise.name || 'Exercise'}
        </Text>
        <Text style={styles.muscle} numberOfLines={1}>
          {exercise.muscle || exercise.type || 'General'}
        </Text>
        <View style={styles.footer}>
          <View
            style={[
              styles.difficultyBadge,
              { backgroundColor: getDifficultyColor(exercise.difficulty) + '15' },
            ]}
          >
            <View
              style={[
                styles.difficultyDot,
                { backgroundColor: getDifficultyColor(exercise.difficulty) },
              ]}
            />
            <Text
              style={[
                styles.difficultyText,
                { color: getDifficultyColor(exercise.difficulty) },
              ]}
            >
              {exercise.difficulty || 'N/A'}
            </Text>
          </View>
          <View style={styles.arrowContainer}>
            <Feather
              name="chevron-right"
              size={18}
              color={theme.colors.primary}
            />
          </View>
        </View>
      </View>
    </ScalePressable>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    card: {
      flexDirection: 'row',
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.xl,
      padding: theme.spacing.lg,
      marginBottom: theme.spacing.md,
      ...theme.shadows.lg,
      borderWidth: 1.5,
      borderColor: theme.colors.borderLight,
      ...Platform.select({
        ios: {
          shadowColor: theme.colors.primary,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
        },
        android: {
          elevation: 6,
        },
      }),
    },
    iconContainer: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: theme.colors.primary + '12',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: theme.spacing.md,
    },
    content: {
      flex: 1,
      justifyContent: 'space-between',
    },
    title: {
      fontSize: theme.typography.h3.fontSize,
      fontWeight: theme.typography.h3.fontWeight,
      color: theme.colors.text,
      marginBottom: theme.spacing.xs,
      letterSpacing: theme.typography.h3.letterSpacing,
    },
    muscle: {
      fontSize: theme.typography.body.fontSize,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.md,
      textTransform: 'capitalize',
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    difficultyBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: 6,
      borderRadius: theme.borderRadius.round,
    },
    difficultyDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      marginRight: theme.spacing.xs,
    },
    difficultyText: {
      fontSize: theme.typography.caption.fontSize,
      fontWeight: '600',
      textTransform: 'capitalize',
      letterSpacing: 0.3,
    },
    arrowContainer: {
      width: 36,
      height: 36,
      borderRadius: theme.borderRadius.round,
      backgroundColor: theme.colors.primary + '12',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.primary + '20',
      ...theme.shadows.sm,
    },
  });

export default ExerciseCard;

