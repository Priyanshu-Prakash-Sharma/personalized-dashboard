'use client';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { toggleCategory, availableCategories } from '@/store/features/preferencesSlice';

const SettingsPanel = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedCategories } = useSelector((state: RootState) => state.preferences);
  return (
    <div className="mt-8">
      <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Your Preferences</h3>
      <div className="space-y-2">
        {availableCategories.map((category) => (
          <label key={category} className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
              checked={selectedCategories.includes(category)} onChange={() => dispatch(toggleCategory(category))} />
            <span className="text-gray-700 dark:text-gray-300 capitalize">{category}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
export default SettingsPanel;