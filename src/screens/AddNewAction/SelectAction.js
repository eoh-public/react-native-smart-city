import React, { memo, useCallback, useEffect, useState, useMemo } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@ant-design/react-native';

import { useTranslations } from '../../hooks/Common/useTranslations';
import BottomButtonView from '../../commons/BottomButtonView';
import Text from '../../commons/Text';
import ActionTemplate from '../../commons/ActionTemplate';
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
  const { navigate, dispatch, goBack } = useNavigation();
  const {
    unit,
    device,
    automateId,
    scriptName,
    isScript = false,
    type,
    isAutomateTab,
    isCreateNewAction,
    isMultiUnits,
  } = route.params;
  const [data, setData] = useState([]);
  const [actions, setActions] = useState({
    name: '',
    action: '',
  });
  const [sensorData, setSensorData] = useState([]);
  const [checkedItem, setCheckedItem] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    isScript && setIsLoading(true);
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
        isAutomateTab,
        isScript,
        isMultiUnits,
      });
    } else {
      const { success } = await axiosPost(
        API.AUTOMATE.ADD_SCRIPT_ACTION(automateId),
        {
          action: actions.action,
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
          isAutomateTab,
          isCreateNewAction,
          isMultiUnits,
        });
      }
    }
  }, [
    actions.action,
    automateId,
    navigate,
    scriptName,
    type,
    unit,
    isScript,
    checkedItem,
    sensorData,
    isCreateNewAction,
  ]);

  const handleOnSelectAction = (action) => {
    setActions({ ...action });
  };

  const handleClose = useCallback(() => {
    if (isCreateNewAction) {
      dispatch(popAction(2));
    } else if (isScript) {
      dispatch(popAction(3));
      isAutomateTab && goBack();
    } else {
      alert(t('feature_under_development'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isScript, isCreateNewAction]);

  const onChecked = useCallback(
    (_, isChecked, id) => {
      setCheckedItem(isChecked ? sensorData.find((i) => i?.id === id) : {});
    },
    [sensorData]
  );

  const onPressItem = (item) => () => {
    navigate(Routes.SetUpSensor, {
      item,
      sensorData,
      setSensorData,
      isAutomateTab,
    });
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

  const renderBottomButtonView = useMemo(
    () => (
      <BottomButtonView
        style={styles.bottomButtonView}
        mainTitle={t(isScript ? 'continue' : 'save')}
        onPressMain={onSave}
        typeMain={actions?.action || !!checkedItem?.id ? 'primary' : 'disabled'}
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
          <RenderActionItem data={data} testID={TESTID.ACTION_ITEM} />
        )}
      </WrapHeaderScrollable>
      {renderBottomButtonView}
    </View>
  );
});

export default SelectAction;
