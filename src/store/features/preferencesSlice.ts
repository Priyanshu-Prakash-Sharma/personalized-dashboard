import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// This is the corrected list that matches your data
export const availableCategories = ['technology', 'sports', 'entertainment', 'movies'];

interface PreferencesState {
  selectedCategories: string[];
}

const initialState: PreferencesState = {
  selectedCategories: [...availableCategories], // Show all by default
};

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    toggleCategory: (state, action: PayloadAction<string>) => {
      const category = action.payload;
      if (state.selectedCategories.includes(category)) {
        state.selectedCategories = state.selectedCategories.filter(c => c !== category);
      } else {
        state.selectedCategories.push(category);
      }
    },
  },
});

export const { toggleCategory } = preferencesSlice.actions;
export default preferencesSlice.reducer;