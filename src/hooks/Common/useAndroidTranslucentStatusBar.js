import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Device } from '../../configs';

const useAndroidTranslucentStatusBar = (statusBar) => {
  const navigation = useNavigation();

  useEffect(() => {
    if (!Device.isIOS) {
      const unsubscribe = navigation.addListener('blur', () => {
        StatusBar.setTranslucent(false);
        StatusBar.setBackgroundColor(statusBar.background);
      });

      return unsubscribe;
    }
  }, [navigation]);

  useEffect(() => {
    if (!Device.isIOS) {
      const unsubscribe = navigation.addListener('focus', () => {
        StatusBar.setTranslucent(!Device.isIOS);
        StatusBar.setBackgroundColor(Colors.Transparent);
      });

      return unsubscribe;
    }
  }, [navigation]);

  return null;
};

export default useAndroidTranslucentStatusBar;
