import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { useTranslations } from '../../../hooks/Common/useTranslations';

import { Colors, API, Device } from '../../../configs';
import Routes from '../../../utils/Route';
import { ToastBottomHelper } from '../../../utils/Utils';
import {
  createFormData,
  axiosPatch,
  axiosDelete,
} from '../../../utils/Apis/axios';
import { navigate } from '../../../navigations/utils';
import useBoolean from '../../../hooks/Common/useBoolean';
import useKeyboardAnimated from '../../../hooks/Explore/useKeyboardAnimated';

import {
  AlertAction,
  Section,
  ViewButtonBottom,
  ImagePicker,
} from '../../../commons';

import Text from '../../../commons/Text';
import _TextInput from '../../../commons/Form/TextInput';
import WrapHeaderScrollable from '../../../commons/Sharing/WrapHeaderScrollable';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { useIsOwnerOfUnit } from '../../../hooks/Common';
import { TESTID } from '../../../configs/Constants';
import { ModalCustom } from '../../../commons/Modal';

const ManageUnit = ({ route }) => {
  const t = useTranslations();
  const { unit } = route.params;
  const { isOwner } = useIsOwnerOfUnit(unit.user_id);
  const [showEdit, setshowEdit, setHideEdit] = useBoolean();
  const [unitName, setUnitName] = useState(unit.name);
  const [imageUrl, setImageUrl] = useState('');
  const [showImagePicker, setShowImagePicker] = useState(false);

  const updateUnit = useCallback(
    async (headers) => {
      const formData = createFormData(imageUrl, ['background']);

      const { success } = await axiosPatch(
        API.UNIT.MANAGE_UNIT(unit.id),
        formData,
        headers
      );
      if (success) {
        ToastBottomHelper.success(t('unit_updated_successfully'));
      }
    },
    [imageUrl, unit.id, t]
  );

  const goRename = useCallback(async () => {
    await updateUnit({ name: unitName }, {});
    setHideEdit(true);
  }, [unitName, setHideEdit, updateUnit]);

  const handleChoosePhoto = useCallback(() => {
    setShowImagePicker(true);
  }, [setShowImagePicker]);

  useEffect(() => {
    if (imageUrl) {
      updateUnit({
        headers: { 'Content-Type': 'multipart/form-data' },
      });
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
      <WrapHeaderScrollable title={t('manage_unit')}>
        <View style={styles.wraper}>
          {isOwner && (
            <Section type={'border'}>
              <TouchableOpacity
                onPress={setshowEdit}
                testID={TESTID.TOUCH_UNIT_IN_MANAGE_UNIT}
              >
                <Text style={[styles.textWraper, styles.unitName]}>
                  {unit.name}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.textWraper]}>
                <Text style={styles.unitName}>{t('geolocation')}</Text>
                <Text style={styles.unitGeolocation}>{unit.address}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.backgroundContainer]}
                onPress={handleChoosePhoto}
              >
                <Text style={[styles.unitName, styles.textBackground]}>
                  {t('background')}
                </Text>
                <Image
                  style={styles.image}
                  source={{ uri: unit.background }}
                  resizeMode="cover"
                />
              </TouchableOpacity>

              <ImagePicker
                showImagePicker={showImagePicker}
                setShowImagePicker={setShowImagePicker}
                setImageUrl={setImageUrl}
                optionsCapture={options}
              />
            </Section>
          )}
        </View>
      </WrapHeaderScrollable>
      <TouchableOpacity style={styles.removeButton} onPress={setshowRemove}>
        <Text type={'H4'} semibold color={Colors.Gray6}>
          {t('remove_unit')}
        </Text>
      </TouchableOpacity>
      <ModalCustom
        isVisible={showEdit}
        onBackButtonPress={setHideEdit}
        onBackdropPress={setHideEdit}
        style={styles.modalContainer}
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
            />

            <ViewButtonBottom
              leftTitle={t('cancel')}
              onLeftClick={setHideEdit}
              rightTitle={t('rename')}
              onRightClick={goRename}
            />
          </View>
        </Animated.View>
      </ModalCustom>
      <AlertAction
        visible={showRemove}
        hideModal={setHideRemove}
        title={t('remove_unit_name', { name: unitName })}
        message={t('remove_note')}
        leftButtonTitle={t('cancel')}
        leftButtonClick={setHideRemove}
        rightButtonTitle={t('remove')}
        rightButtonClick={goRemove}
      />
    </>
  );
};

const styles = StyleSheet.create({
  wraper: {
    flex: 1,
  },
  textWraper: {
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 0.5,
  },
  unitName: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 24,
    color: Colors.Gray9,
  },
  unitGeolocation: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.Primary,
  },
  removeButton: {
    position: 'absolute',
    bottom: 0,
    borderWidth: 0,
    alignSelf: 'center',
    paddingBottom: 16 + getBottomSpace(),
  },
  backgroundContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 0.5,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
  },
  textBackground: {
    flex: 1,
    paddingTop: 16,
    paddingBottom: 16,
  },
  modalContainer: {
    flex: 1,
    margin: 0,
  },
  popoverStyle: {
    width: '100%',
    backgroundColor: Colors.White,
    bottom: 0,
    left: 0,
    position: 'absolute',
    borderRadius: 10,
  },
  modalWrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.White,
    borderRadius: 10,
  },
  modalHeader: {
    padding: 16,
    backgroundColor: Colors.White,
    borderBottomWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: Colors.Gray4,
  },
  modalHeaderText: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.Gray9,
  },
  textInputStyle: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Primary,
    fontSize: 16,
    marginLeft: 16,
    marginRight: 16,
    paddingHorizontal: 0,
  },
  textInputWrapStyle: {
    marginTop: 0,
  },
});

export default ManageUnit;
