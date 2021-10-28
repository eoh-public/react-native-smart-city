import React from 'react';
import { View } from 'react-native';
import { useTranslations } from '../../../hooks/Common/useTranslations';

import { Section } from '../../Section';
import ItemDevice from '../../Device/ItemDevice';
import ItemOneTap from '../OneTap/ItemOneTap';
import ItemAddNew from '../../Device/ItemAddNew';
import styles from './styles';

const SubUnitFavorites = ({ unit, isOwner, favorites, isGGHomeConnected }) => {
  const t = useTranslations();

  const handleOnAddNew = () => {
    alert(t('feature_under_development'));
  };

  return (
    <Section style={styles.noShadow}>
      <View style={styles.boxDevices}>
        {!!favorites.devices &&
          favorites.devices.map((sensor, index) => (
            <ItemDevice
              key={`device-${sensor.id}`}
              id={sensor.id}
              svgMain={sensor.icon || 'sensor'}
              statusIcon={sensor.action && sensor.action.icon}
              statusColor={sensor.action && sensor.action.color}
              description={sensor.value}
              title={sensor.name}
              index={index}
              sensor={sensor}
              unit={unit}
              station={sensor.station}
              isGGHomeConnected={isGGHomeConnected}
            />
          ))}
        {!!favorites.automates &&
          favorites.automates.map((automate) => (
            <ItemOneTap
              key={`automate-${automate.id}`}
              isOwner={isOwner}
              automate={automate}
              unit={unit}
            />
          ))}
        <ItemAddNew title={t('add_to_favorites')} onAddNew={handleOnAddNew} />
      </View>
    </Section>
  );
};

export default SubUnitFavorites;
