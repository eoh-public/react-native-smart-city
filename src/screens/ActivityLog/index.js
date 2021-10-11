/* eslint-disable no-shadow */
import React, { useEffect, useMemo } from 'react';
import {
  View,
  Text,
  SectionList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useTranslations } from '../../hooks/Common/useTranslations';
import { Icon } from '@ant-design/react-native';
import { Colors } from '../../configs';
import { HeaderCustom } from '../../commons/Header';
import ItemLog from './ItemLog';
import FilterPopup from './FilterPopup';
import { getTitleFromTime } from '../../utils/Converter/time';
import { useBoolean } from '../../hooks/Common';
import useActivityLog from './hooks';
import styles from './styles/indexStyles';
import { TESTID } from '../../configs/Constants';

const keyExtractor = (item) => item.id;

const ActivityLogScreen = ({ route }) => {
  const t = useTranslations();
  const { id, type, share } = route.params;
  const {
    data,
    isLoading,
    isRefreshing,
    onLoadMore,
    onRefresh,
    members,
    fetchMembers,
    filterEnabled,
    filters,
    setFilters,
  } = useActivityLog({ id, type, share });
  const [showFilterPopup, setShowFilterPopup, setHideFilterPopup] =
    useBoolean();

  const renderItem = ({ item, section, index }) => {
    return (
      <ItemLog
        key={item.id}
        item={item}
        type={type}
        length={section.data.length - 1}
        index={index}
      />
    );
  };

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
  }, [filters]);

  useEffect(() => {
    fetchMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const headerRight = useMemo(
    () => (
      <TouchableOpacity
        onPress={setShowFilterPopup}
        testID={TESTID.FILTER_BUTTON}
      >
        <Icon name={'filter'} size={27} color={Colors.Black} />
      </TouchableOpacity>
    ),
    [setShowFilterPopup]
  );

  return (
    <>
      <View style={styles.wrap}>
        <HeaderCustom
          title={t('activity_log')}
          rightComponent={filterEnabled && headerRight}
          isShowSeparator
        />
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
      {filterEnabled && (
        <FilterPopup
          isVisible={showFilterPopup}
          onHide={setHideFilterPopup}
          onShow={setShowFilterPopup}
          members={members}
          filters={filters}
          onApply={setFilters}
        />
      )}
    </>
  );
};

export default ActivityLogScreen;
