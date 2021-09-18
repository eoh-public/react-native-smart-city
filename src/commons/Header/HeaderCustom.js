import React, { memo, useRef } from 'react';
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
}) => {
  const t = useTranslations();
  const { goBack } = useNavigation();
  const refMenuAction = useRef();
  const refAddAction = useRef();
  const handleAddAction = () => {};
  // eslint-disable-next-line no-alert
  const handleClose = () => alert(t('feature_under_development'));
  const handleShowMenuAction = () => showPopoverWithRef(refMenuAction);
  return (
    <View style={[styles.wrap, isShowSeparator && styles.separator]}>
      <TouchableOpacity style={styles.buttonBack} onPress={goBack}>
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
      </View>
    </View>
  );
};

export default memo(HeaderCustom);
