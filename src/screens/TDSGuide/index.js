import React, { memo } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useTranslations } from '../../hooks/Common/useTranslations';
import i18n from 'i18n-js';
import { TESTID } from '../../configs/Constants';

import { Theme } from '../../configs';
import Text from '../../commons/Text';
import useTitleHeader from '../../hooks/Common/useTitleHeader';

const TDSGuide = memo(() => {
  const t = useTranslations();
  useTitleHeader(t('tds_infomation'));
  const currentLanguage = i18n.currentLocale();

  return (
    <SafeAreaView style={styles.container}>
      <Text
        type="H3"
        semibold
        style={styles.titlePadding}
        testID={TESTID.TDS_GUIDE_TITLE}
      >
        {t('what_is_tds_title')}
      </Text>
      <Text type="Body">{t('what_is_tds_text')}</Text>
      <Text type="H3" semibold style={styles.titlePadding}>
        {t('tds_guidlines_title')}
      </Text>
      {currentLanguage === 'vi' ? (
        <>
          <Text type="Body">
            {t('tds_guidlines_text_1')}
            {'\n'}
            {'\n'}
            {t('tds_guidlines_text_2')}
            {'\n'}
            {'\n'}
            {t('tds_guidlines_text_3')}
          </Text>
        </>
      ) : (
        <Text type="Body">{t('tds_guidlines_text')}</Text>
      )}
    </SafeAreaView>
  );
});

export default TDSGuide;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.color.backgroundColor,
    paddingHorizontal: 16,
  },
  titlePadding: {
    paddingTop: 20,
    paddingBottom: 10,
  },
});
