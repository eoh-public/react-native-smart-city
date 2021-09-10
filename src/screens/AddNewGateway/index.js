import React, { memo, useCallback, useMemo, useState } from 'react';
import { ScrollView, SafeAreaView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { t } from 'i18n-js';

import { Colors } from '../../configs';
import { Section, ViewButtonBottom } from '../../commons';
import Text from '../../commons/Text';
import Routes from '../../utils/Route';
import { TESTID } from '../../configs/Constants';
import styles from './AddNewGatewayStyles';

const AddNewGateway = memo(({ route }) => {
  const { unit_id, wifiName, wifiPass, imei } = route.params;
  const { navigate, goBack } = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [chipName, setChipName] = useState('');

  const onRight = useCallback(() => {
    !!imei &&
      navigate(Routes.AddCommonSelectSubUnit, {
        unit_id: unit_id,
        chipName,
        imei,
        phoneNumber,
        wifiName,
        wifiPass,
        addType: 'AddNewGateway',
      });
  }, [chipName, imei, navigate, phoneNumber, unit_id, wifiName, wifiPass]);

  const onChangePhoneNumber = useCallback((text) => {
    setPhoneNumber(text);
  }, []);

  const onChangeChipName = useCallback((text) => {
    setChipName(text);
  }, []);

  const isValid = useMemo(() => {
    if (!chipName) {
      return false;
    }
    if (!imei) {
      return false;
    }
    return true;
  }, [chipName, imei]);

  return (
    <SafeAreaView style={styles.wrap}>
      <Text
        testID={TESTID.ADD_NEW_GATEWAY_ADD}
        semibold
        size={20}
        color={Colors.Black}
        style={styles.textHeader}
      >
        {t('add_new_gateway')}
      </Text>
      <Text
        testID={TESTID.ADD_NEW_GATEWAY_THEN_SELECT}
        size={14}
        color={Colors.Gray8}
        style={styles.textNote}
      >
        {t('please_add_your_phone_number_and_chip_name')}
      </Text>

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Section type={'border'}>
          {!wifiName && (
            <TextInput
              value={phoneNumber}
              style={styles.textInput}
              placeholder={t('phone_number_of_data_sim')}
              underlineColorAndroid={null}
              keyboardType={'phone-pad'}
              onChangeText={onChangePhoneNumber}
            />
          )}
          <TextInput
            value={chipName}
            style={styles.textInput}
            placeholder={t('gateway_name')}
            underlineColorAndroid={null}
            keyboardType={'num-pad'}
            onChangeText={onChangeChipName}
          />
        </Section>
      </ScrollView>

      <ViewButtonBottom
        leftTitle={t('text_back')}
        onLeftClick={goBack}
        rightTitle={t('text_next')}
        rightDisabled={!isValid}
        onRightClick={onRight}
      />
    </SafeAreaView>
  );
});

export default AddNewGateway;
