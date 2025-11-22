import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
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
import { useDispatch, useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import { setItems, setSelectedItem, setLoading, setError } from '../../redux/slices/itemsSlice';
import { fetchExercises, getFallbackExercises } from '../../api/fitnessApi';
import ExerciseCard from '../../components/ExerciseCard';
import FadeInView from '../../components/FadeInView';

const HomeScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.items);
  const { user } = useSelector((state) => state.auth);
  const [refreshing, setRefreshing] = useState(false);
  
  const headerTranslateY = useSharedValue(-100);
  const headerOpacity = useSharedValue(0);
  const iconScale = useSharedValue(0);

  useEffect(() => {
    headerTranslateY.value = withSpring(0, {
      damping: 20,
      stiffness: 200,
    });
    headerOpacity.value = withTiming(1, { duration: 600 });
    iconScale.value = withSpring(1, {
      damping: 12,
      stiffness: 200,
    });
  }, []);

  useEffect(() => {
    loadExercises();
  }, []);

  const loadExercises = async () => {
    try {
      dispatch(setLoading(true));
      const exercises = await fetchExercises('biceps', 0);
      if (exercises && exercises.length > 0) {
        dispatch(setItems(exercises));
      } else {
        const fallbackExercises = getFallbackExercises();
        dispatch(setItems(fallbackExercises));
      }
    } catch (error) {
      console.error('Error loading exercises:', error);
      const fallbackExercises = getFallbackExercises();
      dispatch(setItems(fallbackExercises));
      dispatch(setError('Using offline exercises'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadExercises();
    setRefreshing(false);
  };

  const handleExercisePress = (item) => {
    dispatch(setSelectedItem(item));
    navigation.navigate('Details');
  };

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: headerTranslateY.value }],
      opacity: headerOpacity.value,
    };
  });

  const iconAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: iconScale.value },
      ],
    };
  });

  const renderExerciseCard = ({ item, index }) => (
    <ExerciseCard
      exercise={item}
      onPress={() => handleExercisePress(item)}
      index={index}
    />
  );

  const styles = createStyles(theme);

  if (loading && items.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>Loading exercises...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Animated.View style={headerAnimatedStyle}>
        <LinearGradient
          colors={[
            theme.colors.gradientStart,
            theme.colors.gradientEnd,
            theme.colors.gradientAccent,
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <View style={styles.headerOverlay} />
          <View style={styles.headerContent}>
            <FadeInView delay={200} style={styles.greetingContainer}>
              <Text style={styles.greeting}>Hello, {user?.name || 'User'}! 👋</Text>
              <Text style={styles.subtitle}>Let's get fit today</Text>
            </FadeInView>
            <Animated.View style={[styles.iconCircle, iconAnimatedStyle]}>
              <Feather name="activity" size={32} color="#FFFFFF" />
            </Animated.View>
          </View>
        </LinearGradient>
      </Animated.View>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <FlatList
        data={items}
        renderItem={renderExerciseCard}
        keyExtractor={(item, index) => item.name || `exercise-${index}`}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.primary}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Feather name="inbox" size={64} color={theme.colors.textSecondary} />
            <Text style={styles.emptyText}>No exercises found</Text>
          </View>
        }
      />
    </View>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    centerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
    loadingText: {
      marginTop: theme.spacing.md,
      color: theme.colors.textSecondary,
      fontSize: theme.typography.body.fontSize,
    },
    header: {
      paddingTop: theme.spacing.xl + 12,
      paddingBottom: theme.spacing.xl + 8,
      paddingHorizontal: theme.spacing.lg,
      ...theme.shadows.xl,
      position: 'relative',
      overflow: 'hidden',
    },
    headerOverlay: {
      position: 'absolute',
      top: -50,
      right: -50,
      width: 200,
      height: 200,
      borderRadius: 100,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      ...theme.shadows.glow,
    },
    headerContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 1,
    },
    greetingContainer: {
      flex: 1,
    },
    iconCircle: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    greeting: {
      fontSize: 32,
      fontWeight: '800',
      color: '#FFFFFF',
      letterSpacing: -0.8,
      marginBottom: theme.spacing.xs,
      textShadowColor: 'rgba(0, 0, 0, 0.2)',
      textShadowOffset: { width: 0, height: 2 },
      textShadowRadius: 4,
    },
    subtitle: {
      fontSize: theme.typography.body.fontSize + 1,
      color: 'rgba(255, 255, 255, 0.95)',
      fontWeight: '600',
      letterSpacing: 0.2,
    },
    errorContainer: {
      backgroundColor: theme.colors.error + '20',
      padding: theme.spacing.md,
      margin: theme.spacing.md,
      borderRadius: theme.borderRadius.md,
    },
    errorText: {
      color: theme.colors.error,
      fontSize: theme.typography.caption.fontSize,
    },
    listContent: {
      padding: theme.spacing.md,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: theme.spacing.xl * 2,
    },
    emptyText: {
      marginTop: theme.spacing.md,
      color: theme.colors.textSecondary,
      fontSize: theme.typography.body.fontSize,
    },
  });

export default HomeScreen;

