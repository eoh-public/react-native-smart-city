import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '../Text';
import { Colors } from '../../configs';
import { useTranslations } from '../../hooks/Common/useTranslations';
import FImage from '../FImage';

const FooterInfo = memo(({ data }) => {
  const t = useTranslations();
  return (
    <View style={styles.container}>
      <View style={styles.containerPoweredBy}>
        <Text type="Label" color={Colors.Gray8}>
          {t('powered_by')}
        </Text>
        <FImage
          source={{ uri: data.icon_powered_by }}
          style={styles.iconPoweredBy}
        />
        <Text type="Label" color={Colors.Gray8}>{`${t('model')}: ${
          data.model
        }`}</Text>
        <View style={styles.textHotLine}>
          {data.hotline && (
            <Text center type="Body" color={Colors.Gray9}>
              {`${t('hotline_text')}: `}
              <Text type="Body" semibold>
                {data.hotline}
              </Text>
            </Text>
          )}
        </View>
      </View>
    </View>
  );
});

export default FooterInfo;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 16,
  },
  iconPoweredBy: {
    width: 120,
    height: 65,
  },
  containerPoweredBy: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textHotLine: {
    paddingHorizontal: 20,
  },
});
