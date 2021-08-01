import React, { memo, useRef } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Images from '../../configs/Images';
import { Colors } from '../../configs';
import { Icon } from '@ant-design/react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './Styles/HeaderCustomStyles';

const HeaderCustom = ({
  title = '',
  isShowRight = false,
  onRefresh,
  showPopoverWithRef,
  isShowSeparator = false,
}) => {
  const { goBack } = useNavigation();
  const refMenuAction = useRef();
  const handleShowMenuAction = () => showPopoverWithRef(refMenuAction);
  return (
    <View style={[styles.wrap, isShowSeparator && styles.separator]}>
      <TouchableOpacity style={styles.btnBack} onPress={goBack}>
        <Image source={Images.arrowBack} style={styles.iconBack} />
      </TouchableOpacity>
      <View style={styles.wrapTitle}>
        <Text
          style={[styles.title, !isShowRight && styles.title2]}
          numberOfLines={1}
        >
          {title}
        </Text>
      </View>

      <View style={styles.viewRight}>
        {isShowRight && (
          <>
            <TouchableOpacity style={styles.btnBack} onPress={onRefresh}>
              <Image
                source={Images.refresh}
                style={styles.iconFresh}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnBack}
              onPress={handleShowMenuAction}
              ref={refMenuAction}
            >
              <Icon name={'more'} size={27} color={Colors.Black} />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default memo(HeaderCustom);
