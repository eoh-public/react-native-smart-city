import { Platform, StatusBar } from 'react-native';
import { Colors } from '../../configs';
import { useSCContextSelector } from '../../context';

export const useStatusBar = () => {
  const statusBar = useSCContextSelector((state) => state.statusBar);

  return {
    statusBar,
  };
};

export const useStatusBarPreview = (color = Colors.TextTransparent) =>
  Platform.OS === 'android' && StatusBar.setBackgroundColor(color);

export const useHiddenStatusBar = (hidden) =>
  Platform.OS === 'android' && StatusBar.setHidden(hidden, true);
