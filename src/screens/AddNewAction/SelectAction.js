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
  let optionsDropdownActionTemplate = {};
  let numberUpDownActionTemplate = {};
  let statesGridActionTemplate = {};

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
