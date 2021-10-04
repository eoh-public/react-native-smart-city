import React, { useState, useCallback } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

import BottomButtonView from '../../commons/BottomButtonView';
import Text from '../../commons/Text';
import RadioCircle from '../../commons/RadioCircle';
import { useTranslations } from '../../hooks/Common/useTranslations';

import { Colors } from '../../configs';
import styles from './Styles/FilterPopupStyles';
import { TESTID } from '../../configs/Constants';

const FilterPopup = ({ isVisible, onHide, members, filters, onApply }) => {
  const t = useTranslations();
  const [selectedUsers, setSelectedUsers] = useState(filters.users);

  const handleOnSelectUser = useCallback(
    (id) => {
      if (id === 0) {
        setSelectedUsers([]);
        return;
      }
      const index = selectedUsers.indexOf(id);
      if (index === -1) {
        setSelectedUsers([...selectedUsers, id]);
      } else {
        setSelectedUsers([
          ...selectedUsers.slice(0, index),
          ...selectedUsers.slice(index + 1),
        ]);
      }
    },
    [selectedUsers, setSelectedUsers]
  );

  const handleOnApply = useCallback(() => {
    onApply({
      users: selectedUsers,
    });
    onHide();
  }, [selectedUsers, onApply, onHide]);

  const handleOnCancel = useCallback(() => {
    setSelectedUsers(filters.users);
    onHide();
  }, [setSelectedUsers, filters.users, onHide]);

  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={handleOnCancel}
      onBackdropPress={handleOnCancel}
      useNativeDriver={true}
      useNativeDriverForBackdrop={true}
      animationIn={'zoomIn'}
      animationOut={'zoomOut'}
      style={styles.wrapPopup}
    >
      <View style={styles.popup}>
        <>
          <Text type="H4" style={styles.title} bold>
            {t('filters')}
          </Text>
          <View style={styles.separator} />
          <Text type="H4" style={styles.sectionTitle} bold>
            {t('by_user')}
          </Text>
          <ScrollView>
            {members.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.rowContainer}
                onPress={() => handleOnSelectUser(item.id)}
                testID={TESTID.ITEM_USER_FILTER}
              >
                <RadioCircle
                  active={
                    selectedUsers.includes(item.id) ||
                    (item.id === 0 && selectedUsers.length === 0)
                  }
                />
                <TouchableOpacity
                  style={styles.row}
                  onPress={() => handleOnSelectUser(item.id)}
                >
                  <Text type="H4" color={Colors.Gray9}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={styles.separator} />
        </>
        <BottomButtonView
          rowButton={true}
          style={styles.bottomButtonView}
          secondaryTitle={t('cancel')}
          mainTitle={t('apply')}
          onPressSecondary={handleOnCancel}
          onPressMain={handleOnApply}
        />
      </View>
    </Modal>
  );
};

export default FilterPopup;
