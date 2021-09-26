import React, {
  memo,
  useCallback,
  useEffect,
  useState,
  useContext,
} from 'react';
import { ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useTranslations } from '../../hooks/Common/useTranslations';
import { SCContext } from '../../context';
import { Action } from '../../context/actionType';
import { HeaderCustom } from '../../commons/Header';
import BottomButtonView from '../../commons/BottomButtonView';
import Text from '../../commons/Text';
import ActionTemplate from '../../commons/ActionTemplate';
import { axiosGet, axiosPost } from '../../utils/Apis/axios';
import { API } from '../../configs';
import { TESTID } from '../../configs/Constants';
import Routes from '../../utils/Route';
import styles from './Styles/SelectActionStyles';

const SelectAction = memo(({ route }) => {
  const t = useTranslations();
  const { navigate } = useNavigation();
  const { unit, device, stationName, automateId, scriptName } = route.params;
  const { setAction } = useContext(SCContext);
  const [data, setData] = useState([]);
  const [actions, setActions] = useState({
    name: '',
    action: '',
  });

  const fetchData = useCallback(async () => {
    const { success, data } = await axiosGet(
      API.SENSOR.DISPLAY_ACTIONS(device.id),
      {},
      true
    );
    if (success) {
      setData(data);
    }
  }, [device.id]);

  const onSave = useCallback(async () => {
    if (automateId) {
      const { success } = await axiosPost(
        API.AUTOMATE.ADD_SCRIPT_ACTION(automateId),
        {
          action: actions.action,
        }
      );
      if (success) {
        navigate(Routes.ScriptDetail, {
          id: automateId,
          name: scriptName,
          unit,
        });
      }
    } else {
      setAction(Action.LIST_ACTION, {
        action: actions.action,
        unit_name: unit.name,
        action_name: actions.name,
        sensor_name: device.name,
        sensor_icon_kit: device.icon_kit,
        station_name: stationName,
      });
      navigate(Routes.AddNewScriptAction, {
        automateType: 'one-tap',
        name: scriptName,
        unit,
      });
    }
  }, [
    actions.action,
    actions.name,
    automateId,
    device.icon_kit,
    device.name,
    navigate,
    scriptName,
    setAction,
    stationName,
    unit,
  ]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleOnSelectAction = (action) => {
    setActions({ ...action });
  };

  const RenderActionItem = ({ data }) => {
    const actionTemplate = [];

    data.forEach((item) => {
      switch (item.template) {
        case 'on_off_button_action_template':
        case 'one_button_action_template':
        case 'three_button_action_template':
          actionTemplate.push(item);
          break;
      }
    });

    return (
      <>
        {actionTemplate.length > 0 && (
          <ActionTemplate
            action={actions}
            data={actionTemplate}
            onSelectAction={handleOnSelectAction}
          />
        )}
      </>
    );
  };

  return (
    <View style={styles.wrap}>
      <HeaderCustom isShowClose />
      <ScrollView
        style={styles.wrap}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <Text bold type="H2" style={styles.title}>
          {t('set_up {name}', {
            name: device.name,
          })}
        </Text>

        <RenderActionItem data={data} testID={TESTID.ACTION_ITEM} />
      </ScrollView>

      <BottomButtonView
        style={styles.bottomButtonView}
        mainTitle={t('save')}
        onPressMain={onSave}
        typeMain={actions?.action ? 'primary' : 'disabled'}
      />
    </View>
  );
});

export default SelectAction;
