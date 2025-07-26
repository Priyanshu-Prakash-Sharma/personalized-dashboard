import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: { isSidebarOpen: true, searchTerm: '' },
  reducers: {
    toggleSidebar: (state) => { state.isSidebarOpen = !state.isSidebarOpen; },
    setSearchTerm: (state, action: PayloadAction<string>) => { state.searchTerm = action.payload; },
  },
});

export const { toggleSidebar, setSearchTerm } = uiSlice.actions;
export default uiSlice.reducer;