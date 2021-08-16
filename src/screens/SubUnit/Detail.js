import React, { useCallback, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { get } from 'lodash';
import { t } from 'i18n-js';

import { Device, Colors, Theme } from '../../configs';
import { standardizeCameraScreenSize } from '../../utils/Utils';
import Routes from '../../utils/Route';
import { useAndroidTranslucentStatusBar, usePopover } from '../../hooks/Common';
import Text from '../../commons/Text';
import ItemDevice from '../../commons/Device/ItemDevice';
import WrapParallaxScrollView from '../../commons/WrapParallaxScrollView';
import MediaPlayer from '../../commons/MediaPlayer';
import MenuActionMore from '../../commons/MenuActionMore';
import { useSCContextSelector } from '../../context';

const { standardizeWidth, standardizeHeight } = standardizeCameraScreenSize(
  Device.screenWidth - 32
);

const SubUnitDetail = ({ route }) => {
  const { unit, station, isGGHomeConnected } = route.params;
  const language = useSCContextSelector((state) => state.language);
  const navigation = useNavigation();
  const { childRef, showingPopover, showPopoverWithRef, hidePopover } =
    usePopover();

  const currentUserId = useSCContextSelector((state) =>
    get(state, 'auth.account.user.id', 0)
  );

  const canManageSubUnit = useCallback(() => {
    return currentUserId === unit.user_id;
  }, [currentUserId, unit]);

  useAndroidTranslucentStatusBar();

  // TODO remove redux
  // const arrStation = useSelector((state) => state.unit.unitDetail.stations);

  // const checkID = useCallback(() => {
  //   const result = arrStation.find((x) => x.id === station.id)
  //     ? 'true'
  //     : 'false';
  //   return result;
  // }, [arrStation, station]);
  // const idExists = checkID();
  // const stationState =
  //   idExists === 'true' ? arrStation.find((x) => x.id === station.id) : station;
  const stationState = station;

  const devices = stationState.sensors;

  const listMenuItem = useMemo(
    () => [
      {
        route: Routes.ManageSubUnit,
        data: { station: stationState },
        text: t('manage_sub_unit'),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [stationState, language]
  );

  const onItemClick = useCallback(
    (routeName, data) => {
      hidePopover();
      routeName && navigation.navigate(routeName, data);
    },
    [navigation, hidePopover]
  );

  const onBack = useCallback(() => {
    const { routes } = navigation.dangerouslyGetParent().dangerouslyGetState();
    const calledByRoute = routes[routes.length - 1].name;
    if (calledByRoute === Routes.AddSubUnitStack) {
      // go from dashboard
      navigation.dangerouslyGetParent().pop(2);
    } else {
      navigation.pop(2);
    }
  }, [navigation]);

  const onItemClickAddMore = useCallback(
    (item) => {
      onItemClick(item.route, item.data);
      item.onPress && item.onPress();
    },
    [onItemClick]
  );

  const onAdd = useCallback(() => {
    navigation.navigate(Routes.AddDeviceStack, {
      screen: Routes.ScanSensorQR,
      params: {
        station_id: station.id,
        unit_id: unit.id,
        unit_name: unit.name,
      },
    });
  }, [navigation, station, unit]);

  return (
    <WrapParallaxScrollView
      uriImg={stationState.background}
      title={stationState.name}
      onBack={onBack}
      onAdd={onAdd}
      onMore={showPopoverWithRef}
      childRef={childRef}
      hideRight={!canManageSubUnit()}
    >
      <View style={styles.wrap}>
        {stationState.camera && (
          <>
            <Text style={styles.subUnitTitle}>{t('camera')}</Text>
            <View style={styles.boxCamera}>
              <MediaPlayer
                uri={stationState.camera.uri}
                key={`camera-${stationState.camera.id}`}
              />
            </View>
          </>
        )}
        {devices.length !== 0 ? (
          <View>
            <Text style={styles.subUnitTitle}>
              {t('text_all_devices')} ({devices.length})
            </Text>
            <View style={styles.boxDevices}>
              {devices.map((item, index) => {
                return (
                  <ItemDevice
                    key={`sensor-${item.id}`}
                    id={item.id}
                    svgMain={item.icon || 'door'}
                    statusIcon={item.action && item.action.icon}
                    statusColor={item.action && item.action.color}
                    title={item.name}
                    description={item.value}
                    index={index}
                    sensor={item}
                    unit={unit}
                    station={station}
                    isGGHomeConnected={isGGHomeConnected}
                  />
                );
              })}
            </View>
          </View>
        ) : (
          <View style={styles.boxEmptyDevices}>
            <Text style={styles.emptyDevice}>{t('empty_device')}</Text>
          </View>
        )}
      </View>

      <MenuActionMore
        isVisible={showingPopover}
        hideMore={hidePopover}
        listMenuItem={listMenuItem}
        childRef={childRef}
        onItemClick={onItemClickAddMore}
      />
    </WrapParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  boxCamera: {
    height: standardizeHeight,
    width: standardizeWidth,
    alignSelf: 'center',
    borderRadius: 10,
    ...Theme.shadow,
  },
  subUnitTitle: {
    fontSize: 20,
    lineHeight: 28,
    color: Colors.Gray8,
    marginLeft: 16,
    marginTop: 24,
    marginBottom: 8,
  },
  emptyDevice: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: 28,
    color: Colors.Border,
  },
  boxDevices: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  boxEmptyDevices: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 16,
  },
});

export default SubUnitDetail;
