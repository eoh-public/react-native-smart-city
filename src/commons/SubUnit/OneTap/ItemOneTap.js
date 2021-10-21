import React, { memo, useCallback, useMemo } from 'react';
import { TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';
import moment from 'moment';
import Text from '../../Text';
import { API, Colors } from '../../../configs';
import OneTap from '../../../../assets/images/OneTap.svg';
import ValueChange from '../../../../assets/images/ValueChange.svg';
import Schedule from '../../../../assets/images/Schedule.svg';
import CheckCircle from '../../../../assets/images/CheckCircle.svg';
import FImage from '../../FImage';
import { timeDifference } from '../../../utils/Converter/time';
import styles from './ItemOneTapStyles.js';
import { ToastBottomHelper } from '../../../utils/Utils';
import { axiosPost } from '../../../utils/Apis/axios';
import { useTranslations } from '../../../hooks/Common/useTranslations';
import { useNavigation } from '@react-navigation/native';
import Routes from '../../../utils/Route';
import { useGetIdUser } from '../../../hooks/Common';
import { AUTOMATE_TYPE, TESTID } from '../../../configs/Constants';

const ItemOneTap = memo(
  ({ isOwner, automate, unit, wrapSyles, onPressItem }) => {
    const { navigate } = useNavigation();
    const { id, type, user, script, activate_at, condition, config, value } =
      automate;
    const t = useTranslations();
    const idUser = useGetIdUser();

    const textCondition = useMemo(() => {
      if (type === AUTOMATE_TYPE.VALUE_CHANGE) {
        let _condition;
        if (condition === '>') {
          _condition = 'higher_than';
        } else if (condition === '<') {
          _condition = 'lower_than';
        } else if (condition === '=') {
          _condition = 'equal';
        }
        return `${config} ${t(_condition)} ${value}`;
      }
      return null;
    }, [condition, config, t, type, value]);

    const goToDetail = useCallback(() => {
      navigate(Routes.ScriptDetail, {
        id,
        name: script?.name,
        type: type,
        havePermission: isOwner || user === idUser,
        unit,
        textCondition,
      });
    }, [
      isOwner,
      user,
      idUser,
      navigate,
      id,
      script,
      type,
      unit,
      textCondition,
    ]);

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
      if (iconKit) {
        return <FImage source={{ uri: iconKit }} style={styles.iconSensor} />;
      } else if (type === AUTOMATE_TYPE.ONE_TAP) {
        return <OneTap />;
      } else if (type === AUTOMATE_TYPE.VALUE_CHANGE) {
        return <ValueChange />;
      } else {
        return <Schedule />;
      }
    };
    const activateAt = activate_at
      ? timeDifference(new Date(), moment(activate_at), true)
      : null;
    return (
      <TouchableWithoutFeedback onPress={onPressItem || goToDetail}>
        <View style={[styles.container, wrapSyles]}>
          <View style={styles.boxIcon}>
            {displayIcon()}
            {type === AUTOMATE_TYPE.ONE_TAP && (
              <TouchableOpacity
                testID={TESTID.AUTOMATE_SCRIPT_ACTION}
                onPress={handleScriptAction}
              >
                <CheckCircle />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            testID={TESTID.GO_DETAIL}
            onPress={onPressItem || goToDetail}
          >
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
  }
);

export default ItemOneTap;
