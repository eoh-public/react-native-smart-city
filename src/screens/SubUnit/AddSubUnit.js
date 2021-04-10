import React, { useState, useCallback, useMemo, useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { t } from 'i18n-js';

import { API, Colors, Theme } from '../../configs';
import { ViewButtonBottom, ImagePicker } from '../../commons';
import Text from '../../commons/Text';
import _TextInput from '../../commons/Form/TextInput';
import Routes from '../../utils/Route';
import { axiosPost, createFormData } from '../../utils/Apis/axios';
import { ToastBottomHelper } from '../../utils/Utils';
import { createSubUnit } from '../../redux/Actions/unit';
import { TESTID } from '../../configs/Constants';

const AddSubUnit = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { unit } = route.params;
  const [roomName, setRoomName] = useState('');
  const [wallpaper, setWallpaper] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [showImagePicker, setShowImagePicker] = useState(false);

  const goDone = useCallback(async () => {
    const dataObj = { name: roomName, background: wallpaper };
    const formData = createFormData(dataObj, ['background']);
    const { success, data } = await axiosPost(
      API.SUB_UNIT.CREATE_SUB_UNIT(unit.id),
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
    if (success) {
      dispatch(createSubUnit(data));
      navigation.navigate(Routes.UnitStack, {
        screen: Routes.SubUnitDetail,
        params: {
          unit: unit,
          station: data,
        },
      });
      ToastBottomHelper.success(t('text_create_sub_unit_success'));
    } else {
      ToastBottomHelper.error(t('text_create_sub_unit_fail'));
    }
  }, [dispatch, navigation, roomName, unit, wallpaper]);

  const onChoosePhoto = useCallback(() => {
    setShowImagePicker(true);
  }, []);

  useEffect(() => {
    if (imageUrl) {
      setWallpaper(imageUrl);
    }
  }, [imageUrl]);

  const onChangeRoomName = useCallback(
    (value) => {
      setRoomName(value);
    },
    [setRoomName]
  );

  const validateData = useMemo(() => {
    return roomName === '' || wallpaper === '';
  }, [roomName, wallpaper]);

  return (
    <SafeAreaView style={styles.wrap}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.commonWrap}>
          <View style={styles.commonWrap}>
            <Text
              semibold
              color={Colors.Black}
              style={[styles.title, styles.padding]}
            >
              {t('add_new_sub_unit')}
            </Text>
            <View style={styles.formWrapper}>
              <_TextInput
                placeholder={t('add_sub_unit_room_name')}
                onChange={onChangeRoomName}
                textInputStyle={styles.roomName}
                wrapStyle={styles.textInput}
                selectionColor={Colors.Primary}
              />
              <TouchableWithoutFeedback
                testID={TESTID.ADD_SUB_UNIT_BUTTON_CHOOSE_PHOTO}
                onPress={onChoosePhoto}
              >
                <View style={styles.wrapWallpaper}>
                  <Text style={styles.addWallpaper}>
                    {t('add_sub_unit_wallpaper')}
                  </Text>
                  {wallpaper ? (
                    <Image
                      source={{ uri: wallpaper.uri }}
                      style={styles.wallpaper}
                    />
                  ) : (
                    <View style={styles.wallpaperEmpty} />
                  )}
                </View>
              </TouchableWithoutFeedback>
              <ImagePicker
                showImagePicker={showImagePicker}
                setShowImagePicker={setShowImagePicker}
                setImageUrl={setImageUrl}
              />
            </View>
          </View>
          <ViewButtonBottom
            leftTitle={t('cancel')}
            onLeftClick={() => navigation.goBack()}
            rightTitle={t('done')}
            rightDisabled={validateData}
            onRightClick={goDone}
          />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  commonWrap: {
    flex: 1,
  },
  wrap: {
    flex: 1,
    backgroundColor: Colors.Gray2,
  },
  padding: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    marginTop: 20,
    lineHeight: 28,
    marginBottom: 16,
  },
  textInput: {
    marginTop: 0,
  },
  formWrapper: {
    ...Theme.whiteBoxRadius,
    paddingTop: 0,
    paddingBottom: 24,
  },
  roomName: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Primary,
    paddingLeft: 0,
    fontSize: 16,
    lineHeight: 24,
    margin: 0,
    padding: 0,
  },
  wrapWallpaper: {
    marginTop: 6,
    borderBottomWidth: 1,
    borderColor: Colors.Gray4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addWallpaper: {
    fontSize: 16,
    lineHeight: 24,
    paddingBottom: 14,
    paddingTop: 14,
  },
  wallpaper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  wallpaperEmpty: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: Colors.Pink1,
  },
});

export default AddSubUnit;
