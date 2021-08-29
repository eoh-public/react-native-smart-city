import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import { t } from 'i18n-js';
import moment from 'moment';
import _ from 'lodash';
import { get } from 'lodash';
import { useSelector } from 'react-redux';
import { IconFill } from '@ant-design/icons-react-native';
import { Icon } from '@ant-design/react-native';

import { useCountUp } from './hooks/useCountUp';
import { getData as getLocalData } from '../../utils/Storage';
import { API, Colors, Device } from '../../configs';
import { axiosGet, axiosPost } from '../../utils/Apis/axios';
import { scanBluetoothDevices } from '../../iot/RemoteControl/Bluetooth';
import ActionGroup, { getActionComponent } from '../../commons/ActionGroup';
import { ConnectedViewHeader, DisconnectedView } from '../../commons/Device';
import HistoryChart from '../../commons/Device/HistoryChart';
import PMSensorIndicatior from '../../commons/Device/PMSensor/PMSensorIndicatior';
import CurrentRainSensor from '../../commons/Device/RainningSensor/CurrentRainSensor';
import ListQualityIndicator from '../../commons/Device/WaterQualitySensor/ListQualityIndicator';
import Anemometer from '../../commons/Device/WindSpeed/Anemometer';
import Compass from '../../commons/Device/WindDirection/Compass';
import DeviceAlertStatus from '../../commons/Device/DeviceAlertStatus';
import FlatListItems from '../../commons/Device/FlatListItems';
import MediaPlayer from '../../commons/MediaPlayer';
import { AlertSendConfirm } from '../../commons/EmergencyButton/AlertSendConfirm';
import { AlertSent } from '../../commons/EmergencyButton/AlertSent';
import {
  useAlertResolveEmergency,
  useEmergencyButton,
} from './hooks/useEmergencyButton';
import EmergencyDetail from '../../commons/Device/Emergency/EmergencyDetail';
import BottomButtonView from '../../commons/BottomButtonView';
import Text from '../../commons/Text';
import { transformDatetime } from '../../utils/Converter/time';
import { AlertAction, ButtonPopup, MenuActionMore } from '../../commons';
import EmergencyButton from '../../commons/Device/Emergency/EmergencyButton';
import { TESTID } from '../../configs/Constants';
import FooterInfo from '../../commons/Device/FooterInfo';
import Routes from '../../utils/Route';
import { sendRemoteCommand } from '../../iot/RemoteControl';
import HeaderDevice from './HeaderDevice';
import { usePopover } from '../../hooks/Common';
import { useConfigGlobalState } from '../../iot/states';
import { standardizeCameraScreenSize } from '../../utils/Utils';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { Card } from '../../commons/CardShadow';

const { standardizeHeight } = standardizeCameraScreenSize(
  Device.screenWidth - 32
);

