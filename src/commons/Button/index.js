import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Colors } from '../../configs';
import Text from '../Text';

import withPreventDoubleClick from '../WithPreventDoubleClick';

const ButtonStyle = {
  auth: {
    backgroundColor: Colors.Primary,
    borderRadius: 5,
    borderWidth: 0,
  },
  primary: {
    backgroundColor: Colors.Primary,
    borderRadius: 28,
    borderWidth: 0,
  },
  info: {
    backgroundColor: Colors.White,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: Colors.Gray4,
  },
  cancel: {
    backgroundColor: Colors.White,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: Colors.Gray4,
  },
  disabled: {
    backgroundColor: Colors.Gray4,
    borderRadius: 28,
    borderWidth: 0,
  },
  disabledBorder: {
    backgroundColor: Colors.Gray4,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: Colors.Gray3,
  },
  primaryBorder: {
    backgroundColor: Colors.Cyan1,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: Colors.Primary,
  },
  primaryText: {
    backgroundColor: Colors.White,
    borderWidth: 0,
  },
  alert: {
    backgroundColor: Colors.Red5,
    borderRadius: 28,
    borderWidth: 0,
  },
  alertBorder: {
    backgroundColor: Colors.White,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: Colors.Red6,
  },
  underline: {
    backgroundColor: Colors.White,
    borderWidth: 0,
  },
  primaryUnderline: {
    backgroundColor: Colors.White,
    borderWidth: 0,
  },
  setupBorder: {
    backgroundColor: Colors.Cyan1,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: Colors.Primary,
  },
  CardShadow: {
    flexDirection: 'column',
    backgroundColor: Colors.White,
    borderRadius: 10,
    shadowColor: Colors.Shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 6,
  },
};

const TextColor = {
  auth: Colors.White,
  primary: Colors.White,
  info: Colors.Primary,
  cancel: Colors.Gray8,
  disabled: Colors.Gray6,
  disabledBorder: Colors.Gray6,
  primaryBorder: Colors.Primary,
  alert: Colors.White,
  alertBorder: Colors.Red6,
  underline: Colors.Gray6,
  primaryUnderline: Colors.Primary,
  setupBorder: Colors.Primary,
  CardShadow: Colors.Gray9,
  primaryText: Colors.Primary,
};

const TextSize = {
  H1: 30,
  H2: 24,
  H3: 20,
  H4: 16,
  Body: 14,
  Label: 12,
};

// Note: pass props style with flex: 0 if background does not display

// Type
// auth, primary, info, cancel, disabled, disabledBorder, primaryBorder, alert, alertBorder, underline, setupBorder

export default ({
  title,
  onPress,
  width,
  height = 48,
  activeOpacity,
  type,
  icon,
  textType = 'H4',
  textSemiBold = true,
  style,
  testID,
}) => {
  const styleButton = ButtonStyle[type];
  const textColor = TextColor[type];

  const isDisabled = type === 'disabled' || type === 'disabledBorder';
  const isUnderline = type === 'underline' || type === 'primaryUnderline';
  const isCardShadow = type === 'CardShadow';
  const textSize = TextSize[textType];
  const PreventDoubleTouch = withPreventDoubleClick(TouchableOpacity);
  return (
    <PreventDoubleTouch
      testID={testID}
      style={[
        {
          width,
          height,
        },
        styles.button,
        isCardShadow && styles.buttonLeft,
        styleButton,
        style,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={activeOpacity}
    >
      <View style={styles.wrap}>
        {icon}
        <Text
          type={textType}
          semibold={textSemiBold}
          color={textColor}
          size={textSize}
          underline={isUnderline}
          style={[icon && styles.marginIcon]}
        >
          {title}
        </Text>
      </View>
    </PreventDoubleTouch>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Primary,
  },
  marginIcon: {
    marginLeft: 10,
    marginBottom: -3,
  },
  wrap: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLeft: {
    width: '100%',
    paddingLeft: 18,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: Colors.Gray1,
  },
});
