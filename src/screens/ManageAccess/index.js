import React, { useEffect, memo } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useTranslations } from '../../hooks/Common/useTranslations';
import { HeaderCustom } from '../../commons/Header';
import { IconOutline } from '@ant-design/icons-react-native';
import styles from './styles/ManageAccessStyles';
import { CircleView } from '../../commons/CircleView';
import { Colors } from '../../configs';
import Text from '../../commons/Text';
import { useRoute } from '@react-navigation/native';
import useManageAccess from './hooks';
import Routes from '../../utils/Route';

const arrColor = [
  Colors.GeekBlue3,
  Colors.Purple3,
  Colors.Orange3,
  Colors.Volcano3,
  Colors.Blue9,
  Colors.Green3,
  Colors.Cyan2,
];

const ManageAccessScreen = memo(() => {
  const t = useTranslations();
  const { params = {} } = useRoute();
  const { unit, sensor } = params;
  const { navigate } = useNavigation();
  const isFocused = useIsFocused();
  const { data, isRefreshing, onRefresh } = useManageAccess(unit, sensor);

  const goToGuestInfo = (id) => {
    navigate(Routes.GuestInfo, {
      id: id,
    });
  };

  const Member = ({ id, name, status, index }) => {
    return (
      <View style={styles.wrapItem}>
        <TouchableOpacity onPress={() => goToGuestInfo(id)}>
          <View style={styles.Border}>
            <View style={styles.paddingLeft16}>
              <CircleView
                size={40}
                style={[{ backgroundColor: arrColor[index % arrColor.length] }]}
                center
              >
                <IconOutline name="user" size={20} color={Colors.White} />
              </CircleView>
            </View>
            <View style={styles.columeFlex}>
              <Text style={styles.titleName}> {name}</Text>
              <Text style={styles.status}> {status}</Text>
            </View>
            <View style={styles.endFlex}>
              <IconOutline name="right" size={20} color={Colors.Gray6} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderMemberGuest = (data) => {
    return (
      <View>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={onRefresh} />
          }
        >
          {!!data.length &&
            data.map((item, index) => (
              <Member
                id={item.id}
                name={item.name}
                status={item.schedule}
                index={index}
              />
            ))}
          {!data.length && !isRefreshing && (
            <Text style={styles.textNoGuest}>{t('no_guest')}</Text>
          )}
        </ScrollView>
      </View>
    );
  };
  useEffect(() => {
    if (isFocused) {
      onRefresh();
    }
  }, [onRefresh, isFocused]);

  return (
    <View style={styles.wrap}>
      <HeaderCustom title={t('manage_access')} isShowAdd isShowSeparator />
      <View style={styles.container}>
        <Text semibold style={styles.titleGuest}>
          {t('guest')}
        </Text>
        {renderMemberGuest(data)}
      </View>
    </View>
  );
});

export default ManageAccessScreen;
