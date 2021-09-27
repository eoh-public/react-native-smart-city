import React, { useState, useCallback, useEffect } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useTranslations } from '../../hooks/Common/useTranslations';

import { Colors, API, Device } from '../../configs';
import { ToastBottomHelper } from '../../utils/Utils';
import {
  axiosPatch,
  axiosDelete,
  createFormData,
} from '../../utils/Apis/axios';
import Routes from '../../utils/Route';
import useBoolean from '../../hooks/Common/useBoolean';

import { ImagePicker, Section } from '../../commons';
import AlertAction from '../../commons/AlertAction';
import _TextInput from '../../commons/Form/TextInput';
import ViewButtonBottom from '../../commons/ViewButtonBottom';
import Text from '../../commons/Text';
import { TESTID } from '../../configs/Constants';
import { IconOutline } from '@ant-design/icons-react-native';
import { useEmeragencyContacts } from './hooks/useEmergencyContacts';
import styles from './EditSubUnitStyles';

const EditSubUnit = ({ route }) => {
  const { unit, station } = route.params;
  const t = useTranslations();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [resourcePath, setResourcePath] = useState({ uri: station.background });
  const [
    showModalRemoveSubUnit,
    setShowModalRemoveSubUnit,
    setHideModalRemoveSubUnit,
  ] = useBoolean();
  const [imageUrl, setImageUrl] = useState('');
  const [showImagePicker, setShowImagePicker] = useState(false);

  const [showEdit, setshowEdit, setHideEdit] = useBoolean();
  const [inputName, setInputName] = useState(station.name);
  const [newName, setNewName] = useState(station.name);

  const group = station?.emergency_group;

  const { listContacts, getListContacts } = useEmeragencyContacts();

  useEffect(() => {
    if (isFocused) {
      group && getListContacts(group.id);
    }
  }, [getListContacts, group, isFocused]);

  const onBack = useCallback(() => {
    const { routes } = navigation.dangerouslyGetState();
    const calledByRoute = routes[routes.length - 3].name;

    switch (calledByRoute) {
      case Routes.UnitDetail:
        navigation.pop(2);
        break;
      default:
        navigation.pop(3);
    }
  }, [navigation]);

  const updateSubUnit = useCallback(
    async (params, headers) => {
      const { success, data } = await axiosPatch(
        API.SUB_UNIT.MANAGE_SUB_UNIT(unit.id, station.id),
        params,
        headers
      );

      if (success) {
        // dispatch(manageSubUnit(station.id, data));
        setNewName(data.name);
        ToastBottomHelper.success(t('text_rename_sub_unit_success'));
      }
    },
    [unit.id, station.id, t]
  );
  const updateBackground = useCallback(
    async (headers) => {
      const formData = createFormData(imageUrl, ['background']);
      const { success } = await axiosPatch(
        API.SUB_UNIT.MANAGE_SUB_UNIT(unit.id, station.id),
        formData,
        headers
      );
      if (success) {
        //dispatch(manageSubUnit(station.id, data));
        ToastBottomHelper.success(t('text_change_background_sub_unit_success'));
      }
    },
    [imageUrl, unit.id, station.id, t]
  );

  const onPressRemove = useCallback(() => {
    setShowModalRemoveSubUnit();
  }, [setShowModalRemoveSubUnit]);

  const hideRemoveSubUnitModal = useCallback(() => {
    setHideModalRemoveSubUnit();
  }, [setHideModalRemoveSubUnit]);

  const onRemoveSubUnit = useCallback(async () => {
    setHideModalRemoveSubUnit();
    const { success } = await axiosDelete(
      API.SUB_UNIT.REMOVE_SUB_UNIT(unit.id, station.id)
    );
    if (success) {
      //dispatch(removeSubUnit(station.id));
      ToastBottomHelper.success(t('text_remove_sub_unit_success'));
      onBack();
    } else {
      ToastBottomHelper.error(t('text_remove_sub_unit_fail'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setHideModalRemoveSubUnit, unit.id, station.id, t]);

  const goRename = useCallback(() => {
    updateSubUnit({ name: inputName }, {});
    setHideEdit(true);
  }, [setHideEdit, updateSubUnit, inputName]);

  const onChangeName = useCallback((value) => {
    setInputName(value);
  }, []);

  const selectFile = useCallback(() => {
    setShowImagePicker(true);
  }, [setShowImagePicker]);

  useEffect(() => {
    if (imageUrl) {
      setResourcePath(imageUrl);
      updateBackground({ headers: { 'Content-Type': 'multipart/form-data' } });
    }
  }, [imageUrl, updateBackground]);

  const options = {
    mediaType: 'photo',
    maxWidth: 1024,
    quality: 0.8,
    includeBase64: Device.isIOS,
    saveToPhotos: true,
  };

  const contactsName = listContacts.map((item) => item.name);
  const onPressEmergencyContact = useCallback(() => {
    navigation.navigate(Routes.EmergencyContactsStack, {
      screen: Routes.EmergencyContactsList,
      params: { unitId: unit.id, group },
    });
  }, [group, navigation, unit.id]);

  return (
    <View style={styles.container}>
      <View style={styles.wraper}>
        <Text semibold color={Colors.Black} style={styles.title}>
          {t('edit_sub_unit')}
        </Text>
        <View style={styles.wraper}>
          <View style={styles.subUnitData}>
            <TouchableOpacity onPress={setshowEdit}>
              <Text
                testID={TESTID.MANAGE_SUB_UNIT_NAME}
                style={[styles.textWraper, styles.subUnitName]}
              >
                {newName}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              testID={TESTID.MANAGE_SUB_UNIT_SELECT_FILE_BUTTON}
              onPress={selectFile}
              style={[styles.backgroundContainer]}
            >
              <Text style={[styles.subUnitName, styles.textBackground]}>
                {t('background')}
              </Text>
              <Image
                style={styles.image}
                source={{
                  uri: resourcePath.uri,
                }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>
          {group && (
            <Section type={'border'}>
              <TouchableOpacity
                style={styles.buttonContacts}
                onPress={onPressEmergencyContact}
              >
                <Text type={'H4'} color={Colors.Gray9}>
                  {t('emergency_contacts')}
                </Text>
                <IconOutline name={'right'} size={20} color={Colors.Gray8} />
              </TouchableOpacity>
              <Text
                type={'Body'}
                color={contactsName.length > 0 ? Colors.Primary : Colors.Gray6}
              >
                {contactsName.length > 0
                  ? contactsName.join(', ')
                  : t('no_contact')}
              </Text>
            </Section>
          )}
          <ImagePicker
            showImagePicker={showImagePicker}
            setShowImagePicker={setShowImagePicker}
            setImageUrl={setImageUrl}
            optionsCapture={options}
          />
          <TouchableOpacity
            testID={TESTID.MANAGE_SUB_UNIT_REMOVE_BUTTON}
            onPress={onPressRemove}
            style={styles.removeButton}
          >
            <Text style={styles.removeText}>{t('remove_sub_unit')}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        testID={TESTID.MANAGE_SUB_UNIT_MODAL}
        isVisible={showEdit}
        onBackButtonPress={setHideEdit}
        onBackdropPress={setHideEdit}
        style={styles.modalContainer}
      >
        <View style={styles.popoverStyle}>
          <View style={styles.modalWrapper}>
            <View style={styles.modalHeader}>
              <Text semibold style={styles.modalHeaderText}>
                {t('rename_sub_unit')}
              </Text>
            </View>
            <_TextInput
              defaultValue={station.name}
              onChange={onChangeName}
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
        </View>
      </Modal>
      <AlertAction
        visible={showModalRemoveSubUnit}
        hideModal={hideRemoveSubUnitModal}
        title={t('sub_unit_remove_name', { name: station.name })}
        message={t('sub_unit_message_warning_remove')}
        leftButtonTitle={t('cancel')}
        rightButtonTitle={t('remove')}
        leftButtonClick={hideRemoveSubUnitModal}
        rightButtonClick={onRemoveSubUnit}
      />
    </View>
  );
};

export default connect()(EditSubUnit);
