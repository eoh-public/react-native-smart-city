import React, { memo, useCallback, useState } from 'react';
import { ScrollView, SafeAreaView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { API, Colors } from '../../configs';
import { TESTID } from '../../configs/Constants';
import _TextInput from '../../commons/Form/TextInput';
import styles from './AddNewOneTapStyles';
import { HeaderCustom } from '../../commons/Header';
import BottomButtonView from '../../commons/BottomButtonView';
import Text from '../../commons/Text';
import { useTranslations } from '../../hooks/Common/useTranslations';
import { axiosPost, axiosPut } from '../../utils/Apis/axios';
import Routes from '../../utils/Route';
import { popAction } from '../../navigations/utils';
import { ToastBottomHelper } from '../../utils/Utils';

const AddNewOneTap = memo(({ route }) => {
  const {
    type,
    unit,
    automateData = {},
    isAutomateTab,
    isMultiUnits,
    automateId,
    scriptName,
  } = route.params;
  const t = useTranslations();
  const { navigate, dispatch, goBack } = useNavigation();
  const [name, setName] = useState(scriptName ? scriptName : '');

  const handleContinue = useCallback(async () => {
    const params = {
      unit: isMultiUnits ? null : unit.id,
      type: type,
      name: name,
      ...automateData,
    };
    const { success, data } = automateId
      ? await axiosPut(API.AUTOMATE.UPDATE_AUTOMATE(automateId), params)
      : await axiosPost(API.AUTOMATE.CREATE_AUTOMATE(), params);
    if (success) {
      navigate(Routes.ScriptDetail, {
        unit: unit,
        id: data.id,
        name: name,
        type: type,
        havePermission: true,
        isCreateScriptSuccess: true,
        isAutomateTab: automateId ? false : isAutomateTab,
        isMultiUnits,
      });
    } else {
      ToastBottomHelper.error(t('error_please_try_later'));
    }
  }, [
    isMultiUnits,
    unit,
    type,
    name,
    automateData,
    automateId,
    navigate,
    isAutomateTab,
    t,
  ]);

  const onChangeName = useCallback((text) => {
    setName(text);
  }, []);

  const onClose = useCallback(() => {
    if (automateId) {
      navigate(Routes.ScriptDetail, {
        id: automateId,
        name: scriptName,
        type: type,
        havePermission: true,
        unit,
        isMultiUnits,
        isAutomateTab,
      });
    } else if (isAutomateTab) {
      dispatch(popAction(5));
      goBack();
    } else {
      goBack();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAutomateTab]);

  return (
    <SafeAreaView
      style={
        Platform.OS === 'android'
          ? styles.containerAndroid
          : styles.containerIOS
      }
    >
      <HeaderCustom isShowClose onClose={onClose} />
      <ScrollView>
        <Text
          testID={TESTID.ADD_NEW_DEVICE_ADD}
          semibold
          size={20}
          color={Colors.Gray9}
          style={styles.textHeader}
        >
          {t('name_your_button')}
        </Text>
        <_TextInput
          placeholder={t('name_your_button')}
          wrapStyle={styles.noMarginTop}
          onChange={onChangeName}
          textInputStyle={styles.textInput}
          value={name}
          testID={TESTID.NAME_YOUR_BUTTON}
        />
      </ScrollView>
      <BottomButtonView
        style={styles.viewBottomFixed}
        mainTitle={t('save')}
        onPressMain={handleContinue}
        typeMain={name !== '' ? 'primary' : 'disabled'}
      />
    </SafeAreaView>
  );
});

export default AddNewOneTap;
