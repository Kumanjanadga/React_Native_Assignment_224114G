import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import { setSelectedItem } from '../../redux/slices/itemsSlice';
import { removeFavourite } from '../../redux/slices/favouritesSlice';
import ExerciseCard from '../../components/ExerciseCard';

const FavouritesScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const { favourites } = useSelector((state) => state.favourites);

  const handleExercisePress = (item) => {
    dispatch(setSelectedItem(item));
    navigation.navigate('Details');
  };

  const handleRemoveFavourite = (item) => {
    Alert.alert(
      'Remove Favourite',
      `Remove ${item.name} from favourites?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => dispatch(removeFavourite(item)),
        },
      ]
    );
  };

  const renderExerciseCard = ({ item }) => (
    <View style={styles(theme).cardWrapper}>
      <ExerciseCard
        exercise={item}
        onPress={() => handleExercisePress(item)}
      />
      <TouchableOpacity
        style={styles(theme).removeButton}
        onPress={() => handleRemoveFavourite(item)}
      >
        <Feather name="x" size={20} color={theme.colors.error} />
      </TouchableOpacity>
    </View>
  );

  const stylesObj = styles(theme);

  if (favourites.length === 0) {
    return (
      <View style={stylesObj.emptyContainer}>
        <Feather name="heart" size={64} color={theme.colors.textSecondary} />
        <Text style={stylesObj.emptyTitle}>No Favourites Yet</Text>
        <Text style={stylesObj.emptyText}>
          Start adding exercises to your favourites from the Home screen
        </Text>
      </View>
    );
  }

  return (
    <View style={stylesObj.container}>
      <LinearGradient
        colors={[
          theme.colors.gradientStart + '20',
          theme.colors.gradientEnd + '10',
          'transparent',
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={stylesObj.header}
      >
        <Text style={stylesObj.headerTitle}>
          {favourites.length} {favourites.length === 1 ? 'Favourite' : 'Favourites'}
        </Text>
        <View style={stylesObj.headerBadge}>
          <Feather name="heart" size={16} color={theme.colors.primary} />
        </View>
      </LinearGradient>
      <FlatList
        data={favourites}
        renderItem={renderExerciseCard}
        keyExtractor={(item, index) => item.name || `favourite-${index}`}
        contentContainerStyle={stylesObj.listContent}
      />
    </View>
  );
};

const styles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      padding: theme.spacing.lg,
      paddingTop: theme.spacing.xl,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.borderLight,
    },
    headerTitle: {
      fontSize: theme.typography.h2.fontSize + 2,
      fontWeight: '800',
      color: theme.colors.text,
      letterSpacing: -0.5,
    },
    headerBadge: {
      width: 40,
      height: 40,
      borderRadius: theme.borderRadius.round,
      backgroundColor: theme.colors.primary + '15',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1.5,
      borderColor: theme.colors.primary + '25',
    },
    listContent: {
      padding: theme.spacing.md,
    },
    cardWrapper: {
      position: 'relative',
      marginBottom: theme.spacing.md,
    },
    removeButton: {
      position: 'absolute',
      top: theme.spacing.md,
      right: theme.spacing.md,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.round,
      width: 36,
      height: 36,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1.5,
      borderColor: theme.colors.error + '30',
      ...theme.shadows.md,
      zIndex: 10,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing.xl,
    },
    emptyTitle: {
      fontSize: theme.typography.h2.fontSize,
      fontWeight: theme.typography.h2.fontWeight,
      color: theme.colors.text,
      marginTop: theme.spacing.md,
    },
    emptyText: {
      fontSize: theme.typography.body.fontSize,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginTop: theme.spacing.sm,
    },
  });

export default FavouritesScreen;

