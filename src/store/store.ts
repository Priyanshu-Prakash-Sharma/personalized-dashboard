import { configureStore } from '@reduxjs/toolkit';
import contentReducer from './features/ContentSlice';
import preferencesReducer from './features/preferencesSlice'; // <-- Corrected path
import themeReducer from './features/themeSlice';
import uiReducer from './features/uiSlice';

export const store = configureStore({
  reducer: {
    content: contentReducer,
    preferences: preferencesReducer,
    theme: themeReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;