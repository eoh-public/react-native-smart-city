import React, { memo, useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker, Circle, PROVIDER_GOOGLE } from 'react-native-maps';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { useNavigation } from '@react-navigation/native';
import { useTranslations } from '../../hooks/Common/useTranslations';

import { Colors } from '../../configs';
import Text from '../../commons/Text';
import { ViewButtonBottom } from '../../commons';
import PinLocation from '../../../assets/images/AddLocationMaps/PinLocation.svg';

export const initialRadius = 250;
const initialRegion = {
  latitudeDelta: 0.0090222,
  longitudeDelta: 0.009221,
};

const AddLocationMaps = memo(() => {
  const t = useTranslations();
  const { goBack } = useNavigation();
  const [color, setColor] = useState(Colors.Black);
  useEffect(() => {
    setColor(Colors.DaybreakBlue);
  }, [setColor]);

  const selectedCoordinates = { latitude: 10.7993573, longitude: 106.7050793 };

  const onDone = useCallback(() => {}, []);
  const onBack = useCallback(() => {
    goBack();
  }, [goBack]);

  return (
    <View style={styles.container}>
      <Text color={Colors.Gray9} size={24} semibold style={styles.textHeader}>
        {t('geolocation')}
      </Text>
      <View style={styles.content}>
        <Text color={Colors.Gray8} size={12} style={styles.textExplain}>
          {t('text_explain_add_geolocation')}
        </Text>
        <Text color={Colors.Black} size={16} style={styles.textAddress}>
          298/3 Điện Biên Phủ, phường 17, quận Bình Thạnh, Thành phố Hồ Chí
          Minh, Việt Nam
        </Text>
        <View style={styles.mapContainer}>
          <MapView
            provider={PROVIDER_GOOGLE}
            region={{
              ...selectedCoordinates,
              ...initialRegion,
            }}
            style={styles.mapView}
          >
            <Marker
              coordinate={selectedCoordinates}
              anchor={{ x: 0.5, y: 0.5 }}
              calloutOffset={{ x: 1, y: 1 }}
              tracksViewChanges={false}
            >
              <PinLocation />
            </Marker>
            <Circle
              center={selectedCoordinates}
              radius={initialRadius}
              strokeColor={Colors.Blue6}
              fillColor={color}
              zIndex={2}
              strokeWidth={1}
            />
          </MapView>
        </View>
      </View>
      <ViewButtonBottom
        leftTitle={t('cancel')}
        onLeftClick={onBack}
        rightTitle={t('done')}
        onRightClick={onDone}
      />
    </View>
  );
});

export default AddLocationMaps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Gray2,
    paddingTop: getStatusBarHeight() + 16,
  },
  textHeader: {
    marginHorizontal: 16,
  },
  content: {
    marginTop: 16,
    paddingTop: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: Colors.White,
    borderWidth: 1,
    borderColor: Colors.Gray4,
    flex: 1,
  },
  textExplain: {
    lineHeight: 20,
    marginHorizontal: 16,
  },
  textAddress: {
    lineHeight: 24,
    margin: 16,
  },
  mapContainer: {
    flex: 1,
  },
  mapView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
