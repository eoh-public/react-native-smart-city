import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslations } from '../../../hooks/Common/useTranslations';
import Text from '../../../commons/Text';
import { Images, Colors } from '../../../configs';
import { TESTID } from '../../../configs/Constants';
import styles from '../styles/HeaderGuestInfoStyles';

const HeaderGuestInfo = ({ onSave }) => {
  const t = useTranslations();
  const { goBack } = useNavigation();
  return (
    <View style={styles.wrap}>
      <TouchableOpacity style={styles.button} onPress={goBack}>
        <Image source={Images.arrowBack} style={styles.icon} />
      </TouchableOpacity>
      <View style={styles.wrapTitle}>
        <Text type="H4" bold>
          {t('guest_info')}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={onSave}
        testID={TESTID.SAVE_ACCESS_SCHEDULE}
      >
        <Text type="H4" color={Colors.Primary}>
          {t('save')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderGuestInfo;
