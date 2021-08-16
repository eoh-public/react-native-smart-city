import React, { useMemo, useState, useCallback, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { t } from 'i18n-js';

import { API, Colors } from '../../configs';
import { axiosGet } from '../../utils/Apis/axios';
import { useBlockBackAndroid } from '../../hooks/Common';
import useKeyboard from '../../hooks/Explore/useKeyboardAnimated';

import HeaderExplore from '../../commons/Explore/HeaderExplore';
import HeaderLabel from '../../commons/Explore/HeaderLabel';
import LocationItem from '../../commons/Explore/LocationItem';
import CityItem from '../../commons/Explore/CityItem';
import { useSCContextSelector } from '../../context';

navigator.geolocation = require('@react-native-community/geolocation');

let page = 1;

const Explore = ({ navigation }) => {
  useBlockBackAndroid();
  const [transY] = useKeyboard(80);

  const animatedStyle = {
    marginBottom: transY,
  };

  useSCContextSelector((state) => state.language);

  //TODO remove redux
  const unitsNearMe = useMemo(() => [], []);
  const unitsPublic = [];
  const [onEndReached, setOnEndReached] = useState(true);
  const maxPageUnitPublic = 1;
  // const maxPageUnitPublic = useSelector(
  //   (state) => state.unit.maxPageUnitPublic
  // );
  const [coords, setCoords] = useState({ lat: null, lon: null });

  const fetchUnitsPublic = useCallback(async (pageId) => {
    const { success } = await axiosGet(API.UNIT.UNITS_PUBLIC, {
      params: { page: pageId },
    });
    if (success) {
      //dispatch(fetchUnitsPublicSuccess(data));
    } else {
      //dispatch(fetchUnitsPublicFail());
    }
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const currentLongitude = position.coords.longitude;
        const currentLatitude = position.coords.latitude;
        //TODO fetch unit near me
        // dispatch(fetchUnitsNearMe(currentLatitude, currentLongitude, 1));
        setCoords({ lat: currentLatitude, lon: currentLongitude });
      },
      // eslint-disable-next-line promise/prefer-await-to-callbacks
      (error) => {}
    );
    fetchUnitsPublic(1);
  }, [fetchUnitsPublic]);

  const listHeader = useCallback(() => {
    return (
      <>
        <HeaderExplore />

        <View style={[styles.label, styles.noPaddingHorizontal]}>
          <HeaderLabel
            title={t('location_near_me')}
            style={styles.locationHeader}
            onPress={() => {
              navigation.navigate('LocationNearMe', {
                coords: coords,
              });
            }}
            seeMore
          />
          <ScrollView
            style={{}}
            horizontal={true}
            contentContainerStyle={styles.locationContent}
            showsHorizontalScrollIndicator={false}
          >
            {!!unitsNearMe &&
              unitsNearMe.map((item) => (
                <LocationItem key={item.id} item={item} />
              ))}
          </ScrollView>
        </View>

        <View style={styles.populationView}>
          <HeaderLabel seeMore={false} title={t('popular_locations')} />
        </View>
      </>
    );
  }, [unitsNearMe, coords, navigation]);

  const itemCity = useCallback(({ item }) => {
    return <CityItem item={item} />;
  }, []);

  const handleEndReachUnitPublic = () => {
    if (!onEndReached) {
      page += 1;
      if (page <= maxPageUnitPublic) {
        fetchUnitsPublic(page);
      }
      setOnEndReached(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[{ backgroundColor: Colors.White }, animatedStyle]}>
        <FlatList
          data={unitsPublic}
          ListHeaderComponent={listHeader}
          ListHeaderComponentStyle={styles.listHeader}
          initialNumToRender={10}
          renderItem={itemCity}
          keyExtractor={(item) => item.id.toString()}
          onEndReachedThreshold={0.01}
          onMomentumScrollBegin={() => setOnEndReached(false)}
          onEndReached={handleEndReachUnitPublic}
        />
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Gray2,
  },
  label: {
    padding: 16,
    backgroundColor: Colors.White,
    marginBottom: 16,
    shadowColor: Colors.Black,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,

    elevation: 5,
  },
  locationHeader: {
    paddingHorizontal: 16,
  },
  populationView: {
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: Colors.White,
  },
  listHeader: {
    backgroundColor: Colors.Gray2,
    marginBottom: 8,
  },
  locationContent: {
    flexDirection: 'row',
    marginTop: 8,
    paddingHorizontal: 16,
  },
  noPaddingHorizontal: {
    paddingHorizontal: 0,
  },
});

export default Explore;
