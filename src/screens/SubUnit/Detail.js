import React, { useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { get } from 'lodash';
import { useTranslations } from '../../hooks/Common/useTranslations';

import Routes from '../../utils/Route';
import { usePopover } from '../../hooks/Common';
import Text from '../../commons/Text';
import ItemDevice from '../../commons/Device/ItemDevice';
import WrapParallaxScrollView from '../../commons/WrapParallaxScrollView';
import MediaPlayer from '../../commons/MediaPlayer';
import { MenuActionMore } from '../../commons';
import { useSCContextSelector } from '../../context';
import styles from './DetailStyles';

const SubUnitDetail = ({ route }) => {
  const t = useTranslations();
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

export default SubUnitDetail;
