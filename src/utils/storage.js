import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_STORAGE_KEY = '@fitbuddy_auth';
const FAVOURITES_STORAGE_KEY = '@fitbuddy_favourites';

export const saveAuthState = async (user) => {
  try {
    await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Error saving auth state:', error);
  }
};

export const loadAuthState = async () => {
  try {
    const data = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading auth state:', error);
    return null;
  }
};

export const clearAuthState = async () => {
  try {
    await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing auth state:', error);
  }
};

export const saveFavourites = async (favourites) => {
  try {
    await AsyncStorage.setItem(FAVOURITES_STORAGE_KEY, JSON.stringify(favourites));
  } catch (error) {
    console.error('Error saving favourites:', error);
  }
};

export const loadFavourites = async () => {
  try {
    const data = await AsyncStorage.getItem(FAVOURITES_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading favourites:', error);
    return [];
  }
};

