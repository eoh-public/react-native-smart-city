import React, { useState, useCallback } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

import BottomButtonView from '../../commons/BottomButtonView';
import Text from '../../commons/Text';
import RadioCircle from '../../commons/RadioCircle';
import DateTimeRangeChange from '../../commons/DateTimeRangeChange';
import { useTranslations } from '../../hooks/Common/useTranslations';
import { useBoolean } from '../../hooks/Common';

import { Colors } from '../../configs';
import styles from './styles/filterPopupStyles';
import { TESTID } from '../../configs/Constants';
import { ModalCustom } from '../../commons/Modal';

const RowMember = ({ member, isSelected, onSelect }) => {
  const handleOnPress = useCallback(() => {
    onSelect(member.id);
  }, [onSelect, member]);
  return (
    <TouchableOpacity
      style={styles.row}
      onPress={handleOnPress}
      testID={TESTID.ITEM_USER_FILTER}
    >
      <RadioCircle active={isSelected} />
      <View style={styles.wrapText}>
        <Text type="H4" color={Colors.Gray9}>
          {member.name
            ? member.name
            : member.phone_number
            ? member.phone_number
            : member.email}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const FilterPopup = ({
  isVisible,
  onHide,
  onShow,
  members,
  filters,
  onApply,
}) => {
  const t = useTranslations();
  const [lockShowing, acquireLockShowing, releaseLockShowing] =
    useBoolean(false);
  const [selectedUsers, setSelectedUsers] = useState(filters.users);
  const [stateDatePicker, setStateDatePicker] = useState({
    visible: false,
    startDate: filters.date_from,
    endDate: filters.date_to,
    currentTimeChange: 'start',
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
    onHide();
    acquireLockShowing();
    setStateDatePicker((state) => ({
      ...state,
      visible: true,
      currentTimeChange: 'start',
    }));
  }, [onHide, acquireLockShowing]);

  const onPickEndDate = useCallback(() => {
    onHide();
    acquireLockShowing();
    setStateDatePicker((state) => ({
      ...state,
      visible: true,
      currentTimeChange: 'end',
    }));
  }, [onHide, acquireLockShowing]);

  const onConfirmStartDate = useCallback((date) => {
    setStateDatePicker((state) => {
      if (moment(date).valueOf() < state.endDate) {
        return {
          ...state,
          visible: false,
          startDate: moment(date).valueOf(),
        };
      }
      return {
        ...state,
        visible: false,
        startDate: moment(date).valueOf(),
        endDate: moment(date).add(1, 'days').valueOf(),
      };
    });
  }, []);

  const onConfirmEndDate = useCallback((date) => {
    setStateDatePicker((state) => {
      if (moment(date).valueOf() > state.startDate) {
        return {
          ...state,
          visible: false,
          endDate: moment(date).valueOf(),
        };
      }
      return {
        ...state,
        visible: false,
        startDate: moment(date).add(-1, 'days').valueOf(),
        endDate: moment(date).valueOf(),
      };
    });
  }, []);

  const onConfirmDate = useCallback(
    (date) => {
      if (stateDatePicker.currentTimeChange === 'start') {
        onConfirmStartDate(date);
      } else {
        onConfirmEndDate(date);
      }
      onShow();
      acquireLockShowing();
    },
    [
      onConfirmStartDate,
      onConfirmEndDate,
      stateDatePicker,
      acquireLockShowing,
      onShow,
    ]
  );

  const onPickerCancel = useCallback(() => {
    setStateDatePicker((state) => ({
      ...state,
      visible: false,
    }));
    acquireLockShowing();
    onShow();
  }, [acquireLockShowing, onShow]);

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
    setStateDatePicker((state) => ({
      ...state,
      startDate: filters.date_from,
      endDate: filters.date_to,
    }));
    onHide();
  }, [setSelectedUsers, setStateDatePicker, filters, onHide]);

  return (
    <>
      <ModalCustom
        isVisible={isVisible && !lockShowing}
        onBackButtonPress={handleOnCancel}
        onBackdropPress={handleOnCancel}
        onModalHide={releaseLockShowing}
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
              {members.map((member, index) => (
                <RowMember
                  key={index}
                  member={member}
                  isSelected={
                    selectedUsers.includes(member.id) ||
                    (member.id === 0 && selectedUsers.length === 0)
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
      </ModalCustom>
      <DateTimePickerModal
        isVisible={stateDatePicker.visible && !lockShowing}
        date={
          stateDatePicker.currentTimeChange === 'start'
            ? new Date(stateDatePicker.startDate)
            : new Date(stateDatePicker.endDate)
        }
        mode={'date'}
        onConfirm={onConfirmDate}
        onCancel={onPickerCancel}
        onHide={releaseLockShowing}
        display="spinner"
      />
    </>
  );
};

export default FilterPopup;
