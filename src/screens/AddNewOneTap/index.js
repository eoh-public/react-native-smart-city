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
import { axiosPost } from '../../utils/Apis/axios';
import Routes from '../../utils/Route';
import { popAction } from '../../navigations/utils';

const AddNewOneTap = memo(({ route }) => {
  const {
    type,
    unit,
    automateData = {},
    isAutomateTab,
    isScript,
    isMultiUnits,
  } = route.params;
  const t = useTranslations();
  const { navigate, dispatch, goBack } = useNavigation();
  const [name, setName] = useState('');

  const handleContinue = useCallback(async () => {
    const { success, data } = await axiosPost(API.AUTOMATE.CREATE_AUTOMATE(), {
      unit: unit.id,
      type: type,
      name: name,
      ...automateData,
    });
    if (success) {
      navigate(Routes.ScriptDetail, {
        unit: unit,
        id: data.id,
        name: name,
        type: type,
        havePermission: true,
        isCreateScriptSuccess: true,
        isAutomateTab,
        isScript,
        isMultiUnits,
      });
    }
  }, [
    type,
    name,
    unit,
    automateData,
    navigate,
    isAutomateTab,
    isScript,
    isMultiUnits,
  ]);

  const onChangeName = useCallback((text) => {
    setName(text);
  }, []);

  const onClose = useCallback(() => {
    if (isScript) {
      dispatch(popAction(5));
      isAutomateTab && goBack();
    } else {
      goBack();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isScript, isAutomateTab]);

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
