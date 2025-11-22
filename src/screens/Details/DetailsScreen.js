import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  Platform,
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
import { addFavourite, removeFavourite } from '../../redux/slices/favouritesSlice';
import FadeInView from '../../components/FadeInView';
import ScalePressable from '../../components/ScalePressable';

const DetailsScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const { selectedItem } = useSelector((state) => state.items);
  const { favourites } = useSelector((state) => state.favourites);

  const iconScale = useSharedValue(0);
  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(30);

  useEffect(() => {
    iconScale.value = withDelay(200, withSpring(1, {
      damping: 12,
      stiffness: 250,
    }));
    titleOpacity.value = withDelay(400, withTiming(1, { duration: 500 }));
    titleTranslateY.value = withDelay(400, withSpring(0, {
      damping: 18,
      stiffness: 200,
    }));
  }, [selectedItem]);

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: iconScale.value },
    ],
  }));

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleTranslateY.value }],
  }));

  if (!selectedItem) {
    return (
      <View style={[styles(theme).container, styles(theme).centerContainer]}>
        <Text style={styles(theme).errorText}>No exercise selected</Text>
      </View>
    );
  }

  const isFavourite = favourites.some(
    (fav) => fav.name === selectedItem.name
  );

  const handleToggleFavourite = () => {
    if (isFavourite) {
      dispatch(removeFavourite(selectedItem));
      Alert.alert('Removed', 'Exercise removed from favourites');
    } else {
      dispatch(addFavourite(selectedItem));
      Alert.alert('Added', 'Exercise added to favourites');
    }
  };

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

  const stylesObj = styles(theme);

  return (
    <ScrollView style={stylesObj.container} contentContainerStyle={stylesObj.content}>
      <LinearGradient
        colors={[
          theme.colors.gradientStart + '20',
          theme.colors.gradientEnd + '10',
          'transparent',
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={stylesObj.header}
      >
        <Animated.View style={[stylesObj.iconContainer, iconAnimatedStyle]}>
          <Feather
            name={getMuscleIcon(selectedItem.muscle)}
            size={56}
            color={theme.colors.primary}
          />
        </Animated.View>
        <Animated.View style={titleAnimatedStyle}>
          <Text style={stylesObj.title}>{selectedItem.name || 'Exercise'}</Text>
        </Animated.View>
      </LinearGradient>

      <View style={stylesObj.section}>
        <View style={stylesObj.sectionHeader}>
          <Feather name="info" size={20} color={theme.colors.primary} />
          <Text style={stylesObj.sectionTitle}>Details</Text>
        </View>
        <View style={stylesObj.detailRow}>
          <Text style={stylesObj.detailLabel}>Type:</Text>
          <Text style={stylesObj.detailValue}>
            {selectedItem.type || 'N/A'}
          </Text>
        </View>
        <View style={stylesObj.detailRow}>
          <Text style={stylesObj.detailLabel}>Target Muscle:</Text>
          <Text style={stylesObj.detailValue}>
            {selectedItem.muscle || 'N/A'}
          </Text>
        </View>
        <View style={stylesObj.detailRow}>
          <Text style={stylesObj.detailLabel}>Equipment:</Text>
          <Text style={stylesObj.detailValue}>
            {selectedItem.equipment || 'N/A'}
          </Text>
        </View>
        <View style={stylesObj.detailRow}>
          <Text style={stylesObj.detailLabel}>Difficulty:</Text>
          <View
            style={[
              stylesObj.difficultyBadge,
              { backgroundColor: getDifficultyColor(selectedItem.difficulty) + '20' },
            ]}
          >
            <Text
              style={[
                stylesObj.difficultyText,
                { color: getDifficultyColor(selectedItem.difficulty) },
              ]}
            >
              {selectedItem.difficulty || 'N/A'}
            </Text>
          </View>
        </View>
      </View>

      {selectedItem.instructions && (
        <View style={stylesObj.section}>
          <View style={stylesObj.sectionHeader}>
            <Feather name="book-open" size={20} color={theme.colors.primary} />
            <Text style={stylesObj.sectionTitle}>Instructions</Text>
          </View>
          <Text style={stylesObj.instructions}>
            {selectedItem.instructions}
          </Text>
        </View>
      )}

      <FadeInView delay={600}>
        <ScalePressable onPress={handleToggleFavourite}>
        {isFavourite ? (
          <LinearGradient
            colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={stylesObj.favouriteButtonActive}
          >
            <Feather name="heart" size={22} color="#FFFFFF" />
            <Text style={stylesObj.favouriteButtonTextActive}>
              Remove from Favourites
            </Text>
          </LinearGradient>
        ) : (
          <View style={stylesObj.favouriteButton}>
            <Feather name="heart" size={22} color={theme.colors.primary} />
            <Text style={stylesObj.favouriteButtonText}>
              Add to Favourites
            </Text>
          </View>
        )}
        </ScalePressable>
      </FadeInView>
    </ScrollView>
  );
};

const styles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    centerContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorText: {
      color: theme.colors.error,
      fontSize: theme.typography.body.fontSize,
    },
    content: {
      padding: theme.spacing.lg,
    },
    header: {
      alignItems: 'center',
      marginBottom: theme.spacing.xl,
      paddingVertical: theme.spacing.xl,
      borderRadius: theme.borderRadius.xl,
      marginHorizontal: -theme.spacing.lg,
      marginTop: -theme.spacing.lg,
    },
    iconContainer: {
      width: 96,
      height: 96,
      borderRadius: 48,
      backgroundColor: theme.colors.primary + '15',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: theme.spacing.lg,
    },
    title: {
      fontSize: theme.typography.h1.fontSize + 4,
      fontWeight: '800',
      color: theme.colors.text,
      textAlign: 'center',
      letterSpacing: -0.8,
    },
    section: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.xl,
      ...theme.shadows.md,
      padding: theme.spacing.md,
      marginBottom: theme.spacing.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.md,
    },
    sectionTitle: {
      fontSize: theme.typography.h3.fontSize,
      fontWeight: theme.typography.h3.fontWeight,
      color: theme.colors.text,
      marginLeft: theme.spacing.sm,
    },
    detailRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: theme.spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    detailLabel: {
      fontSize: theme.typography.body.fontSize,
      color: theme.colors.textSecondary,
      fontWeight: '500',
    },
    detailValue: {
      fontSize: theme.typography.body.fontSize,
      color: theme.colors.text,
      fontWeight: '600',
      textTransform: 'capitalize',
    },
    difficultyBadge: {
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      borderRadius: theme.borderRadius.sm,
    },
    difficultyText: {
      fontSize: theme.typography.caption.fontSize,
      fontWeight: '600',
      textTransform: 'capitalize',
    },
    instructions: {
      fontSize: theme.typography.body.fontSize,
      color: theme.colors.text,
      lineHeight: 24,
    },
    favouriteButton: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.xl,
      padding: theme.spacing.lg,
      marginTop: theme.spacing.md,
      borderWidth: 2,
      borderColor: theme.colors.primary,
      ...theme.shadows.md,
    },
    favouriteButtonActive: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: theme.borderRadius.xl,
      padding: theme.spacing.lg,
      marginTop: theme.spacing.md,
      ...theme.shadows.lg,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    favouriteButtonText: {
      fontSize: theme.typography.body.fontSize + 1,
      fontWeight: '700',
      color: theme.colors.primary,
      marginLeft: theme.spacing.sm,
      letterSpacing: 0.3,
    },
    favouriteButtonTextActive: {
      fontSize: theme.typography.body.fontSize + 1,
      fontWeight: '700',
      color: '#FFFFFF',
      marginLeft: theme.spacing.sm,
      letterSpacing: 0.3,
    },
  });

export default DetailsScreen;

