import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { t } from 'i18n-js';
import moment from 'moment';

import { API, Colors, Device } from '../../configs';
import { axiosGet } from '../../utils/Apis/axios';
import { standardizeCameraScreenSize } from '../../utils/Utils';
import useTitleHeader from '../../hooks/Common/useTitleHeader';
import { sendRemoteCommand } from '../../iot/RemoteControl';
import { scanBluetoothDevices } from '../../iot/RemoteControl/Bluetooth';

import ActionGroup from '../../commons/ActionGroup';
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
import { get } from 'lodash';
import { useSelector } from 'react-redux';

import { transformDatetime } from '../../utils/Converter/time';
import { IconFill } from '@ant-design/icons-react-native';
import { AlertAction, ButtonPopup } from '../../commons';
import { Icon } from '@ant-design/react-native';
import EmergencyButton from '../../commons/Device/Emergency/EmergencyButton';
import { TESTID } from '../../configs/Constants';
import FooterInfo from '../../commons/Device/FooterInfo';
import { useCountUp } from './hooks/useCountUp';
import { navigate } from '../../navigations/utils';
import Routes from '../../utils/Route';

const offsetTitle = 50;

const { standardizeWidth, standardizeHeight } = standardizeCameraScreenSize(
  Device.screenWidth - 32
);

const DeviceDetail = ({ account, route }) => {
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

  const { unit, station, sensor, title } = route.params;

  const currentUserId = useSelector((state) =>
    get(state, 'auth.account.user.id', 0)
  );

  const canManageSubUnit = useMemo(() => {
    return currentUserId === unit.user_id;
  }, [currentUserId, unit]);

  useTitleHeader(title);
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
  }, [controlOptions]);

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
    if (configIds.length) {
      const updateInterval = setInterval(() => fetchValues(), 5000);
      fetchValues();
      return () => clearInterval(updateInterval);
    }
  }, [sensor, display]);

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

  const onSetupContacts = useCallback(() => {
    navigate(Routes.ManageSubUnit, { station });
  }, [station]);

  return (
    <SafeAreaView style={styles.wrap}>
      <ScrollView
        style={styles.wrap}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
      >
        {isConnected ? (
          <>
            <ConnectedViewHeader lastUpdated={lastUpdated} />
            {display.items.map((item) => (
              <SensorDisplayItem
                key={item.id.toString()}
                item={item}
                emergency={onEmergencyButtonPress}
                sensor={sensor}
                getData={getData}
                maxValue={maxValue}
              />
            ))}
          </>
        ) : (
          <DisconnectedView sensor={sensor} />
        )}
        <AlertSendConfirm
          showAlertConfirm={showAlertConfirm}
          countDown={countDown}
          onCancelConfirmAlert={onCancelConfirmAlert}
          onSendNowAlert={onSendNowAlert}
          unit={unit}
          station={station}
        />

        <AlertSent
          showAlertSent={showAlertSent}
          onClose={onCloseAlertSent}
          onPressMain={onViewDetails}
          unit={unit}
          station={station}
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
      {isShowSetupEmergencyContact && canManageSubUnit && (
        <BottomButtonView
          style={styles.bottomButtonEmergencyContact}
          mainIcon={<Icon name="plus" size={15} color={Colors.Primary} />}
          mainTitle={t('setup_my_emergency_contact')}
          onPressMain={onSetupContacts}
          textTypeMain="Body"
          typeMain="setupBorder"
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
            {unit.name} - {station.name}
          </Text>
          <IconFill
            testID={TESTID.BUTTON_POPUP_RESOLVED_ICON}
            name="check-circle"
            size={42}
            color={Colors.Green6}
          />
          <Text semibold style={styles.textResolved} color={Colors.Green6}>
            {t('resolved')}
          </Text>
          <Text type="H4" style={styles.textYourEmergencySituation}>
            {t('your_emergency_situation_has_been_resolved')}
          </Text>
        </View>
      </ButtonPopup>
    </SafeAreaView>
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

const SensorDisplayItem = ({ item, sensor, emergency, getData, maxValue }) => {
  const doAction = useCallback(
    (action) => {
      sendRemoteCommand(sensor, action);
    },
    [sensor]
  );

  switch (item.type) {
    case 'camera':
      return (
        <View style={styles.mediaContainer}>
          <MediaPlayer
            uri={item.configuration.uri}
            previewUri={item.configuration.preview_uri}
            style={{ height: standardizeHeight }}
          />
        </View>
      );
    case 'action':
      return (
        <ActionGroup actionGroup={item.configuration} doAction={doAction} />
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
              style={[styles.marginLeft, styles.moveDownOffset]}
            />
          );
        case 'flat_list':
          return (
            <FlatListItems
              title={item.configuration.title}
              data={getData(item)}
              style={[styles.marginLeft, styles.marginVertical]}
              styleTitle={styles.moveUpOffset}
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

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  mediaContainer: {
    alignSelf: 'center',
    width: standardizeWidth,
    height: standardizeHeight,
  },
  chartStyle: {
    paddingHorizontal: 16,
  },
  bottomButtonEmergencyResolve: {
    borderTopWidth: 1,
    borderColor: Colors.Gray4,
    backgroundColor: Colors.White,
    height: 158,
  },
  bottomButtonEmergencyContact: {
    marginHorizontal: 16,
    marginBottom: 32,
  },
  countDown: {
    marginBottom: 16,
    marginTop: 8,
  },
  messageCountDown: {
    marginBottom: 8,
  },
  locationName: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  textName: {
    marginBottom: 19,
  },
  textResolved: {
    fontSize: 30,
    marginTop: 19,
    marginBottom: 24,
  },
  textYourEmergencySituation: {
    textAlign: 'center',
  },
  marginLeft: {
    marginLeft: 16,
  },
  marginVertical: {
    marginVertical: 10,
  },
  moveUpOffset: {
    bottom: offsetTitle,
  },
  moveDownOffset: {
    top: offsetTitle - 10,
  },
});

const mapStateToProps = (state) => ({
  account: state.auth.account,
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DeviceDetail);
