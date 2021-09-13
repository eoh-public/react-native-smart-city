import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';
import { useTranslations } from '../../hooks/Common/useTranslations';

import Text from '../../commons/Text';

import styles from './styles';

const TabHeader = ({ current, getCurrentTab, showModal, textFilter }) => {
  const t = useTranslations();
  const [currentTab, setCurrentTabState] = useState(current);

  useEffect(() => {
    getCurrentTab(currentTab);
  }, [currentTab, getCurrentTab]);
  return (
    <View style={styles.tabHeaderContainer}>
      <View style={styles.tabHeaderLeftContainer}>
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.tabItem, currentTab === 0 && styles.tabItemActive]}
          onPress={() => setCurrentTabState(0)}
        >
          <Text
            bold
            style={[
              styles.textTabItem,
              currentTab === 0 && styles.textItemActive,
            ]}
          >
            {t('text_all_locations')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.tabItem, currentTab === 1 && styles.tabItemActive]}
          onPress={() => setCurrentTabState(1)}
        >
          <Text
            bold
            style={[
              styles.textTabItem,
              currentTab === 1 && styles.textItemActive,
            ]}
          >
            {t('text_starred')}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabHeaderSortContainer}>
        <TouchableOpacity onPress={showModal} style={styles.buttonSortBy}>
          <Text style={styles.sortBy}>
            {t('sort_by') + ': '} {textFilter}
          </Text>
          <IconOutline name="arrow-down" size={10} onPress={() => {}} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TabHeader;
