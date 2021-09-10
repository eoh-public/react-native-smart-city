import { useIsFocused, useNavigation } from '@react-navigation/native';
import { t } from 'i18n-js';
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';

import { API } from '../../configs';
import { Section, RadioCircle, ViewButtonBottom } from '../../commons';
import { axiosGet } from '../../utils/Apis/axios';
import Text from '../../commons/Text';
import Routes from '../../utils/Route';
import { TESTID } from '../../configs/Constants';
import styles from './SelectSubUnitStyles';
import Button from '../../commons/Button';

const AddCommonSelectSubUnit = ({ route }) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { addType, unit_id } = route.params;
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [unit, setUnit] = useState([]);
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');

  useEffect(() => {
    switch (addType) {
      case 'AddNewGateway':
        setTitle(t('add_new_gateway'));
        setSubTitle(t('select_a_sub_unit'));
        break;
      default:
        setTitle(t('add_new_gateway'));
        setSubTitle(t('select_a_sub_unit'));
        break;
    }
  }, [title, subTitle, addType]);

  const fetchDetails = useCallback(async () => {
    const { success, data } = await axiosGet(
      API.UNIT.UNIT_DETAIL(unit_id),
      {},
      true
    );
    if (success) {
      setUnit(data);
    }
  }, [unit_id]);

  useEffect(() => {
    isFocused && fetchDetails();
  }, [fetchDetails, isFocused]);

  const subUnits = unit.stations || [];

  const onPressNext = useCallback(() => {
    switch (addType) {
      case 'AddNewGateway':
        navigation.navigate(Routes.ScanChipQR, {
          station: subUnits[selectedIndex].id,
          unit_name: unit.name,
          ...route.params,
        });
        break;
      default:
        break;
    }
  }, [addType, navigation, subUnits, selectedIndex, unit.name, route.params]);

  const handleSelectIndex = (index) => {
    if (index !== selectedIndex) {
      setSelectedIndex(index);
    } else {
      setSelectedIndex(-1);
    }
  };

  const addSubUnit = useCallback(() => {
    navigation.navigate(Routes.AddSubUnitStack, {
      screen: Routes.AddSubUnit,
      params: { unit, ...route.params },
    });
  }, [navigation, unit, route.params]);

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
            {subUnits.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.rowContainer}
                onPress={() => handleSelectIndex(index)}
              >
                <RadioCircle
                  active={selectedIndex === index}
                  testID={TESTID.SELECT_UNIT_RADIO_BUTTON}
                />
                <TouchableOpacity
                  style={styles.row}
                  onPress={() => handleSelectIndex(index)}
                  testID={TESTID.SELECT_UNIT_SELECT}
                >
                  <Text style={styles.text} testID={TESTID.SELECT_UNIT_NAME}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </Section>
          <View style={styles.buttonAdd}>
            <Button
              type="primaryBorder"
              title={`${t('add_new_sub_unit')} +`}
              onPress={addSubUnit}
              width="auto"
              height={32}
              textType="setupBorder"
              textSemiBold={false}
            />
          </View>
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

export default AddCommonSelectSubUnit;
