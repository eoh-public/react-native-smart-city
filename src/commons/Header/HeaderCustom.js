import React, { memo, useCallback, useRef } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Images from '../../configs/Images';
import { Colors } from '../../configs';
import { Icon } from '@ant-design/react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './Styles/HeaderCustomStyles';
import { useTranslations } from '../../hooks/Common/useTranslations';

const HeaderCustom = ({
  title = '',
  isShowAdd = false,
  isShowRight = false,
  onRefresh,
  showPopoverWithRef,
  isShowSeparator = false,
  isDisableRefresh = false,
  titleStyles,
  isShowClose = false,
  rightComponent,
  onGoBack,
  onClose,
}) => {
  const t = useTranslations();
  const { goBack } = useNavigation();
  const refMenuAction = useRef();
  const refAddAction = useRef();
  const handleAddAction = () => {};
  const handleShowMenuAction = () => showPopoverWithRef(refMenuAction);
  const handleGoback = () => {
    onGoBack && onGoBack();
    goBack();
  };

  const handleClose = useCallback(() => {
    onClose ? onClose() : alert(t('feature_under_development'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={[styles.wrap, isShowSeparator && styles.separator]}>
      <TouchableOpacity style={styles.buttonBack} onPress={handleGoback}>
        <Image source={Images.arrowBack} style={styles.iconBack} />
      </TouchableOpacity>
      <View style={styles.wrapTitle}>
        <Text
          style={[styles.title, titleStyles, !isShowRight && styles.title2]}
          numberOfLines={1}
        >
          {title}
        </Text>
      </View>

      <View style={styles.viewRight}>
        {isShowRight && (
          <>
            {!isDisableRefresh && (
              <TouchableOpacity style={styles.buttonBack} onPress={onRefresh}>
                <Image
                  source={Images.refresh}
                  style={styles.iconFresh}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.buttonBack}
              onPress={handleShowMenuAction}
              ref={refMenuAction}
            >
              <Icon name={'more'} size={27} color={Colors.Black} />
            </TouchableOpacity>
          </>
        )}
        {isShowAdd && (
          <TouchableOpacity
            style={styles.buttonAdd}
            onPress={handleAddAction}
            ref={refAddAction}
          >
            <Icon name={'plus'} size={27} color={Colors.Black} />
          </TouchableOpacity>
        )}
        {isShowClose && (
          <TouchableOpacity style={styles.buttonAdd} onPress={handleClose}>
            <Icon name={'close'} size={24} color={Colors.Black} />
          </TouchableOpacity>
        )}
        {rightComponent}
      </View>
    </View>
  );
};

export default memo(HeaderCustom);
