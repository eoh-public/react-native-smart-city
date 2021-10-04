import React from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';
import t from '../../hooks/Common/useTranslations';
import styles from './Styles/ItemLogStyles';

const DetailActionLog = ({ item }) => {
  return (
    <Text style={styles.text}>
      {`${item.action_name} ${t('by')} `}
      <Text style={styles.name}>{item.name}</Text>
    </Text>
  );
};

const DetailSmartAssistantLog = () => {
  return <Text style={styles.text}>{t('auto_activated')}</Text>;
};

const DetailOneTapLog = ({ item }) => {
  return (
    <Text style={styles.text}>
      {`${t('activated_by')} `}
      <Text style={styles.name}>{item.params.username}</Text>
    </Text>
  );
};

const itemDetailMaps = {
  action: DetailActionLog,
  'automate.AUTO_ACTIVATED': DetailSmartAssistantLog,
  'automate.ACTIVATED_BY': DetailOneTapLog,
};

const ItemLog = ({ item, type, length, index }) => {
  const itemType = item.content_code ? `${type}.${item.content_code}` : type;
  const DetailComponent = itemDetailMaps[itemType];

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
