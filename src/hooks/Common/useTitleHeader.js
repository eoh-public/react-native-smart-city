import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';

import { useSCContextSelector } from '../../context';
const useTitleHeader = (keyTitle) => {
  const { setOptions } = useNavigation();
  const language = useSCContextSelector((state) => state.language);
  useLayoutEffect(() => {
    setOptions({
      title: keyTitle,
    });
  }, [keyTitle, language, setOptions]);
};
export default useTitleHeader;
