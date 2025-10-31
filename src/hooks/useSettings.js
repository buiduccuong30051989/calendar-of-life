import { useState, useCallback } from 'react';
import { VIEW_SETTINGS } from '@/constants';

/**
 * Custom hook for managing application settings
 * @param {string} initialSetting - Initial view setting
 * @returns {Object} - Settings state and handlers
 */
export const useSettings = (initialSetting = VIEW_SETTINGS.YEAR_END) => {
  const [viewSetting, setViewSetting] = useState(initialSetting);
  const [showPastWeeks, setShowPastWeeks] = useState(false);
  const [showDateCalendar, setShowDateCalendar] = useState(false);

  const handleViewSettingChange = useCallback((value) => {
    setViewSetting(value);
  }, []);

  const togglePastWeeks = useCallback((checked) => {
    setShowPastWeeks(checked);
  }, []);

  const toggleDateCalendar = useCallback((checked) => {
    setShowDateCalendar(checked);
  }, []);

  return {
    viewSetting,
    showPastWeeks,
    showDateCalendar,
    handleViewSettingChange,
    togglePastWeeks,
    toggleDateCalendar,
  };
};
