import React from 'react';
import { View } from 'react-native';
import styles from './OneTapStyles.js';
import { Section } from '../..';

import ItemAddNew from '../../Device/ItemAddNew';
import ItemOneTap from './ItemOneTap';
import { useTranslations } from '../../../hooks/Common/useTranslations';
import { useNavigation } from '@react-navigation/native';
import Routes from '../../../utils/Route/index.js';

const SubUnitOneTap = ({ automates }) => {
  const t = useTranslations();
  const navigation = useNavigation();
  const handleOnAddNew = () => {
    navigation.navigate(Routes.AddNewOneTap);
  };
  return (
    <Section style={styles.noShadow}>
      <View style={styles.boxDevices}>
        <ItemAddNew title={t('add_new')} onAddNew={handleOnAddNew} />
        {!!automates.length &&
          automates.map((item) => <ItemOneTap automate={item} />)}
      </View>
    </Section>
  );
};

export default SubUnitOneTap;
