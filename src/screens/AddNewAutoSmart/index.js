import React, { memo, useState, useCallback } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HeaderCustom } from '../../commons/Header';
import styles from './styles/AddNewAutoSmartStyles';
import Text from '../../commons/Text';
import BottomButtonView from '../../commons/BottomButtonView';
import ItemAutomate from '../../commons/Automate/ItemAutomate';
import {
  AUTOMATE_SELECT,
  AUTOMATE_TYPE,
  TESTID,
} from '../../configs/Constants';
import { useTranslations } from '../../hooks/Common/useTranslations';
import Routes from '../../utils/Route';

const AddNewAutoSmart = memo(({ route }) => {
  const t = useTranslations();
  const { navigate } = useNavigation();
  const { type, unit } = route.params;
  const typeAutoSmart = {
    automate: [
      {
        type: AUTOMATE_TYPE.ONE_TAP,
        route: Routes.AddNewOneTap,
      },
      {
        type: AUTOMATE_TYPE.VALUE_CHANGE,
        route: Routes.SelectSensorDevices,
        data: {
          title: AUTOMATE_SELECT.SELECT_SENSOR,
        },
      },
      {
        type: AUTOMATE_TYPE.SCHEDULE,
        route: Routes.SetSchedule,
      },
    ],
    value_change: [
      {
        type: AUTOMATE_TYPE.VALUE_CHANGE,
        route: Routes.SelectSensorDevices,
        data: {
          title: AUTOMATE_SELECT.SELECT_SENSOR,
        },
      },
      {
        type: AUTOMATE_TYPE.SCHEDULE,
        route: Routes.SetSchedule,
      },
    ],
  };
  const [data] = useState(typeAutoSmart[type]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleOnContinue = useCallback(() => {
    const automate = data[selectedIndex];
    if (automate?.route) {
      navigate(automate.route, {
        type: automate.type,
        unit: unit,
        ...(automate.data || {}),
      });
    }
  }, [navigate, selectedIndex, data, unit]);

  const handleSelectIndex = (index) => {
    if (index !== selectedIndex) {
      setSelectedIndex(index);
    } else {
      setSelectedIndex(-1);
    }
  };

  return (
    <View style={styles.wrap}>
      <HeaderCustom isShowClose />
      <View style={styles.container}>
        <Text semibold type={'H2'} style={styles.titleCreate}>
          {t('create_smart')}
        </Text>
        <Text type={'Body'} style={styles.titleChoose}>
          {t('choose_the_automation_method_you_want')}
        </Text>
        <View>
          {!!data &&
            data.map((item, index) => (
              <ItemAutomate
                type={item.type}
                isSelected={selectedIndex === index}
                onPress={() => handleSelectIndex(index)}
              />
            ))}
        </View>
      </View>
      <BottomButtonView
        testIDPrefix={TESTID.PREFIX.BUTTON_ADD_AUTO_SMART}
        onPressMain={handleOnContinue}
        style={styles.bottomButton}
        mainTitle={t('continue')}
        typeMain={selectedIndex === -1 ? 'disabled' : 'primary'}
      />
    </View>
  );
});

export default AddNewAutoSmart;
