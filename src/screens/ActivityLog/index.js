/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import { View, Text, SectionList, ActivityIndicator } from 'react-native';
import moment from 'moment';
import { t } from 'i18n-js';
import { Colors } from '../../configs';
import { HeaderCustom } from '../../commons/Header';
import { getTitleFromTime } from '../../utils/Converter/time';
import { useRoute } from '@react-navigation/native';
import useActivityLog from './hooks';
import styles from './Styles/indexStyles';

const keyExtractor = (item) => item.id;

const ActivityLogScreen = () => {
  const { params = {} } = useRoute();
  const { sensor } = params;
  const { data, isLoading, isRefreshing, onLoadMore, onRefresh } =
    useActivityLog(sensor);

  const Item = ({ item, length, index }) => {
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
          <Text style={styles.text}>
            {`${item.action} ${t('by')} `}
            <Text style={styles.name}>{item.name}</Text>
          </Text>
        </View>
      </View>
    );
  };

  const renderItem = ({ item, section, index }) => (
    <Item
      key={item.id}
      item={item}
      length={section.data.length - 1}
      index={index}
    />
  );

  const renderListEmptyComponent = () =>
    !isLoading &&
    !isRefreshing && (
      <Text style={styles.textDesNoActivity}>{t('no_activity')}</Text>
    );

  const renderListFooterComponent = () =>
    isLoading && (
      <ActivityIndicator color={Colors.Primary} style={styles.loadMore} />
    );

  const renderSectionHeader = ({ section: { data } }) => (
    <Text style={styles.title}>
      {getTitleFromTime(data[0].created_at, new Date())}
    </Text>
  );

  useEffect(() => {
    onRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.wrap}>
      <HeaderCustom title={t('activity_log')} isShowSeparator />
      <SectionList
        sections={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        style={styles.wrapList}
        stickySectionHeadersEnabled={false}
        ListEmptyComponent={renderListEmptyComponent}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.01}
        ListFooterComponent={renderListFooterComponent}
        extraData={data}
        removeClippedSubviews={true}
        maxToRenderPerBatch={20}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </View>
  );
};

export default ActivityLogScreen;
