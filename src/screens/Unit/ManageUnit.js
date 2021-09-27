import React, { useState, useCallback, useEffect } from 'react';
import { View, TouchableOpacity, Image, Platform } from 'react-native';
import Modal from 'react-native-modal';
import Animated from 'react-native-reanimated';
import { useTranslations } from '../../hooks/Common/useTranslations';

import { Colors, API, Device, Images } from '../../configs';
import Routes from '../../utils/Route';
import { ToastBottomHelper } from '../../utils/Utils';
import {
  createFormData,
  axiosPatch,
  axiosDelete,
} from '../../utils/Apis/axios';
import { navigate } from '../../navigations/utils';
import useBoolean from '../../hooks/Common/useBoolean';
import useKeyboardAnimated from '../../hooks/Explore/useKeyboardAnimated';

import { AlertAction, ViewButtonBottom, ImagePicker } from '../../commons';
import Text from '../../commons/Text';
import _TextInput from '../../commons/Form/TextInput';
import WrapHeaderScrollable from '../../commons/Sharing/WrapHeaderScrollable';

import { useIsOwnerOfUnit } from '../../hooks/Common';
import { TESTID } from '../../configs/Constants';
import { IconOutline } from '@ant-design/icons-react-native';
import styles from './ManageUnitStyles';
import { useNavigation } from '@react-navigation/native';

const ButtonWrapper = ({
  onPress,
  testId,
  title,
  value,
  valueColor,
  children,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      testID={testId}
      style={styles.buttonWrapper}
    >
      <View style={styles.buttonInfo}>
        <Text type="H4" semibold>
          {title}
        </Text>
        <View style={styles.buttonValue}>
          <Text
            type="Body"
            color={valueColor || Colors.Gray7}
            style={styles.value}
          >
            {value}
          </Text>
          <IconOutline name="right" size={20} color={Colors.Gray7} />
        </View>
      </View>
      {children}
    </TouchableOpacity>
  );
};

