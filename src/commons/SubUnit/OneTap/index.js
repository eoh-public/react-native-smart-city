import React from 'react';
import { View } from 'react-native';
import styles from './OneTapStyles.js';
import { Section } from '../..';

import ItemAddNew from '../../Device/ItemAddNew';
import ItemOneTap from './ItemOneTap';
import { useTranslations } from '../../../hooks/Common/useTranslations';

const SubUnitOneTap = ({ automates }) => {
  const t = useTranslations();
  const handleOnAddNew = () => {
    // eslint-disable-next-line no-alert
    alert(t('feature_under_development'));
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
