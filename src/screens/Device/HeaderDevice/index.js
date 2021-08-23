import React, { memo, useRef } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Colors } from '../../../configs';
import { Icon } from '@ant-design/react-native';
import Images from '../../../configs/Images';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { IconFill, IconOutline } from '@ant-design/icons-react-native';
import { TESTID } from '../../../configs/Constants';

const HeaderDevice = ({
  isFavourite,
  addToFavourites,
  removeFromFavourites,
  showPopoverWithRef,
}) => {
  const { goBack } = useNavigation();
  const refMenuAction = useRef();
  const handleShowMenuAction = () => showPopoverWithRef(refMenuAction);
  const renderButtonStar = () => {
    return (
      <TouchableOpacity
        style={styles.buttonStar}
        onPress={isFavourite ? removeFromFavourites : addToFavourites}
        testID={TESTID.HEADER_DEVICE_BUTTON_STAR}
      >
        {isFavourite ? (
          <IconFill name="star" size={25} color={Colors.Yellow6} />
        ) : (
          <IconOutline name="star" size={25} />
        )}
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.wrap}>
      <TouchableOpacity style={styles.button} onPress={goBack}>
        <Image source={Images.arrowBack} style={styles.iconBack} />
      </TouchableOpacity>
      <View style={styles.viewRight}>
        {renderButtonStar()}
        <TouchableOpacity
          style={styles.button}
          onPress={handleShowMenuAction}
          ref={refMenuAction}
          testID={TESTID.HEADER_DEVICE_BUTTON_MORE}
        >
          <Icon name={'more'} size={27} color={Colors.Black} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(HeaderDevice);
