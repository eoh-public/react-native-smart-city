import React, { useCallback } from 'react';
import { IconOutline } from '@ant-design/icons-react-native';
import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import { useTranslations } from '../../hooks/Common/useTranslations';

import { Colors } from '../../configs';
import Routes from '../../utils/Route';
import AlertAction from '../../commons/AlertAction';
import SharingMembers from '../../commons/Sharing/MemberList';
import WrapHeaderScrollable from '../../commons/Sharing/WrapHeaderScrollable';
import { useIsOwnerOfUnit } from '../../hooks/Common';

import { useDataMember, useStateAlertAction } from './hooks';
import { TESTID } from '../../configs/Constants';
import { useSCContextSelector } from '../../context';

const MemberList = ({ route }) => {
  const t = useTranslations();
  const { navigate } = useNavigation();
  const account = useSCContextSelector((state) => state.auth.account);
  const { unitId, unit } = route.params;
  const {
    dataMembers,
    loading,
    leaveUnit,
    removeMember,
    isRefresh,
    onRefresh,
  } = useDataMember(unitId);
  const { isOwner } = useIsOwnerOfUnit(unit.user_id);
  const {
    stateAlertAction,
    hideAlertAction,
    onPressRemoveUser,
    stateLeaveUnit,
  } = useStateAlertAction();

  const handleLeaveOrRemove = useCallback(() => {
    if (stateAlertAction.member) {
      removeMember(
        stateAlertAction.member.share_id,
        stateAlertAction.member.name
      );
    } else {
      leaveUnit(unit.name);
    }
    hideAlertAction();
  }, [
    hideAlertAction,
    leaveUnit,
    removeMember,
    stateAlertAction.member,
    unit.name,
  ]);

  const onPressRightHeader = useCallback(() => {
    if (isOwner) {
      navigate(Routes.AddMemberStack, {
        screen: Routes.SharingSelectPermission,
        params: { unit: { id: unitId } },
      });
    } else {
      stateLeaveUnit(); //change state stateAlertAction
    }
  }, [isOwner, stateLeaveUnit, navigate, unitId]);

  const rightHeader = (
    <TouchableOpacity
      testID={TESTID.MEMBER_LIST_RIGHT_HEADER_TOUCH}
      onPress={onPressRightHeader}
      style={styles.rightHeader}
    >
      <IconOutline
        name={isOwner ? 'plus' : 'more'}
        size={30}
        color={Colors.Black}
      />
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <WrapHeaderScrollable
        title={t('members')}
        rightComponent={rightHeader}
        loading={isRefresh}
        onRefresh={onRefresh}
      >
        {loading ? (
          <ActivityIndicator />
        ) : (
          <SharingMembers
            dataMember={dataMembers}
            ownerId={unit.user_id}
            currentUserId={account.user.id}
            onPressRemove={onPressRemoveUser}
          />
        )}
      </WrapHeaderScrollable>
      <AlertAction
        visible={stateAlertAction.visible}
        hideModal={hideAlertAction}
        title={stateAlertAction.title}
        message={stateAlertAction.message}
        leftButtonTitle={stateAlertAction.leftButton}
        leftButtonClick={hideAlertAction}
        rightButtonTitle={stateAlertAction.rightButton}
        rightButtonClick={handleLeaveOrRemove}
      />
    </View>
  );
};

export default MemberList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Gray2,
  },
  rightHeader: {
    alignItems: 'center',
    width: 44,
    justifyContent: 'center',
    flex: 1,
  },
});
