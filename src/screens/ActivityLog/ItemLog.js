import React from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';
import t from '../../hooks/Common/useTranslations';
import styles from './styles/itemLogStyles';
import { AUTOMATE_TYPE } from '../../configs/Constants';

const DetailManualActivatedLog = ({ item }) => (
  <Text style={styles.text}>
    {item.action_name
      ? `${item.action_name} ${t('by')} `
      : `${t('activated_by')} `}
    <Text style={styles.name}>{item.name || item.params?.username}</Text>
  </Text>
);

const DetailAutoActivatedLog = () => (
  <Text style={styles.text}>{t('auto_activated')}</Text>
);

const itemDetailMaps = {
  ['action']: DetailManualActivatedLog,
  ['automate']: DetailAutoActivatedLog,
  [`automate.${AUTOMATE_TYPE.ONE_TAP}`]: DetailManualActivatedLog,
};

const ItemLog = ({ item, type, length, index }) => {
  const DetailComponent = itemDetailMaps[type];
  return (
    <View style={styles.wrapItem}>
      <Text style={styles.textLeft}>
        {moment(item.created_at).format('HH:mm')}
      </Text>
      <View style={styles.separatedView}>
        <View style={styles.circle} />
        {index !== length && <View style={styles.straightLine} />}
      </View>
      <View style={styles.wrapText}>
        <DetailComponent item={item} />
      </View>
    </View>
  );
};

export default ItemLog;
