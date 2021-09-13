/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useCallback, useRef, useState } from 'react';
import { View } from 'react-native';

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import BottomButtonView from '../../commons/BottomButtonView';

import { useTranslations } from '../../hooks/Common/useTranslations';
import { API } from '../../configs';
import styles from './SelectLocationStyles';
import SearchBarLocation from './components/SearchLocation';
import RowLocation from './components/SearchLocation/RowLocation';
import { axiosGet } from '../../utils/Apis/axios';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { SCConfig } from '../../configs';

const initialRegion = {
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const DEFAULT_LATITUDE = 10.7974046; // EoH center
const DEFAULT_LONGITUDE = 106.7035663;

const SelectLocation = memo(({ route }) => {
  const t = useTranslations();
  const { updateLocation } = route.params;
  const { goBack } = useNavigation();
  const [input, setInput] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [searchedLocation, setSearchedLocation] = useState(null);
  const mapRef = useRef(null);

  const onTextInput = useCallback(async (input) => {
    setInput(input);
    if (!input) {
      setSearchData([]);
      setSearchedLocation(null);
      return;
    }
    try {
      const config = {
        params: {
          input: input,
          key: SCConfig.GOOGLE_MAP_API_KEY,
          sessiontoken: 123456324,
          strictBounds: false,
          types: ['establishment'],
        },
      };

      const { success, data } = await axiosGet(
        API.EXTERNAL.GOOGLE_MAP.AUTO_COMPLETE,
        config
      );
      if (success) {
        setSearchData(data.predictions);
      }
    } catch (error) {}
  }, []);

  const animateToRegion = useCallback((lat, lng) => {
    if (!mapRef || !mapRef.current) {
      return;
    }

    mapRef.current.animateToRegion(
      {
        latitude: lat,
        longitude: lng,
        ...initialRegion,
      },
      600
    );
  }, []);

  const onPressRowLocation = useCallback(async (item) => {
    setInput(item.description);
    setSearchData([]);
    const body = {
      params: {
        place_id: item.place_id,
        key: SCConfig.GOOGLE_MAP_API_KEY,
      },
    };

    const { success, data } = await axiosGet(
      API.EXTERNAL.GOOGLE_MAP.GET_LAT_LNG_BY_PLACE_ID,
      body
    );
    if (success) {
      const { location } = data.result.geometry;
      animateToRegion(location.lat, location.lng);
      setSearchedLocation({
        description: item.description,
        latitude: location.lat,
        longitude: location.lng,
      });
    }
  }, []);

  const onDone = useCallback(() => {
    if (!searchedLocation) {
      return;
    }

    updateLocation(searchedLocation.description);
    goBack();
  }, [goBack, updateLocation, searchedLocation]);

  return (
    <View style={styles.wrap}>
      <View style={styles.searchLocation}>
        <SearchBarLocation input={input} onTextInput={onTextInput} />
        <ScrollView style={styles.searchData}>
          {searchData.map((item) => (
            <RowLocation item={item} onPress={onPressRowLocation} />
          ))}
        </ScrollView>
      </View>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.mapView}
        initialRegion={{
          ...initialRegion,
          latitude: DEFAULT_LATITUDE,
          longitude: DEFAULT_LONGITUDE,
        }}
        followUserLocation={true}
      >
        {searchedLocation && (
          <Marker
            coordinate={{
              latitude: searchedLocation.latitude,
              longitude: searchedLocation.longitude,
            }}
            tracksViewChanges={false}
          />
        )}
      </MapView>
      <BottomButtonView
        rowButton
        style={styles.bottomButton}
        mainTitle={t('done')}
        onPressMain={onDone}
        secondaryTitle={t('cancel')}
        onPressSecondary={goBack}
        typeMain="primaryText"
        typeSecondary="primaryText"
      />
    </View>
  );
});

export default SelectLocation;
