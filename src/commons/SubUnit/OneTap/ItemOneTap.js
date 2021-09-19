import React, { memo, useCallback } from 'react';
import { TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';
import moment from 'moment';
import Text from '../../Text';
import { API, Colors } from '../../../configs';
import OneTap from '../../../../assets/images/OneTap.svg';
import CheckCircle from '../../../../assets/images/CheckCircle.svg';
import FImage from '../../FImage';
import { timeDifference } from '../../../utils/Converter/time';
import styles from './ItemOneTapStyles.js';
import { ToastBottomHelper } from '../../../utils/Utils';
import { axiosPost } from '../../../utils/Apis/axios';
import { useTranslations } from '../../../hooks/Common/useTranslations';

const ItemOneTap = memo(({ automate }) => {
  const { id, script, activate_at } = automate;
  const t = useTranslations();
  const goToDetail = useCallback(() => {
    // eslint-disable-next-line no-alert
    alert(t('feature_under_development'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScriptAction = useCallback(async () => {
    const { success } = await axiosPost(API.AUTOMATE.ACTION_ONE_TAP(id));
    if (success) {
      ToastBottomHelper.success(t('Activated successfully.'));
    } else {
      ToastBottomHelper.error(t('Activation failed.'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const displayIcon = () => {
    const iconKit = script?.icon_kit;
    return iconKit ? (
      <FImage source={{ uri: iconKit }} style={styles.iconSensor} />
    ) : (
      <OneTap />
    );
  };
  const activateAt = activate_at
    ? timeDifference(new Date(), moment(activate_at), true)
    : null;
  return (
    <TouchableWithoutFeedback onPress={goToDetail}>
      <View style={styles.container}>
        <View style={styles.boxIcon}>
          {displayIcon()}
          <TouchableOpacity onPress={handleScriptAction}>
            <CheckCircle />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={goToDetail}>
          <Text
            numberOfLines={1}
            semibold
            size={14}
            color={Colors.Gray9}
            type="Body"
          >
            {script?.name}
          </Text>
          <View style={styles.descriptionContainer}>
            <Text
              numberOfLines={1}
              semibold
              size={12}
              color={Colors.Gray8}
              type="Label"
            >
              {activateAt && t('activated_time', { time: activateAt })}
            </Text>
            <IconOutline name="right" size={12} />
          </View>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
});

export default ItemOneTap;
