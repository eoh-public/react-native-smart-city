import { useEffect } from 'react';
import { Linking } from 'react-native';
import DeepLinking from 'react-native-deep-linking';
import { queryStringToPath } from '../utils/Converter/url';

const useInitDeepLink = () => {
  useEffect(() => {
    const handleUrl = ({ url }) => {
      // eslint-disable-next-line promise/prefer-await-to-then
      Linking.canOpenURL(url).then((supported) => {
        if (supported) {
          const regexp = new RegExp(/app:\/\/eoh\/sync-lg-device/g);
          if (regexp.test(url)) {
            url = queryStringToPath(url);
          }
          DeepLinking.evaluateUrl(url);
        }
      });
    };
    DeepLinking.addScheme('app://');
    Linking.addEventListener('url', handleUrl);
  }, []);
};

export default useInitDeepLink;
