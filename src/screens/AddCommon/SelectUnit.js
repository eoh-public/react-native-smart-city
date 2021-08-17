import { useNavigation } from '@react-navigation/native';
import t from 'i18n-js';
import React, { useCallback, useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  StatusBar,
  Platform,
} from 'react-native';

import { API, Colors } from '../../configs';
import { Section, RadioCircle, ViewButtonBottom } from '../../commons';
import { axiosGet } from '../../utils/Apis/axios';
import Text from '../../commons/Text';
import Routes from '../../utils/Route';
import { TESTID } from '../../configs/Constants';

const AddCommonSelectUnit = ({ route }) => {
  const navigation = useNavigation();
  const { addType } = route.params;
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [units, setUnits] = useState([]);
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');

  useEffect(() => {
    switch (addType) {
      case 'AddSubUnit':
        setTitle(t('add_new_sub_unit'));
        setSubTitle(t('add_new_subunit_select_unit'));
        break;
      case 'AddDevice':
        setTitle(t('add_new_device'));
        setSubTitle(t('first_select_a_unit'));
        break;
      case 'AddMember':
        setTitle(t('text_select_a_unit'));
        setSubTitle(t('text_select_a_unit_desc'));
        break;
      case 'AddLGDevice': // TODO mr make options from AddDevice
        setTitle(t('text_select_a_unit'));
        setSubTitle(t('first_select_a_unit'));
        break;
      default:
        setTitle(t('add_new_sub_unit'));
        setSubTitle(t('add_new_subunit_select_unit'));
        break;
    }
  }, [title, subTitle, addType]);

  useEffect(() => {
    (async () => {
      const { data, success } = await axiosGet(API.SHARE.UNITS);
      if (success) {
        const normalizeData = data.map((unit) => ({
          name: unit.name,
          id: unit.id,
        }));
        setUnits(normalizeData);
      }
    })();
  }, []);

  const onPressNext = useCallback(() => {
    switch (addType) {
      case 'AddSubUnit':
        navigation.navigate(Routes.AddSubUnit, {
          unit: units[selectedIndex],
        });
        break;
      case 'AddDevice':
        navigation.navigate(Routes.AddNewDevice, {
          unit_id: units[selectedIndex].id,
        });
        break;
      case 'AddMember':
        navigation.navigate(Routes.SharingSelectPermission, {
          unit: units[selectedIndex],
        });
        break;
      case 'AddLGDevice':
        navigation.navigate(Routes.AddLGDevice, {
          code: route.params.code,
          backend_url: route.params.backend_url
            .replace(/%2F/g, '/')
            .replace(/%3A/g, ':'),
          unit_id: units[selectedIndex].id,
        });
        break;
      default:
        break;
    }
  }, [addType, navigation, units, selectedIndex, route.params]);

  return (
    <SafeAreaView style={styles.container}>
      <Text semibold style={styles.title}>
        {title}
      </Text>
      <Text style={styles.subtitle}>{subTitle}</Text>
      <View style={styles.contentContainer}>
        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <Section type={'border'}>
            {units.map((item, index) => (
              <View key={index} style={styles.rowContainer}>
                <RadioCircle
                  active={selectedIndex === index}
                  testID={TESTID.SELECT_UNIT_RADIO_BUTTON}
                />
                <TouchableOpacity
                  style={styles.row}
                  onPress={() => {
                    setSelectedIndex(index);
                  }}
                  testID={TESTID.SELECT_UNIT_SELECT}
                >
                  <Text style={styles.text} testID={TESTID.SELECT_UNIT_NAME}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </Section>
        </ScrollView>
        <ViewButtonBottom
          leftTitle={t('cancel')}
          onLeftClick={() => navigation.goBack()}
          rightTitle={t('next')}
          rightDisabled={selectedIndex === -1}
          onRightClick={onPressNext}
          testIDPrefix={TESTID.PREFIX.SELECT_UNIT}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Gray2,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollContainer: {
    width: '100%',
    flex: 1,
  },
  title: {
    color: Colors.Gray9,
    fontSize: 20,
    lineHeight: 28,
    marginTop: 8,
    marginBottom: 4,
    marginLeft: 16,
  },
  subtitle: {
    color: Colors.Gray8,
    fontSize: 14,
    lineHeight: 22,
    marginLeft: 16,
    marginBottom: 16,
  },
  row: {
    flex: 1,
    paddingVertical: 16,
    borderBottomColor: Colors.Gray4,
    borderBottomWidth: 1,
    marginRight: 24,
    marginLeft: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.Gray9,
  },
});

export default AddCommonSelectUnit;
