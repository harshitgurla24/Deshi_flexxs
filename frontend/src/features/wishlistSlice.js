import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = 'df_wishlist_v1';

const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { items: [] };
    return JSON.parse(raw);
  } catch (e) {
    return { items: [] };
  }
};

const saveToStorage = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    // ignore
  }
};

const initialState = loadFromStorage();

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const p = action.payload;
      const exists = state.items.find(i => i.id === p.id);
      if (!exists) state.items.push(p);
      saveToStorage(state);
    },
    removeFromWishlist: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(i => i.id !== id);
      saveToStorage(state);
    },
    clearWishlist: (state) => {
      state.items = [];
      saveToStorage(state);
    },
    toggleWishlist: (state, action) => {
      const p = action.payload;
      const idx = state.items.findIndex(i => i.id === p.id);
      if (idx >= 0) state.items.splice(idx, 1);
      else state.items.push(p);
      saveToStorage(state);
    }
  }
});

export const { addToWishlist, removeFromWishlist, clearWishlist, toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