const DeviceDetail = ({ account, route }) => {
  const navigation = useNavigation();
  const [offsetTitle, setOffsetTitle] = useState(1);
  const [display, setDisplay] = useState({ items: [] });
  const [displayValues, setDisplayValues] = useState([]);
  const [controlOptions, setControlOptions] = useState({
    internet: {},
  });
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const [isConnected, setConnected] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [lastEvent, setLastEvent] = useState({ id: 0, reportedAt: 0 });
  const [maxValue, setMaxValue] = useState(60);
  // eslint-disable-next-line no-unused-vars
  const [configValues, setConfigValues] = useConfigGlobalState('configValues');

  const { unit, sensor, title, isGGHomeConnected } = route.params;
  const [isFavourite, setIsFavourite] = useState(sensor.is_favourite);

  const addToFavorites = useCallback(async () => {
    const { success } = await axiosPost(
      API.SENSOR.ADD_TO_FAVOURITES(unit.id, sensor.station.id, sensor.id)
    );
    if (success) {
      setIsFavourite(true);
    }
  }, [unit, sensor]);

  const removeFromFavorites = useCallback(async () => {
    const { success } = await axiosPost(
      API.SENSOR.REMOVE_FROM_FAVOURITES(unit.id, sensor.station.id, sensor.id)
    );
    if (success) {
      setIsFavourite(false);
    }
  }, [unit, sensor]);

  const listMenuItemDefault = useMemo(
    () => [
      {
        text: t('edit'),
      },
      {
        text: t('remove_device'),
      },
    ],
    []
  );

  const listMenuItem = useMemo(() => {
    const menuItems = [];
    if (
      display.items.some((i) => getActionComponent(i.configuration.template))
    ) {
      menuItems.push({
        route: Routes.ActivityLog,
        data: { sensor },
        text: t('activity_log'),
      });
    }
    menuItems.push({
      route: Routes.DeviceInfo,
      text: t('device_info'),
      data: {
        deviceInfo: display.items.filter((item) => item.type === 'device_info'),
      },
    });
    if (!isFavourite) {
      menuItems.push({
        doAction: addToFavorites,
        text: t('add_to_favorites'),
      });
    } else {
      menuItems.push({
        doAction: removeFromFavorites,
        text: t('remove_from_favorites'),
      });
    }
    return [...listMenuItemDefault, ...menuItems];
  }, [
    display,
    sensor,
    isFavourite,
    listMenuItemDefault,
    addToFavorites,
    removeFromFavorites,
  ]);

  const currentUserId = useSelector((state) =>
    get(state, 'auth.account.user.id', 0)
  );

  const canManageSubUnit = useMemo(() => {
    return currentUserId === unit.user_id;
  }, [currentUserId, unit]);

  const fetchDataDeviceDetail = useCallback(async () => {
    if (!account.token) {
      return;
    }
    if (!sensor) {
      return;
    }

    const displayResult = await axiosGet(
      API.SENSOR.DISPLAY(sensor.id),
      {},
      true
    );

    if (displayResult.success) {
      setDisplay(displayResult.data);
      if (displayResult.data.items.length) {
        const config = displayResult.data.items[0].configuration;
        if (config.hasOwnProperty('max_value')) {
          setMaxValue(config.max_value);
        }
        if (config.hasOwnProperty('device')) {
          // for emergency
          setDeviceId(config.device.id);
          const last_event = config.device.last_event;
          if (last_event) {
            last_event.reportedAt = moment(last_event.reported_at);
            delete last_event.reported_at;
            setLastEvent(last_event);
          }
        }
      }
    }

    const controlResult = await axiosGet(
      API.SENSOR.REMOTE_CONTROL_OPTIONS(sensor.id),
      {},
      true
    );

    if (controlResult.success) {
      setControlOptions(controlResult.data);
    }
  }, [account.token, sensor, setDeviceId, setLastEvent]);

  const {
    setDeviceId,
    showAlertConfirm,
    countDown,
    onCancelConfirmAlert,
    onSendNowAlert,
    onEmergencyButtonPress,
    showAlertSent,
    onCloseAlertSent,
    onViewDetails,
  } = useEmergencyButton(fetchDataDeviceDetail);

  const {
    showPopupResolveSuccess,
    onPressResolveSituationConfirm,
    onCloseShowPopupResolveSuccess,
    onPressResolveSituation,
    stateAlertResolve,
    hideAlertResolve,
  } = useAlertResolveEmergency(lastEvent, fetchDataDeviceDetail);

  const { countUpStr } = useCountUp(lastEvent.reportedAt);

  useEffect(() => {
    if (controlOptions.bluetooth) {
      const bluetooth = controlOptions.bluetooth;
      scanBluetoothDevices([bluetooth.address]);
    }
  }, [controlOptions, unit]);

  useEffect(() => {
    fetchDataDeviceDetail();
  }, [sensor, fetchDataDeviceDetail]);

  const onRefresh = useCallback(() => {
    fetchDataDeviceDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sensor, fetchDataDeviceDetail]);

  const getData = useCallback(
    (item) => {
      if (!item.configuration) {
        return;
      }
      const data = item.configuration.configs.map((config) => {
        const value = displayValues.find((k) => k.id === config.id);
        if (!value) {
          return;
        }
        return { ...config, ...value };
      });
      return data.filter((value) => value);
    },
    [displayValues]
  );

  useEffect(() => {
    let params = new URLSearchParams();
    const configIds = [];

    display.items.map((item) => {
      if (item.type !== 'value') {
        return;
      }
      if (!item.configuration) {
        return;
      }

      item.configuration.configs.map((config) => {
        if (!configIds.includes(config.id)) {
          configIds.push(config.id);
        }
      });
    });

    configIds.map((id) => {
      params.append('config', id);
    });

    const fetchValues = async () => {
      const { success, data } = await axiosGet(
        API.SENSOR.DISPLAY_VALUES_V2(sensor.id),
        {
          params: params,
        }
      );
      if (success) {
        setDisplayValues(data.configs);
        setConnected(data.is_connected);
        transformDatetime(data, ['last_updated']);
        setLastUpdated(data.last_updated);
      }
    };
    if (sensor.is_managed_by_backend) {
      const updateInterval = setInterval(() => fetchValues(), 5000);
      fetchValues();
      return () => clearInterval(updateInterval);
    }
  }, [sensor, display]);

  useEffect(() => {
    setDisplayValues((currentDisplayValues) => {
      for (const [configId, value] of Object.entries(configValues)) {
        const intId = parseInt(configId);
        const index = _.findIndex(currentDisplayValues, (o) => o.id === intId);
        if (index !== -1) {
          currentDisplayValues[index].value = value;
          currentDisplayValues[index].evaluate = null;
        } else {
          currentDisplayValues.push({
            id: intId,
            value: value,
          });
        }
      }
      return currentDisplayValues;
    });
  }, [configValues, setDisplayValues]);

  const isShowEmergencyResolve =
    display.items.filter(
      (item) =>
        item.type === 'emergency' && item.configuration.type === 'detail'
    ).length > 0;

  const isShowSetupEmergencyContact =
    display.items.filter(
      (item) =>
        item.type === 'emergency' && item.configuration.type === 'button'
    ).length > 0;

  const isDisplayTime =
    display.items.filter(
      (item) => item.type !== 'action' && item.type !== 'camera'
    ).length > 0;

  const onSetupContacts = useCallback(() => {
    const group = unit.group;
    navigation.navigate(Routes.EmergencyContactsStack, {
      screen: Routes.EmergencyContactsList,
      params: { unitId: unit.id, group },
    });
  }, [navigation, unit.group, unit.id]);

  // replace isConnected=True to see template
  const renderSensorConnected = () => {
    if (!!sensor && !sensor.is_other_device) {
      if (isConnected) {
        return (
          <>
            <ConnectedViewHeader
              lastUpdated={lastUpdated}
              isDisplayTime={isDisplayTime}
            />
            {display.items.map((item) => (
              <SensorDisplayItem
                testID={TESTID.SENSOR_DISPLAY_ITEM}
                key={item.id.toString()}
                item={item}
                emergency={onEmergencyButtonPress}
                sensor={sensor}
                getData={getData}
                maxValue={maxValue}
                offsetTitle={offsetTitle}
                setOffsetTitle={setOffsetTitle}
              />
            ))}
          </>
        );
      } else {
        return <DisconnectedView sensor={sensor} />;
      }
    } else {
      if (isGGHomeConnected) {
        return (
          <>
            <ConnectedViewHeader
              lastUpdated={lastUpdated}
              type={'GoogleHome'}
            />
            {display.items.map((item) => (
              <SensorDisplayItem
                testID={TESTID.SENSOR_DISPLAY_ITEM}
                key={item.id.toString()}
                item={item}
                emergency={onEmergencyButtonPress}
                sensor={sensor}
                getData={getData}
                maxValue={maxValue}
                offsetTitle={offsetTitle}
                setOffsetTitle={setOffsetTitle}
              />
            ))}
          </>
        );
      } else {
        return <DisconnectedView sensor={sensor} type={'GoogleHome'} />;
      }
    }
  };

  const getDataFromLocal = async () => {
    const displayData = await getLocalData(
      `@CACHE_REQUEST_${API.SENSOR.DISPLAY(sensor.id)}`
    );
    displayData && setDisplay(JSON.parse(displayData));

    const controlOptionData = await getLocalData(
      `@CACHE_REQUEST_${API.SENSOR.REMOTE_CONTROL_OPTIONS(sensor.id)}`
    );
    controlOptionData && setControlOptions(JSON.parse(controlOptionData));
  };

  const onItemMenuClicked = (item) => {
    if (item.route) {
      navigation.navigate(item.route, item.data);
    } else if (item.doAction) {
      item.doAction();
    } else {
      alert(t('feature_under_development'));
    }
  };

  useEffect(() => {
    getDataFromLocal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { childRef, showingPopover, showPopoverWithRef, hidePopover } =
    usePopover();

  return (
    <View style={styles.wrap}>
      <HeaderDevice
        isFavourite={isFavourite}
        addToFavourites={addToFavorites}
        removeFromFavourites={removeFromFavorites}
        showPopoverWithRef={showPopoverWithRef}
      />
      <ScrollView
        style={styles.wrap}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
      >
        <Text bold type="H2" style={styles.title}>
          {title}
        </Text>
        <View style={styles.wrapTemplate}>{renderSensorConnected()}</View>
        {isShowSetupEmergencyContact && canManageSubUnit && (
          <BottomButtonView
            style={styles.bottomButtonEmergencyContact}
            mainIcon={<Icon name="phone" size={24} color={Colors.Gray9} />}
            mainTitle={t('emergency_contacts')}
            onPressMain={onSetupContacts}
            typeMain="CardShadow"
            semiboldMain={false}
          />
        )}
        <AlertSendConfirm
          showAlertConfirm={showAlertConfirm}
          countDown={countDown}
          onCancelConfirmAlert={onCancelConfirmAlert}
          onSendNowAlert={onSendNowAlert}
          unit={unit}
          station={sensor.station}
        />

        <AlertSent
          showAlertSent={showAlertSent}
          onClose={onCloseAlertSent}
          onPressMain={onViewDetails}
          unit={unit}
          station={sensor.station}
        />
      </ScrollView>
      {isShowEmergencyResolve && (
        <BottomButtonView
          style={styles.bottomButtonEmergencyResolve}
          mainIcon={<IconFill name="tool" size={15} color={Colors.Gray6} />}
          mainTitle={t('resolve_situation')}
          onPressMain={onPressResolveSituationConfirm}
          topComponent={<EmergencyCountdown countUpStr={countUpStr} />}
          typeMain="alertBorder"
        />
      )}
      <AlertAction
        visible={stateAlertResolve.visible}
        hideModal={hideAlertResolve}
        title={stateAlertResolve.title}
        message={stateAlertResolve.message}
        leftButtonTitle={stateAlertResolve.leftButton}
        leftButtonClick={hideAlertResolve}
        rightButtonTitle={stateAlertResolve.rightButton}
        rightButtonClick={onPressResolveSituation}
      />
      <ButtonPopup
        testID={TESTID.BUTTON_POPUP_RESOLVED}
        visible={showPopupResolveSuccess}
        mainTitle={t('ok')}
        onPressMain={onCloseShowPopupResolveSuccess}
        onClose={onCloseShowPopupResolveSuccess}
        typeMain="cancel"
      >
        <View style={styles.locationName}>
          <Text
            testID={TESTID.BUTTON_POPUP_RESOLVED_TITLE}
            type="H4"
            style={styles.textName}
          >
            {unit.name} - {sensor.station.name}
          </Text>
          <IconFill
            testID={TESTID.BUTTON_POPUP_RESOLVED_ICON}
            name="check-circle"
            size={42}
            color={Colors.Green6}
          />
          <Text
            semibold
            style={styles.textResolved}
            color={Colors.Green6}
            uppercase
          >
            {t('resolved')}
          </Text>
          <Text type="H4" style={styles.textYourEmergencySituation}>
            {t('your_emergency_situation_has_been_resolved')}
          </Text>
        </View>
      </ButtonPopup>
      <MenuActionMore
        isVisible={showingPopover}
        hideMore={hidePopover}
        listMenuItem={listMenuItem}
        childRef={childRef}
        onItemClick={onItemMenuClicked}
        wrapStyle={styles.menuAction}
      />
    </View>
  );
};

const DetailHistoryChart = ({ item, sensor }) => {
  const [chartData, setChartData] = useState(item.configuration.configs);
  const [startDate, setStartDate] = useState(
    moment().subtract(1, 'days').valueOf()
  );
  const [endDate, setEndDate] = useState(moment().valueOf());
  useEffect(() => {
    const fetchData = async () => {
      let params = new URLSearchParams();
      item.configuration.configs.map((config) => {
        params.append('config', config.id);
      });
      params.append('date_from', startDate / 1000);
      params.append('date_to', endDate / 1000);
      const { success, data } = await axiosGet(
        API.SENSOR.DISPLAY_HISTORY(sensor.id),
        { params }
      );
      if (success) {
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < data[i].data.length; j++) {
            data[i].data[j].x = moment(data[i].data[j].x).toDate();
          }
        }

        const formatData = item.configuration.configs.map((config) => {
          const dataChart = data.find((k) => k.config === config.id) || {
            data: [],
          };
          return { ...config, data: dataChart.data };
        });
        setChartData(formatData);
      }
    };
    fetchData();
  }, [startDate, endDate, item, sensor]);
  if (!chartData.length) {
    return false;
  }

  return (
    <HistoryChart
      configuration={item.configuration}
      datas={chartData}
      style={styles.chartStyle}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />
  );
};

