import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
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

const ManageSubUnit = (props) => {
  const t = useTranslations();
  const { station } = props.route.params;
  //TODO remove redux
  // const unit = useSelector((state) => state.unit.unitDetail);
  const unit = useMemo(() => {}, []);
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

  const group = station.emergency_group;

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
        API.SUB_UNIT.MANAGE_SUB_UNIT(unit?.id, station.id),
        params,
        headers
      );

      if (success) {
        // dispatch(manageSubUnit(station.id, data));
        setNewName(data.name);
        ToastBottomHelper.success(t('text_rename_sub_unit_success'));
      }
    },
    [unit, station.id, t]
  );
  const updateBackground = useCallback(
    async (headers) => {
      const formData = createFormData(imageUrl, ['background']);
      const { success } = await axiosPatch(
        API.SUB_UNIT.MANAGE_SUB_UNIT(unit?.id, station.id),
        formData,
        headers
      );
      if (success) {
        //dispatch(manageSubUnit(station.id, data));
        ToastBottomHelper.success(t('text_change_background_sub_unit_success'));
      }
    },
    [imageUrl, unit, station.id, t]
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
      API.SUB_UNIT.REMOVE_SUB_UNIT(unit?.id, station.id)
    );
    if (success) {
      //dispatch(removeSubUnit(station.id));
      ToastBottomHelper.success(t('text_remove_sub_unit_success'));
      onBack();
    } else {
      ToastBottomHelper.error(t('text_remove_sub_unit_fail'));
    }
  }, [setHideModalRemoveSubUnit, unit, station.id, t, onBack]);

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
      params: { unitId: unit?.id, group },
    });
  }, [group, navigation, unit]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wraper}>
        <Text semibold color={Colors.Black} style={styles.title}>
          {t('manage_sub_unit')}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Gray2,
  },
  wraper: {
    flex: 1,
  },
  title: {
    paddingLeft: 22,
    fontSize: 24,
    lineHeight: 32,
    marginBottom: 16,
  },
  subUnitData: {
    backgroundColor: Colors.White,
    borderWidth: 1,
    borderColor: Colors.Gray4,
    borderRadius: 20,
    padding: 16,
    paddingTop: 8,
    paddingBottom: 24,
    marginBottom: 24,
  },
  textWraper: {
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 0.5,
  },
  subUnitName: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 24,
    color: Colors.Gray9,
  },
  removeButton: {
    position: 'absolute',
    bottom: 0,
    borderWidth: 0,
    alignSelf: 'center',
    paddingBottom: 24,
  },
  removeText: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.Gray6,
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
  //Modal
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
  buttonContacts: {
    marginTop: 8,
    flexDirection: 'row',
    paddingBottom: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default connect()(ManageSubUnit);
