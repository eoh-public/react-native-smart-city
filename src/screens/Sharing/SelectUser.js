import React, { useCallback, useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { t } from 'i18n-js';

import { API, Colors, Theme } from '../../configs';
import AccountList from '../../commons/Auth/AccountList';
import _TextInput from '../../commons/Form/TextInput';
import { ViewButtonBottom, Button } from '../../commons';
import {
  isValidEmailAddress,
  isValidPhoneNumber,
} from '../../utils/Validation';
import { axiosPost } from '../../utils/Apis/axios';
import { TESTID } from '../../configs/Constants';
import Text from '../../commons/Text';

const SelectUser = ({ route }) => {
  const navigation = useNavigation();
  const { unit, permissions } = route.params;
  const [errorText, setErrorText] = useState('');
  const [content, setContent] = useState('');
  const [users, setUsers] = useState([]);

  const sharePermissions = useCallback(
    async (phone, email) => {
      let userSharedPermission = await users.filter(
        (user) => user.phone_number === phone || user.email === email
      );
      if (userSharedPermission.length) {
        return false;
      }
      const { success, data } = await axiosPost(API.SHARE.SHARE, {
        phone,
        email,
        unit: unit.id,
        permissions,
      });
      if (success) {
        setUsers([...users, data.user]);
      }
    },
    [unit, permissions, users]
  );

  const validate = useCallback(() => {
    let phone = '';
    let email = '';
    if (!isValidPhoneNumber(content)) {
      if (!isValidEmailAddress(content)) {
        setErrorText(t('invalid_phone_number_or_email'));
        return;
      } else {
        email = content;
      }
    } else {
      phone = content;
    }
    setErrorText('');
    sharePermissions(phone, email);
  }, [content, sharePermissions]);

  const onPressNext = useCallback(() => {
    navigation.dangerouslyGetParent().goBack();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.wrap}>
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        accessible={false}
        style={styles.wrap}
      >
        <View style={styles.wrap}>
          <View style={styles.wrap}>
            <Text
              testID={TESTID.SELECT_USER_ADD_USER_TITLE}
              semibold
              color={Colors.Black}
              style={[styles.title, styles.padding]}
            >
              {t('add_user_title')}
            </Text>
            <Text
              testID={TESTID.SELECT_USER_ADD_USER_SUB_TITLE}
              style={[styles.subTitle, styles.padding]}
            >
              {t('add_user_sub_title')}
            </Text>
            <View style={styles.formWrapper}>
              <_TextInput
                bottomButton
                placeholder={t('phone_number_or_email')}
                onChange={(value) => setContent(value)}
                errorText={errorText}
                textInputStyle={styles.textInput}
                wrapStyle={styles.noMarginTop}
                selectionColor={Colors.Primary}
              />

              <View style={styles.buttonWrapper}>
                <Button
                  type="primary"
                  title={t('add_user_invite')}
                  onPress={validate}
                  style={Theme.shadow}
                />
              </View>
            </View>

            <View style={[styles.note, styles.padding]}>
              <Text style={styles.noteText}>{t('add_user_note')}</Text>
            </View>

            {users.length > 0 && (
              <View style={styles.constainerUsers}>
                <View style={styles.padding}>
                  <Text
                    testID={TESTID.SELECT_USER_ADD_USER_INVITATION}
                    styles={styles.subTitle}
                  >
                    {t('add_user_invitation_sent')}
                  </Text>
                </View>
                <View style={[styles.addedWrapper]}>
                  <AccountList accounts={users} />
                </View>
              </View>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
      <ViewButtonBottom
        leftTitle={t('cancel')}
        onLeftClick={() => navigation.goBack()}
        rightTitle={t('done')}
        rightDisabled={false}
        onRightClick={onPressNext}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    marginBottom: 8,
  },
  subTitle: {
    fontSize: 14,
    color: Colors.Gray8,
    marginBottom: 16,
  },
  formWrapper: {
    ...Theme.whiteBoxRadius,
    paddingVertical: 24,
  },
  buttonWrapper: {
    flexDirection: 'row',
    marginTop: 32,
    marginHorizontal: 120,
  },
  note: {
    marginTop: 16,
  },
  noteText: {
    fontSize: 12,
    lineHeight: 20,
    color: Colors.Gray8,
  },
  addedWrapper: {
    ...Theme.whiteBoxRadius,
    marginTop: 8,
  },
  constainerUsers: {
    marginTop: 24,
    flex: 1,
  },
  textInput: {
    borderWidth: 0,
    borderBottomWidth: 1,
    paddingLeft: 0,
    fontSize: 16,
    marginTop: 0,
  },
  noMarginTop: {
    marginTop: 0,
  },
});

export default SelectUser;
