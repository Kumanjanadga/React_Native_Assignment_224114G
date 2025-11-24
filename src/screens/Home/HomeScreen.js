import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  StatusBar,
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
import { setItems, setSelectedItem, setLoading, setError } from '../../redux/slices/itemsSlice';
import { fetchExercises, getFallbackExercises } from '../../api/fitnessApi';
import ExerciseCard from '../../components/ExerciseCard';
import FadeInView from '../../components/FadeInView';

// UPDATED: Navy Blue Color Palette
const COLORS = {
  background: '#021024', // Deepest Navy
  cardBg: '#05263B',     // Lighter Navy for cards
  accent: '#D4FF00',     // Electric Lime (High contrast against Navy)
  textPrimary: '#FFFFFF',
  textSecondary: '#8DA9C4', // Soft Blue-Grey for subtitles
  surface: 'rgba(255, 255, 255, 0.08)',
};

const HomeScreen = ({ navigation }) => {
  const { theme } = useTheme(); 
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.items);
  const { user } = useSelector((state) => state.auth);
  const [refreshing, setRefreshing] = useState(false);
  
  // Animation Values
  const headerTranslateY = useSharedValue(-50);
  const headerOpacity = useSharedValue(0);
  const statsScale = useSharedValue(0.9);

  useEffect(() => {
    // Header Slide Down
    headerTranslateY.value = withSpring(0, { damping: 15 });
    headerOpacity.value = withTiming(1, { duration: 800 });
    
    // Stats Card Pop in
    statsScale.value = withDelay(300, withSpring(1, { damping: 12 }));
    
    loadExercises();
  }, []);

  const loadExercises = async () => {
    try {
      dispatch(setLoading(true));
      const exercises = await fetchExercises('biceps', 0);
      if (exercises && exercises.length > 0) {
        dispatch(setItems(exercises));
      } else {
        dispatch(setItems(getFallbackExercises()));
      }
    } catch (error) {
      console.error('Error loading exercises:', error);
      dispatch(setItems(getFallbackExercises()));
      dispatch(setError('Offline Mode Active'));
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

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: headerTranslateY.value }],
    opacity: headerOpacity.value,
  }));

  const statsAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: statsScale.value }],
    opacity: headerOpacity.value,
  }));

  // Render Header Component
  const renderHeader = () => (
    <View>
      <Animated.View style={[styles.headerContainer, headerAnimatedStyle]}>
        <View>
          <Text style={styles.dateText}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric' }).toUpperCase()}
          </Text>
          <Text style={styles.greeting}>
            Ready to train,{'\n'}
            <Text style={styles.userName}>{user?.name || 'Athlete'}?</Text>
          </Text>
        </View>
        <View style={styles.profileContainer}>
           <Feather name="user" size={24} color={COLORS.accent} />
        </View>
      </Animated.View>

      {/* Stats Dashboard Row */}
      <Animated.View style={[styles.statsRow, statsAnimatedStyle]}>
        <LinearGradient
          colors={[COLORS.cardBg, '#0f3854']} // Gradient using Navy tones
          style={styles.statsCard}
        >
          <View style={styles.iconBox}>
            <Feather name="flame" size={20} color={COLORS.accent} />
          </View>
          <Text style={styles.statsValue}>340</Text>
          <Text style={styles.statsLabel}>Kcal Burned</Text>
        </LinearGradient>

        <LinearGradient
          colors={[COLORS.cardBg, '#0f3854']}
          style={styles.statsCard}
        >
          <View style={[styles.iconBox, { backgroundColor: 'rgba(76, 201, 240, 0.15)' }]}>
            <Feather name="clock" size={20} color="#4CC9F0" />
          </View>
          <Text style={styles.statsValue}>45m</Text>
          <Text style={styles.statsLabel}>Duration</Text>
        </LinearGradient>
      </Animated.View>

      <Text style={styles.sectionTitle}>Today's Workout</Text>
    </View>
  );

  const styles = createStyles(theme);

  if (loading && items.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={COLORS.accent} />
        <Text style={styles.loadingText}>Preparing workout...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      
      {error && (
        <FadeInView>
          <View style={styles.errorBanner}>
            <Feather name="wifi-off" size={14} color={COLORS.background} />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        </FadeInView>
      )}

      <FlatList
        data={items}
        renderItem={({ item, index }) => (
          <ExerciseCard
            exercise={item}
            onPress={() => handleExercisePress(item)}
            index={index}
          />
        )}
        keyExtractor={(item, index) => item.name || `exercise-${index}`}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={renderHeader}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.accent}
            progressBackgroundColor={COLORS.cardBg}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Feather name="wind" size={48} color={COLORS.textSecondary} />
            <Text style={styles.emptyText}>No workouts found today.</Text>
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
      backgroundColor: COLORS.background,
    },
    centerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.background,
    },
    loadingText: {
      marginTop: 16,
      color: COLORS.textSecondary,
      fontSize: 14,
    },
    // Header Styles
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginTop: 20,
      marginBottom: 20,
    },
    dateText: {
      color: COLORS.accent,
      fontSize: 12,
      fontWeight: '700',
      letterSpacing: 1,
      marginBottom: 8,
    },
    greeting: {
      fontSize: 28,
      fontWeight: '300',
      color: COLORS.textPrimary,
      lineHeight: 36,
    },
    userName: {
      fontWeight: '800',
      color: COLORS.textPrimary,
    },
    profileContainer: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: COLORS.surface,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.1)',
    },
    
    // Stats Styles
    statsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 30,
    },
    statsCard: {
      flex: 0.48,
      padding: 16,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.05)',
    },
    iconBox: {
      width: 32,
      height: 32,
      borderRadius: 10,
      backgroundColor: 'rgba(212, 255, 0, 0.1)', 
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
    },
    statsValue: {
      color: COLORS.textPrimary,
      fontSize: 24,
      fontWeight: '700',
      marginBottom: 4,
    },
    statsLabel: {
      color: COLORS.textSecondary,
      fontSize: 12,
      fontWeight: '500',
    },

    // List & Section Styles
    sectionTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: COLORS.textPrimary,
      marginBottom: 16,
    },
    listContent: {
      paddingHorizontal: 20,
      paddingTop: 40,
      paddingBottom: 40,
    },
    
    // Utilities
    errorBanner: {
      backgroundColor: COLORS.accent,
      padding: 8,
      marginHorizontal: 20,
      marginTop: 10,
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    errorText: {
      color: '#000000', // Black text on Lime background is more readable
      fontWeight: '600',
      fontSize: 12,
    },
    emptyContainer: {
      alignItems: 'center',
      marginTop: 50,
    },
    emptyText: {
      color: COLORS.textSecondary,
      marginTop: 16,
    },
  });

export default HomeScreen;