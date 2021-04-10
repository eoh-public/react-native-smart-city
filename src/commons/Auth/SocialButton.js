import React from 'react';
import { IconFill } from '@ant-design/icons-react-native';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

import { Colors } from '../../configs';

const SocialButton = ({
  icon, //'apple' | src facebook | src google-square
  text,
  onPress,
  textColor,
  wrapStyle,
  textWrapStyle,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.wrap, wrapStyle]}>
      {icon === 'apple' ? (
        <IconFill name={icon} size={25} color={Colors.White} />
      ) : (
        <Image source={icon} style={[styles.icon]} resizeMode={'contain'} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrap: {
    // flex: 1,
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.Gray4,
    backgroundColor: Colors.White,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: Colors.Shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default SocialButton;
