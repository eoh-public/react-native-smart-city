import React, { useMemo, useCallback, useEffect, memo } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Colors } from '../../configs';
import { useTranslations } from '../../hooks/Common/useTranslations';

import WrapHeaderScrollable from '../../commons/Sharing/WrapHeaderScrollable';
import Text from '../../commons/Text';

import styles from './ManageSubUnitStyles';
import { IconOutline } from '@ant-design/icons-react-native';
import { Icon } from '@ant-design/react-native';
import Routes from '../../utils/Route';
import { RowItem } from '../../commons/RowItem';
import NoSubUnitImage from '../../../assets/images/Illustrations.svg';
import useManageSubUnit from './hooks/useManageSubUnit';

const ManageSubUnit = memo((props) => {
  const t = useTranslations();
  const { unit } = props.route.params;
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { station, isRefresh, isLoading, onRefresh } = useManageSubUnit(unit);

  const addSubUnit = useCallback(() => {
    navigation.navigate(Routes.AddSubUnitStack, {
      screen: Routes.AddSubUnit,
      params: { unit },
    });
  }, [navigation, unit]);

  const goToEditSubUnit = (station, unit) => {
    navigation.navigate(Routes.UnitStack, {
      screen: Routes.EditSubUnit,
      params: {
        station,
        unit,
      },
    });
  };

  const rightComponent = useMemo(
    () => (
      <View style={styles.rightComponent}>
        <TouchableOpacity onPress={addSubUnit} style={styles.headerButton}>
          <Icon name={'plus'} size={27} color={Colors.Black} />
        </TouchableOpacity>
        <TouchableOpacity
          // onPress={handleShowMenuAction}
          // ref={refMenuAction}
          style={[styles.headerButton, styles.moreButton]}
        >
          <Icon name={'more'} size={27} color={Colors.Black} />
        </TouchableOpacity>
      </View>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    isFocused && onRefresh();
  }, [onRefresh, isFocused]);

  return (
    <View style={styles.wrap}>
      <WrapHeaderScrollable
        title={t('manage_sub_unit')}
        headerAniStyle={styles.headerAniStyle}
        headerAniCenterStyle={true}
        rightComponent={rightComponent}
      >
        <View style={styles.container}>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={onRefresh} />
            }
          >
            <View>
              {!!station.length &&
                station.map((item, index) => {
                  return (
                    <RowItem
                      type={'noneBG'}
                      key={index.toString()}
                      index={index}
                      leftIcon={
                        <Image
                          source={{ uri: item.background }}
                          style={styles.image}
                          resizeMode="cover"
                        />
                      }
                      text={item.name}
                      subtext={`${
                        item.sensors ? item.sensors.length : '0'
                      }  devices`}
                      onPress={() => goToEditSubUnit(item, unit)}
                      rightComponent={
                        <IconOutline
                          name="right"
                          size={20}
                          color={Colors.Gray6}
                        />
                      }
                    />
                  );
                })}
              {!station.length && !isRefresh && !isLoading && (
                <View style={styles.NoSubUnit}>
                  <NoSubUnitImage />
                  <Text semibold type="H4" center>
                    {t('no_sub_unit_yet')}
                  </Text>
                  <Text type="Body" center>
                    {t('tap_+_to_add_new_sub_unit')}
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      </WrapHeaderScrollable>
    </View>
  );
});

export default ManageSubUnit;
