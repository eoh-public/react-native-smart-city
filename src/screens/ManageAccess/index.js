import React, { useEffect, memo } from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useTranslations } from '../../hooks/Common/useTranslations';
import { HeaderCustom } from '../../commons/Header';
import { IconOutline } from '@ant-design/icons-react-native';
import styles from './styles/ManageAccessStyles';
import { Colors } from '../../configs';
import Text from '../../commons/Text';
import useManageAccess from './hooks';
import Routes from '../../utils/Route';
import { RowItem } from '../../commons/RowItem';

const ManageAccessScreen = memo(({ route }) => {
  const t = useTranslations();
  const { params = {} } = route;
  const { unit, sensor } = params;
  const { navigate } = useNavigation();
  const isFocused = useIsFocused();
  const { data, isRefresh, isLoading, onRefresh } = useManageAccess(
    unit,
    sensor
  );

  const goToGuestInfo = (id) => {
    navigate(Routes.GuestInfo, {
      id: id,
    });
  };

  useEffect(() => {
    if (isFocused) {
      onRefresh();
    }
  }, [onRefresh, isFocused]);

  return (
    <View style={styles.wrap}>
      <HeaderCustom title={t('manage_access')} isShowAdd isShowSeparator />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }
      >
        <View style={styles.container}>
          <Text semibold style={styles.titleGuest}>
            {t('guests')}
          </Text>
          <View>
            {isLoading ? (
              <ActivityIndicator
                size="large"
                color={Colors.Primary}
                style={styles.loading}
              />
            ) : (
              <>
                {!!data.length &&
                  data.map((item, index) => (
                    <RowItem
                      key={index.toString()}
                      index={index}
                      leftIcon={
                        <IconOutline
                          name="user"
                          size={20}
                          color={Colors.White}
                        />
                      }
                      text={
                        item.user?.name ||
                        item.user?.email ||
                        item.user?.phone_number
                      }
                      subtext={item.schedule}
                      onPress={() => goToGuestInfo(item.id)}
                      rightComponent={
                        <IconOutline
                          name="right"
                          size={20}
                          color={Colors.Gray6}
                        />
                      }
                    />
                  ))}
                {!data.length && !isRefresh && (
                  <Text style={styles.textNoGuest}>{t('no_guest')}</Text>
                )}
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
});

export default ManageAccessScreen;