const ManageUnit = ({ route }) => {
  const t = useTranslations();
  const { unit } = route.params;
  const navigation = useNavigation();
  const { isOwner } = useIsOwnerOfUnit(unit.user_id);
  const [showEdit, setshowEdit, setHideEdit] = useBoolean();
  const [unitData, setUnitData] = useState({
    name: unit.name,
    address: unit.address,
    background: unit.background,
  });

  const [unitName, setUnitName] = useState(unit.name);
  const [imageUrl, setImageUrl] = useState('');
  const [showImagePicker, setShowImagePicker] = useState(false);

  const updateUnit = useCallback(
    async (bodyData, headers) => {
      const formData = createFormData(bodyData, ['background']);

      const { success, data } = await axiosPatch(
        API.UNIT.MANAGE_UNIT(unit.id),
        formData,
        headers
      );
      if (success) {
        setUnitData({ ...data });
        ToastBottomHelper.success(t('unit_updated_successfully'));
      }
    },
    [unit.id, t]
  );

  const updateLocation = useCallback(
    async (address) => {
      await updateUnit({ address }, {});
    },
    [updateUnit]
  );

  const goSelectLocation = useCallback(() => {
    navigation.navigate(Routes.UnitStack, {
      screen: Routes.SelectLocation,
      params: {
        updateLocation,
      },
    });
  }, [navigation, updateLocation]);

  const goRename = useCallback(async () => {
    await updateUnit({ name: unitName }, {});
    setHideEdit(true);
  }, [unitName, setHideEdit, updateUnit]);

  const handleChoosePhoto = useCallback(() => {
    setShowImagePicker(true);
  }, [setShowImagePicker]);

  useEffect(() => {
    if (imageUrl) {
      updateUnit(
        { background: imageUrl },
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
    }
  }, [imageUrl, updateUnit]);

  const [showRemove, setshowRemove, setHideRemove] = useBoolean();
  const goRemove = useCallback(async () => {
    const { success } = await axiosDelete(API.UNIT.MANAGE_UNIT(unit.id));
    if (success) {
      setHideEdit(true);
      ToastBottomHelper.success(t('unit_deleted_successfully'));
      navigate(Routes.Dashboard);
    }
  }, [unit.id, setHideEdit, t]);

  const goToManageSubUnit = useCallback(() => {
    navigation.navigate(Routes.UnitStack, {
      screen: Routes.ManageSubUnit,
      params: {
        unit,
      },
    });
  }, [navigation, unit]);

  const [transY] = useKeyboardAnimated(-16);
  const animatedStyle = Platform.select({
    ios: {
      marginBottom: transY,
    },
  });

  const options = {
    mediaType: 'photo',
    maxWidth: 1024,
    quality: 0.8,
    includeBase64: Device.isIOS,
    saveToPhotos: true,
  };

  return (
    <>
      <WrapHeaderScrollable
        title={t('manage_unit')}
        styleScrollView={styles.scrollView}
      >
        <View style={styles.wraper}>
          {isOwner && (
            <>
              <ButtonWrapper
                onPress={setshowEdit}
                testID={TESTID.MANAGE_UNIT_CHANGE_NAME}
                title={t('unit_name')}
                value={unitData.name}
              />
              <ButtonWrapper
                onPress={goSelectLocation}
                title={t('location')}
                testID={TESTID.MANAGE_UNIT_CHANGE_LOCATION}
              >
                <Text type="Body" color={Colors.Gray7} style={styles.location}>
                  {unitData.address}
                </Text>
              </ButtonWrapper>
              <ButtonWrapper
                onPress={goToManageSubUnit}
                title={t('manage_sub_units')}
                value={`${unit?.stations?.length} sub-units`}
              />
              <ButtonWrapper
                onPress={handleChoosePhoto}
                title={t('unit_wallpaper')}
                value={t('tap_to_change')}
                valueColor={Colors.Orange}
                testID={TESTID.MANAGE_UNIT_CHANGE_PHOTO}
              >
                <View style={styles.boxImage}>
                  <Image
                    source={{
                      uri: unit.background,
                    }}
                    borderRadius={10}
                    style={styles.image}
                    defaultSource={Images.BgDevice}
                    resizeMode="cover"
                    testID={TESTID.SUB_UNIT_BACKGROUND}
                  />
                </View>
              </ButtonWrapper>

              <ImagePicker
                showImagePicker={showImagePicker}
                setShowImagePicker={setShowImagePicker}
                setImageUrl={setImageUrl}
                optionsCapture={options}
                testID={TESTID.MANAGE_UNIT_IMAGE_PICKER}
              />
            </>
          )}
        </View>
      </WrapHeaderScrollable>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={setshowRemove}
        testID={TESTID.MANAGE_UNIT_SHOW_REMOVE}
      >
        <Text
          type={'H4'}
          semibold
          color={Colors.Red}
          style={styles.removeBorderBottom}
        >
          {t('remove_unit')}
        </Text>
      </TouchableOpacity>
      <Modal
        isVisible={showEdit}
        onBackButtonPress={setHideEdit}
        onBackdropPress={setHideEdit}
        style={styles.modalContainer}
        testID={TESTID.MANAGE_UNIT_MODAL_RENAME}
      >
        <Animated.View style={[styles.popoverStyle, animatedStyle]}>
          <View style={styles.modalWrapper}>
            <View style={styles.modalHeader}>
              <Text semibold style={styles.modalHeaderText}>
                {t('rename_unit')}
              </Text>
            </View>
            <_TextInput
              defaultValue={unitName}
              onChange={(value) => setUnitName(value)}
              textInputStyle={styles.textInputStyle}
              wrapStyle={styles.textInputWrapStyle}
              selectionColor={Colors.Primary}
              testID={TESTID.MANAGE_UNIT_MODAL_RENAME_INPUT_NAME}
            />

            <ViewButtonBottom
              leftTitle={t('cancel')}
              onLeftClick={setHideEdit}
              rightTitle={t('rename')}
              onRightClick={goRename}
              testIDPrefix={TESTID.PREFIX.MANAGE_UNIT}
            />
          </View>
        </Animated.View>
      </Modal>
      <AlertAction
        visible={showRemove}
        hideModal={setHideRemove}
        title={t('remove_unit_name', { name: unitName })}
        message={t('remove_note')}
        leftButtonTitle={t('cancel')}
        leftButtonClick={setHideRemove}
        leftButtonStyle={styles.leftButtonStyle}
        rightButtonTitle={t('remove')}
        rightButtonClick={goRemove}
        rightButtonStyle={styles.rightButtonStyle}
        testIDPrefix={TESTID.PREFIX.MANAGE_UNIT_ALERT}
      />
    </>
  );
};

export default ManageUnit;
