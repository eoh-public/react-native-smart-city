import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslations } from '../../../hooks/Common/useTranslations';
import Theme from '../../../configs/Theme';

import { Colors } from '../../../configs';
import Text from '../../../commons/Text';
import { useSCContextSelector } from '../../../context';

const HeaderExplore = memo(() => {
  const t = useTranslations();
  useSCContextSelector((state) => state.language);
  return (
    <View style={styles.container}>
      <Text size={20} semibold={true} style={styles.textTitle}>
        {t('text_explore')}
      </Text>
      {/* <SearchBox onFocusInput={onFocusTextInput} /> */}
    </View>
  );
});

export default HeaderExplore;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  textTitle: {
    lineHeight: 28,
  },
  searchBox: {
    ...Theme.flexRow,
    paddingHorizontal: 16,
    backgroundColor: Colors.White,
    borderWidth: 1,
    borderColor: Colors.Gray4,
    borderRadius: 5,
    marginTop: 8,
    height: 48,
  },
});
