import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { View, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { axiosGet } from '../../utils/Apis/axios';
import { useTranslations } from '../../hooks/Common/useTranslations';

import { API } from '../../configs';
import Text from '../../commons/Text';
import SharedUnit from '../../commons/Unit/SharedUnit';
import {
  useTitleHeader,
  useBoolean,
  useBlockBackAndroid,
} from '../../hooks/Common';

import styles from './styles';
import TabHeader from './TabHeader';
import { useSCContextSelector } from '../../context';
import { ModalCustom } from '../../commons/Modal';

const Shared = () => {
  useBlockBackAndroid();
  const t = useTranslations();
  useTitleHeader(t('text_shared_with_me'));
  const navigation = useNavigation();
  const [tab, setTabActiveState] = useState(0);

  const [sharedUnits, setSharedUnits] = useState([]);

  const dataStarred = useMemo(
    () => sharedUnits.filter((sharedUnit) => sharedUnit.is_star),
    [sharedUnits]
  );

  const renewItem = useCallback(
    (index) => {
      sharedUnits.splice(index, 1, { ...sharedUnits[index] });
      setSharedUnits([...sharedUnits]);
    },
    [sharedUnits, setSharedUnits]
  );

  const [filter, setFilter] = useState('-created_at');
  const [textFilter, setTextFilter] = useState(t('text_latest_date'));
  const [showModal, setShowModal, setHideModal] = useBoolean();

  const filterSharedUnits = useCallback(async (field, config) => {
    const { success, data } = await axiosGet(
      API.UNIT.FILTER_SHARED_UNITS(field),
      config
    );
    if (success) {
      setSharedUnits(data);
    }
  }, []);

  const onFilter = useCallback(
    (newFilter, newTextFilter) => {
      setFilter(newFilter);
      filterSharedUnits(newFilter);
      setTextFilter(newTextFilter);
      setHideModal();
    },
    [filterSharedUnits, setHideModal]
  );

  const language = useSCContextSelector((state) => state.language);
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  useEffect(() => {
    forceUpdate();
  }, [language, forceUpdate]);

  useEffect(() => {
    filterSharedUnits(filter);
  }, [filterSharedUnits, filter]);

  const onRefresh = useCallback(() => {
    filterSharedUnits(filter);
  }, [filterSharedUnits, filter]);

  const listFilter = useMemo(
    () => [
      {
        id: 1,
        filter: '-created_at',
        textFilter: t('text_latest_date'),
      },
      {
        id: 2,
        filter: 'unit__name',
        textFilter: t('text_name'),
      },
      {
        id: 3,
        filter: 'date',
        textFilter: t('text_view_only'),
      },
      {
        id: 4,
        filter: 'date',
        textFilter: t('text_can_edit'),
      },
    ],
    [t]
  );

  return (
    <View style={styles.container}>
      <TabHeader
        current={tab}
        getCurrentTab={(index) => setTabActiveState(index)}
        showModal={setShowModal}
        textFilter={textFilter}
      />

      <View style={[styles.wrap]}>
        {tab === 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={onRefresh} />
            }
            data={sharedUnits}
            renderItem={({ item, index }) => {
              return (
                <SharedUnit
                  key={`${item.id}-${item.is_star}-${item.is_pin}`}
                  navigation={navigation}
                  item={item}
                  index={index}
                  renewItem={renewItem}
                />
              );
            }}
            keyExtractor={(item, index) => item.id.toString()}
            ItemSeparatorComponent={() => <View style={styles.seperator} />}
            contentContainerStyle={styles.scrollView}
          />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={onRefresh} />
            }
            data={dataStarred}
            ListEmptyComponent={() => <View />}
            renderItem={({ item, index }) => {
              return (
                <SharedUnit
                  key={`${item.id}-${item.is_star}-${item.is_pin}`}
                  navigation={navigation}
                  item={item}
                  index={index}
                  renewItem={renewItem}
                />
              );
            }}
            keyExtractor={(item, index) => item.id.toString()}
            ItemSeparatorComponent={() => <View style={styles.seperator} />}
            contentContainerStyle={styles.scrollView}
          />
        )}
      </View>
      <ModalCustom
        isVisible={showModal}
        onBackButtonPress={setHideModal}
        onBackdropPress={setHideModal}
        style={styles.noMargin}
      >
        <View style={styles.popoverStyle}>
          <View style={styles.modalWrapper}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>{t('sort_by')}</Text>
            </View>
            <View style={styles.modalContentContainer}>
              {listFilter.map((item, index) => {
                return (
                  <TouchableOpacity
                    style={styles.row}
                    onPress={() => onFilter(item.filter, item.textFilter)}
                    key={`filter-${index}`}
                  >
                    <Text
                      style={
                        textFilter === item.textFilter
                          ? styles.textActive
                          : styles.text
                      }
                    >
                      {item.textFilter}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      </ModalCustom>
    </View>
  );
};

export default Shared;
