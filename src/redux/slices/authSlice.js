import { createSlice } from '@reduxjs/toolkit';
import { loadAuthState, saveAuthState, clearAuthState } from '../../utils/storage';

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      if (action.payload) {
        saveAuthState(action.payload);
      }
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setUser, logout, setLoading } = authSlice.actions;

export const initializeAuth = () => async (dispatch) => {
  try {
    const savedUser = await loadAuthState();
    if (savedUser) {
      dispatch(setUser(savedUser));
    }
  } catch (error) {
    console.error('Error loading auth state:', error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch(logout());
    await clearAuthState();
  } catch (error) {
    console.error('Error during logout:', error);
    dispatch(logout());
  }
};

export default authSlice.reducer;

