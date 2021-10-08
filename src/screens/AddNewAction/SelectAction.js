import React, { memo, useCallback, useEffect, useState, useMemo } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@ant-design/react-native';

import { useTranslations } from '../../hooks/Common/useTranslations';
import BottomButtonView from '../../commons/BottomButtonView';
import Text from '../../commons/Text';
import ActionTemplate from '../../commons/ActionTemplate';
import NumberUpDownActionTemplate from '../../commons/OneTapTemplate/NumberUpDownActionTemplate';
import OptionsDropdownActionTemplate from '../../commons/OneTapTemplate/OptionsDropdownActionTemplate';
import StatesGridActionTemplate from '../../commons/OneTapTemplate/StatesGridActionTemplate';
import { axiosGet, axiosPost } from '../../utils/Apis/axios';
import { API, Images } from '../../configs';
import { TESTID } from '../../configs/Constants';
import Routes from '../../utils/Route';
import styles from './Styles/SelectActionStyles';
import moment from 'moment';
import { Colors } from '../../configs';
import { TitleCheckBox } from '../Sharing/Components';
import WrapHeaderScrollable from '../../commons/Sharing/WrapHeaderScrollable';
import { popAction } from '../../navigations/utils';
import { LoadingSelectAction } from './Components';

const SelectAction = memo(({ route }) => {
  const t = useTranslations();
  const { navigate, dispatch } = useNavigation();
  const {
    unit,
    device,
    automateId,
    scriptName,
    isScript = false,
    type,
  } = route.params;
  const [data, setData] = useState([]);
  const [actions, setActions] = useState([]);
  const [sensorData, setSensorData] = useState([]);
  const [checkedItem, setCheckedItem] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const { success, data } = await axiosGet(
      isScript
        ? API.AUTOMATE.GET_SENSOR_CONFIG(device.id)
        : API.SENSOR.DISPLAY_ACTIONS(device.id),
      isScript && {},
      isScript && true
    );
    if (success) {
      isScript ? setSensorData(data) : setData(data);
    }
    const to = setTimeout(() => {
      setIsLoading(false);
      clearTimeout(to);
    }, 1000);
  }, [device.id, isScript]);

  const onSave = useCallback(async () => {
    if (isScript) {
      const itemTemp = sensorData.find((i) => i.id === checkedItem?.id);
      navigate(Routes.AddNewOneTap, {
        automateData: {
          condition: itemTemp?.conditionValue || '<',
          value: itemTemp?.value,
          config: itemTemp?.id,
        },
        type,
        unit,
      });
    } else {
      let list_action = [...actions];
      list_action = list_action.map((item) => ({
        action: item.action,
        data: item.data,
      }));
      const { success } = await axiosPost(
        API.AUTOMATE.ADD_SCRIPT_ACTION(automateId),
        {
          list_action,
          unit: unit.id,
        }
      );
      if (success) {
        navigate(Routes.ScriptDetail, {
          id: automateId,
          name: scriptName,
          havePermission: true,
          unit,
          dateNow: moment().valueOf(), // TODO will remove dateNow later
          type: type,
        });
      }
    }
  }, [
    actions,
    automateId,
    navigate,
    scriptName,
    type,
    unit,
    isScript,
    checkedItem,
    sensorData,
  ]);

  const handleOnSelectAction = (action) => {
    let newActions = [...actions];
    let index = -1;

    switch (action.template) {
      case 'on_off_button_action_template':
      case 'one_button_action_template':
      case 'three_button_action_template':
        index = newActions.findIndex((item) => {
          return (
            item.template === 'on_off_button_action_template' ||
            item.template === 'one_button_action_template' ||
            item.template === 'three_button_action_template'
          );
        });
        break;

      case 'OptionsDropdownActionTemplate':
      case 'NumberUpDownActionTemplate':
      case 'StatesGridActionTemplate':
        index = newActions.findIndex(
          (item) => item.template === action.template
        );
        break;
    }

    if (index < 0) {
      newActions.push(action);
    } else {
      newActions[index] = action;
    }
    setActions(newActions);
  };

  const handleClose = useCallback(() => {
    isScript ? dispatch(popAction(3)) : alert(t('feature_under_development'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isScript, t]);

  const onChecked = useCallback(
    (_, isChecked, id) => {
      setCheckedItem(isChecked ? sensorData.find((i) => i?.id === id) : {});
    },
    [sensorData]
  );

  const onPressItem = (item) => () => {
    navigate(Routes.SetUpSensor, { item, sensorData, setSensorData });
  };

  const rightComponent = useMemo(
    () => (
      <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
        <Icon name={'close'} size={24} color={Colors.Black} />
      </TouchableOpacity>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const renderBottomButtonView = useMemo(
    () => (
      <BottomButtonView
        style={styles.bottomButtonView}
        mainTitle={t(isScript ? 'continue' : 'save')}
        onPressMain={onSave}
        typeMain={
          actions.length > 0 || !!checkedItem?.id ? 'primary' : 'disabled'
        }
      />
    ),
    [onSave, actions, checkedItem, isScript, t]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <View style={styles.wrap}>
      <WrapHeaderScrollable
        title={t('set_up {name}', { name: device?.name })}
        headerAniStyle={styles.headerAniStyle}
        rightComponent={rightComponent}
      >
        {isScript ? (
          isLoading ? (
            <LoadingSelectAction style={styles.container} />
          ) : (
            sensorData.map((item) => {
              const isHasValue = !!item?.value;
              return (
                <View style={styles.wrapItem} key={item?.id}>
                  <TitleCheckBox
                    onPress={onChecked}
                    id={item?.id}
                    title={item?.name}
                    titleStyle={styles.titleStyle}
                    wrapStyle={styles.wrapStyleCheckBox}
                    isChecked={checkedItem?.id === item?.id}
                  />
                  <TouchableOpacity
                    onPress={onPressItem(item)}
                    style={[styles.wrapCondition, styles.shadowView]}
                  >
                    <Text type="Body" color={Colors.Gray7}>
                      {t('condition')}
                    </Text>
                    <Text
                      numberOfLines={1}
                      type="H4"
                      semibold={isHasValue}
                      style={styles.description}
                    >
                      {isHasValue
                        ? `${item?.name} ${
                            item?.title ? item.title : t('is_below') + ' (<)'
                          } ${item.value} ${item?.unit}`
                        : `${t('no')} ${t('condition')}`}
                    </Text>
                    {isHasValue && (
                      <Image
                        source={Images.arrowBack}
                        style={styles.arrowRight}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              );
            })
          )
        ) : (
          <RenderActionItem
            data={data}
            onSelectAction={handleOnSelectAction}
            testID={TESTID.ACTION_ITEM}
          />
        )}
      </WrapHeaderScrollable>
      {renderBottomButtonView}
    </View>
  );
});

const RenderActionItem = ({ data, onSelectAction }) => {
  if (!data) {
    return null;
  }
  const actionTemplate = [];
  let optionsDropdownActionTemplate = {
    title: 'Fan Speed',
    template: 'OptionsDropdownActionTemplate',
    configuration: {
      config: 1019,
      action: '05195362-75de-4db5-9e5e-98fef9d4910c',
      options: [
        {
          text: 'Auto',
          value_int: 1,
          value_text: 'auto',
        },
        {
          text: 'Level1',
          value_int: 2,
          value_text: 'level1',
        },
        {
          text: 'Level2',
          value_int: 3,
          value_text: 'level2',
        },
        {
          text: 'Level3',
          value_int: 4,
          value_text: 'level3',
        },
        {
          text: 'Level4',
          value_int: 5,
          value_text: 'level4',
        },
        {
          text: 'Level5',
          value_int: 6,
          value_text: 'level5',
        },
        {
          text: 'Silent',
          value_int: 7,
          value_text: 'silent',
        },
      ],
      icon: 'up',
      icon_kit: 43,
    },
  };
  let numberUpDownActionTemplate = {
    title: '',
    template: 'NumberUpDownActionTemplate',
    configuration: {
      keep_track_config: true,
      config: 1023,
      action: 'b498234c-6c1a-452d-a1d1-87a314c20528',
      min_value: 16,
      max_value: 30,
      text_format: '{number} \u00b0C',
    },
  };
  let statesGridActionTemplate = {
    title: 'Mode',
    template: 'StatesGridActionTemplate',
    configuration: {
      options: [
        {
          config: 1024,
          is_on_value: 1,
          action: '800ff454-4e2a-4a38-bad6-1bded728193e',
          icon: 'up-circle',
          icon_kit: 41,
          text: 'Auto',
        },
        {
          config: 1024,
          is_on_value: 2,
          action: '4e43da81-469e-4d23-a66b-2656db7cf196',
          icon: 'up-circle',
          icon_kit: 42,
          text: 'Cool',
        },
        {
          config: 1024,
          is_on_value: 3,
          action: '63f1bbfa-0e42-4401-9ea2-4aa07327ff26',
          icon: 'up-circle',
          icon_kit: 44,
          text: 'Dry',
        },
        {
          config: 1024,
          is_on_value: 4,
          action: '8ba3e471-dd84-478b-87f3-6008aead8804',
          icon: 'up-circle',
          icon_kit: 43,
          text: 'Fan Only',
        },
      ],
    },
  };

  data.forEach((item) => {
    switch (item.template) {
      case 'on_off_button_action_template':
      case 'one_button_action_template':
      case 'three_button_action_template':
        actionTemplate.push(item);
        break;
      case 'OptionsDropdownActionTemplate':
        optionsDropdownActionTemplate = { ...item };
        break;
      case 'NumberUpDownActionTemplate':
        numberUpDownActionTemplate = { ...item };
        break;
      case 'StatesGridActionTemplate':
        statesGridActionTemplate = { ...item };
        break;
    }
  });

  const handleOnSelectAction = (action) => {
    onSelectAction && onSelectAction(action);
  };

  return (
    <>
      {actionTemplate.length > 0 && (
        <ActionTemplate
          data={actionTemplate}
          onSelectAction={handleOnSelectAction}
        />
      )}
      {Object.keys(numberUpDownActionTemplate).length > 0 && (
        <NumberUpDownActionTemplate
          data={numberUpDownActionTemplate}
          onSelectAction={handleOnSelectAction}
        />
      )}
      {Object.keys(optionsDropdownActionTemplate).length > 0 && (
        <OptionsDropdownActionTemplate
          data={optionsDropdownActionTemplate}
          onSelectAction={handleOnSelectAction}
        />
      )}
      {Object.keys(statesGridActionTemplate).length > 0 && (
        <StatesGridActionTemplate
          data={statesGridActionTemplate}
          onSelectAction={handleOnSelectAction}
        />
      )}
    </>
  );
};

export default SelectAction;
