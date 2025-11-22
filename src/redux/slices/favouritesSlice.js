import { createSlice } from '@reduxjs/toolkit';
import { loadFavourites, saveFavourites } from '../../utils/storage';

const initialState = {
  favourites: [],
  loading: false,
};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    setFavourites: (state, action) => {
      state.favourites = action.payload;
    },
    addFavourite: (state, action) => {
      const item = action.payload;
      if (!state.favourites.find(fav => fav.name === item.name)) {
        state.favourites.push(item);
        saveFavourites(state.favourites);
      }
    },
    removeFavourite: (state, action) => {
      state.favourites = state.favourites.filter(
        fav => fav.name !== action.payload.name
      );
      saveFavourites(state.favourites);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setFavourites, addFavourite, removeFavourite, setLoading } = favouritesSlice.actions;

export const initializeFavourites = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const savedFavourites = await loadFavourites();
    if (savedFavourites) {
      dispatch(setFavourites(savedFavourites));
    }
  } catch (error) {
    console.error('Error loading favourites:', error);
  } finally {
    dispatch(setLoading(false));
  }
};

export default favouritesSlice.reducer;

