import React, { useState, useCallback } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import BottomButtonView from '../../commons/BottomButtonView';
import Text from '../../commons/Text';
import RadioCircle from '../../commons/RadioCircle';
import DateTimeRangeChange from '../../commons/DateTimeRangeChange';
import { useTranslations } from '../../hooks/Common/useTranslations';

import { Colors } from '../../configs';
import styles from './styles/filterPopupStyles';
import { TESTID } from '../../configs/Constants';
import moment from 'moment';

const RowUser = ({ item, isSelected, onSelect }) => {
  const handleOnPress = useCallback(() => {
    onSelect(item.id);
  }, [onSelect, item]);
  return (
    <TouchableOpacity
      style={styles.row}
      onPress={handleOnPress}
      testID={TESTID.ITEM_USER_FILTER}
    >
      <RadioCircle active={isSelected} />
      <View style={styles.wrapText}>
        <Text type="H4" color={Colors.Gray9}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const FilterPopup = ({ isVisible, onHide, members, filters, onApply }) => {
  const t = useTranslations();
  const [selectedUsers, setSelectedUsers] = useState(filters.users);
  const [stateDatePicker, setStateDatePicker] = useState({
    showModalStart: false,
    showModalEnd: false,
    startDate: filters.date_from,
    endDate: filters.date_to,
  });

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

  const onPickStartDate = useCallback(() => {
    setStateDatePicker({
      ...stateDatePicker,
      showModalStart: true,
      showModalEnd: false,
    });
  }, [stateDatePicker]);
  const onPickEndDate = useCallback(() => {
    setStateDatePicker({
      ...stateDatePicker,
      showModalStart: false,
      showModalEnd: true,
    });
  }, [stateDatePicker]);

  const onConfirmStartDate = (date) => {
    if (moment(date).valueOf() < stateDatePicker.endDate) {
      setStateDatePicker({
        ...stateDatePicker,
        showModalStart: false,
        startDate: moment(date).valueOf(),
      });
    } else {
      setStateDatePicker({
        ...stateDatePicker,
        showModalStart: false,
        startDate: moment(date).valueOf(),
        endDate: moment(date).add(1, 'days').valueOf(),
      });
    }
  };

  const onConfirmEndDate = (date) => {
    if (moment(date).valueOf() > stateDatePicker.startDate) {
      setStateDatePicker({
        ...stateDatePicker,
        showModalEnd: false,
        endDate: moment(date).valueOf(),
      });
    } else {
      setStateDatePicker({
        ...stateDatePicker,
        showModalEnd: false,
        startDate: moment(date).add(-1, 'days').valueOf(),
        endDate: moment(date).valueOf(),
      });
    }
  };

  const onPickerCancel = useCallback(() => {
    setStateDatePicker({
      ...stateDatePicker,
      showModalEnd: false,
      showModalStart: false,
    });
  }, [stateDatePicker]);

  const handleOnApply = useCallback(() => {
    onApply({
      users: selectedUsers,
      date_from: stateDatePicker.startDate,
      date_to: stateDatePicker.endDate,
    });
    onHide();
  }, [selectedUsers, stateDatePicker, onApply, onHide]);

  const handleOnCancel = useCallback(() => {
    setSelectedUsers(filters.users);
    setStateDatePicker({
      ...stateDatePicker,
      startDate: filters.date_from,
      endDate: filters.date_to,
    });
    onHide();
  }, [setSelectedUsers, setStateDatePicker, stateDatePicker, filters, onHide]);

  return (
    <>
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
              {t('by_date')}
            </Text>
            <DateTimeRangeChange
              startTime={stateDatePicker.startDate}
              endTime={stateDatePicker.endDate}
              onStart={onPickStartDate}
              onEnd={onPickEndDate}
              formatType="date"
              inline={false}
            />
            <Text type="H4" style={styles.sectionTitle} bold>
              {t('by_user')}
            </Text>
            <ScrollView>
              {members.map((item, index) => (
                <RowUser
                  key={index}
                  item={item}
                  isSelected={
                    selectedUsers.includes(item.id) ||
                    (item.id === 0 && selectedUsers.length === 0)
                  }
                  onSelect={handleOnSelectUser}
                />
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
      <DateTimePickerModal
        isVisible={stateDatePicker.showModalStart}
        date={stateDatePicker.startDate}
        mode={'date'}
        onConfirm={onConfirmStartDate}
        onCancel={onPickerCancel}
        display="spinner"
      />
      <DateTimePickerModal
        isVisible={stateDatePicker.showModalEnd}
        date={stateDatePicker.endDate}
        mode={'date'}
        onConfirm={onConfirmEndDate}
        onCancel={onPickerCancel}
        display="spinner"
      />
    </>
  );
};

export default FilterPopup;
