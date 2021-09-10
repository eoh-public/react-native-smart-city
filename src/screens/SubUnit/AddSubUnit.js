import React, { useState, useCallback, useMemo, useEffect } from 'react';
import {
  View,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { t } from 'i18n-js';

import { API, Colors } from '../../configs';
import { ViewButtonBottom, ImagePicker } from '../../commons';
import Text from '../../commons/Text';
import _TextInput from '../../commons/Form/TextInput';
import Routes from '../../utils/Route';
import { axiosPost, createFormData } from '../../utils/Apis/axios';
import { ToastBottomHelper } from '../../utils/Utils';
import { TESTID } from '../../configs/Constants';
import styles from './AddSubUnitStyles';

const AddSubUnit = ({ route }) => {
  const navigation = useNavigation();
  const { unit, addType } = route.params;
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
      ToastBottomHelper.success(t('text_create_sub_unit_success'));

      if (addType === 'AddNewGateway') {
        navigation.navigate(Routes.AddCommonSelectSubUnit, {
          ...route.params,
        });
        return;
      }
      navigation.navigate(Routes.UnitStack, {
        screen: Routes.SubUnitDetail,
        params: {
          unit: unit,
          station: data,
        },
      });
    } else {
      ToastBottomHelper.error(t('text_create_sub_unit_fail'));
    }
  }, [addType, navigation, roomName, route.params, unit, wallpaper]);

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

export default AddSubUnit;
