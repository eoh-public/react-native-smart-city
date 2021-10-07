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
  const { navigate, goBack } = useNavigation();
  const { type, unit, isScript, isAutomateTab, isMultiUnits } = route.params;
  const typeAutoSmart = {
    [AUTOMATE_TYPE.AUTOMATE]: [
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
    [AUTOMATE_TYPE.VALUE_CHANGE]: [
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
    [AUTOMATE_TYPE.ONE_TAP_ONLY]: [
      {
        type: AUTOMATE_TYPE.ONE_TAP,
        route: Routes.AddNewOneTap,
      },
    ],
  };
  const [data] = useState(typeAutoSmart[type]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleOnContinue = useCallback(() => {
    const automate = data[selectedIndex];
    const params = {
      type: automate.type,
      unit: unit,
      ...(automate.data || {}),
      isScript,
      isAutomateTab,
      isMultiUnits,
      routeName: automate?.route,
    };
    if (automate?.route) {
      navigate(isMultiUnits ? Routes.SelectUnit : automate.route, params);
    }
  }, [
    navigate,
    selectedIndex,
    data,
    unit,
    isScript,
    isAutomateTab,
    isMultiUnits,
  ]);

  const handleSelectIndex = (index) => {
    if (index !== selectedIndex) {
      setSelectedIndex(index);
    } else {
      setSelectedIndex(-1);
    }
  };

  const onClose = useCallback(() => {
    isScript ? goBack() : alert(t('feature_under_development'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isScript]);

  return (
    <View style={styles.wrap}>
      <HeaderCustom isShowClose onClose={onClose} />
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
