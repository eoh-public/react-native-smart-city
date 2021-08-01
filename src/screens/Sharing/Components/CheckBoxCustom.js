import React, { memo } from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import Images from '../../../configs/Images';
import styles from './Styles/CheckBoxCustomStyles';

const CheckBoxCustom = ({ isChecked, onPress, wrapStyle }) => {
  return (
    <TouchableOpacity style={[styles.wrapBtn, wrapStyle]} onPress={onPress}>
      <View style={[styles.wrapView, isChecked && styles.viewChecked]}>
        {isChecked && <Image source={Images.check} />}
      </View>
    </TouchableOpacity>
  );
};

export default memo(CheckBoxCustom);
