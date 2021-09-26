import React from 'react';
import { View } from 'react-native';
import styles from './OneTapStyles.js';
import { Section } from '../..';

import ItemAddNew from '../../Device/ItemAddNew';
import ItemOneTap from './ItemOneTap';
import { useTranslations } from '../../../hooks/Common/useTranslations';
import { useNavigation } from '@react-navigation/native';
import Routes from '../../../utils/Route/index.js';

const SubUnitAutomate = ({ isOwner, type, automates, unit }) => {
  const t = useTranslations();
  const { navigate } = useNavigation();
  const handleOnAddNew = () => {
    navigate(Routes.AddNewOneTap, { type: type, unit });
  };
  return (
    <Section style={styles.noShadow}>
      <View style={styles.boxDevices}>
        {!!automates.length &&
          automates.map((item) => (
            <ItemOneTap isOwner={isOwner} automate={item} unit={unit} />
          ))}
        <ItemAddNew title={t('add_new')} onAddNew={handleOnAddNew} />
      </View>
    </Section>
  );
};

export default SubUnitAutomate;