const SensorDisplayItem = ({
  item,
  sensor,
  emergency,
  getData,
  maxValue,
  offsetTitle,
  setOffsetTitle,
}) => {
  const doAction = useCallback(
    (action, data) => {
      sendRemoteCommand(sensor, action, data);
    },
    [sensor]
  );

  switch (item.type) {
    case 'camera':
      return (
        <Card title={t('camera')}>
          <View style={styles.mediaContainer}>
            <MediaPlayer
              testID={TESTID.DEVICE_DETAIL_MEDIA_PLAYER}
              uri={item.configuration.uri}
              style={{ height: standardizeHeight }}
            />
          </View>
        </Card>
      );
    case 'action':
      return (
        <ActionGroup
          testID={TESTID.DEVICE_DETAIL_ACTION_GROUP}
          actionGroup={item.configuration}
          doAction={doAction}
          sensor={sensor}
        />
      );
    case 'history':
      return <DetailHistoryChart item={item} sensor={sensor} />;
    case 'value':
      switch (item.configuration.type) {
        case 'circle':
          return <CurrentRainSensor data={getData(item)} />;
        case 'simple_list':
          return <PMSensorIndicatior data={getData(item)} />;
        case 'gauge':
          return <Anemometer data={getData(item)} maxValue={maxValue} />;
        case 'compass':
          return <Compass data={getData(item)} />;
        case 'alert_status':
          return (
            <DeviceAlertStatus
              data={getData(item)}
              style={styles.marginLeft}
              offsetTitle={offsetTitle}
              setOffsetTitle={setOffsetTitle}
            />
          );
        case 'flat_list':
          return (
            <FlatListItems
              title={item.configuration.title}
              data={getData(item)}
              style={[styles.marginLeft, styles.marginVertical]}
              offsetTitle={offsetTitle}
            />
          );
        default:
          return <ListQualityIndicator data={getData(item)} />;
      }
    case 'emergency':
      switch (item.configuration.type) {
        case 'detail':
          return <EmergencyDetail item={item} />;
        default:
          return <EmergencyButton emergency={emergency} />;
      }
    case 'info':
      return <FooterInfo data={item.configuration} />;
    default:
      break;
  }
  return false;
};

const EmergencyCountdown = memo(({ countUpStr }) => (
  <View style={styles.countDown}>
    <Text type="Label" center style={styles.messageCountDown}>
      {t('time_since_the_emergency_button_was_pressed')}
    </Text>
    <Text type="H3" center semibold color={Colors.Red6}>
      {countUpStr}
    </Text>
  </View>
));

const mapStateToProps = (state) => ({
  account: state.auth.account,
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DeviceDetail);
