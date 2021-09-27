import React, { memo, useCallback, useContext } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTranslations } from '../../hooks/Common/useTranslations';

import { SCContext } from '../../context';
import { Action } from '../../context/actionType';
import Routes from '../../utils/Route';
import { HeaderCustom } from '../../commons/Header';
import Text from '../../commons/Text';
import BottomButtonView from '../../commons/BottomButtonView';
import ItemAutomate from '../../commons/Automate/ItemAutomate';
import ItemScriptAction from '../../commons/Automate/ItemScriptAction';
import ItemAddNewScriptAction from '../../commons/Automate/ItemAddNewScriptAction';

import styles from './AddNewScriptActionStyles';
import { Colors } from '../../configs';

const AddNewScriptAction = memo(() => {
  const t = useTranslations();
  const { params = {} } = useRoute();
  const { navigate } = useNavigation();
  // eslint-disable-next-line no-unused-vars
  const { type, name, unit } = params;

  // eslint-disable-next-line no-unused-vars
  const { stateData, setAction } = useContext(SCContext);

  const handleOnEdit = useCallback(() => {
    alert(t('feature_under_development'));
  }, [t]);

  const handleOnAddNew = useCallback(() => {
    navigate(Routes.SelectDevice, {
      automateId: null,
      unit,
      scriptName: name,
    });
  }, [navigate, name, unit]);

  const handleOnDone = useCallback(() => {
    alert(t('feature_under_development'));
  }, [t]);

  const handleGoToAutomate = useCallback(() => {
    alert(t('feature_under_development'));
  }, [t]);

  const handleGoBack = useCallback(() => {
    setAction(Action.LIST_ACTION, {});
  }, [setAction]);

  return (
    <View style={styles.wrap}>
      <HeaderCustom isShowClose onGoBack={handleGoBack} />
      <ScrollView scrollEnabled={true} contentContainerStyle={styles.container}>
        <Text type="H2" bold style={styles.title}>
          {name}
        </Text>

        <View style={styles.row}>
          <Text type="H3" bold>
            {t('how_to_start')}
          </Text>
        </View>
        <View style={styles.automate}>
          <ItemAutomate type={type} />
        </View>
        <View style={styles.row}>
          <Text type="H3" bold>
            {t('actions_list')}
          </Text>
          <TouchableOpacity onPress={handleOnEdit}>
            <Text type="Label" color={Colors.Primary}>
              {t('edit')}
            </Text>
          </TouchableOpacity>
        </View>
        {stateData?.listAction.map((item, index) => (
          <ItemScriptAction order={index + 1} item={item} key={index} />
        ))}
        <ItemAddNewScriptAction
          order={stateData?.listAction.length + 1}
          title={t('add_new')}
          onAddNew={handleOnAddNew}
        />
      </ScrollView>
      <BottomButtonView
        style={styles.viewBottom}
        mainTitle={t('done')}
        onPressMain={handleOnDone}
        secondaryTitle={t('go_to_automate_scripts')}
        typeSecondary="primaryUnderline"
        onPressSecondary={handleGoToAutomate}
      />
    </View>
  );
});

export default AddNewScriptAction;