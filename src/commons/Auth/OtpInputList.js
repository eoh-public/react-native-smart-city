import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

import { Theme, Colors } from '../../configs';

const OtpInputList = ({ onfinishInputCode }) => {
  let firstTextInput;
  let secondTextInput;
  let thirdTextInput;
  let fourthTextInput;
  let fifthTextInput;
  let sixthTextInput;
  const [verificationCodeArray, setVerificationCodeArray] = useState([
    '',
    '',
    '',
    '',
    '',
    '',
  ]);

  const inputFocusHandler = (index) => {
    verificationCodeArray.splice(index, 1, ''); // replace 1 element with empty string at [index] of array
    setVerificationCodeArray((prev) => [...verificationCodeArray]);
    switch (index) {
      case 0:
        firstTextInput.clear();
        firstTextInput.setNativeProps({
          ...Theme.transparentBackgroundOrangeBorder,
        });
        break;
      case 1:
        secondTextInput.clear();
        secondTextInput.setNativeProps({
          ...Theme.transparentBackgroundOrangeBorder,
        });
        break;
      case 2:
        thirdTextInput.clear();
        thirdTextInput.setNativeProps({
          ...Theme.transparentBackgroundOrangeBorder,
        });
        break;
      case 3:
        fourthTextInput.clear();
        fourthTextInput.setNativeProps({
          ...Theme.transparentBackgroundOrangeBorder,
        });
        break;
      case 4:
        fifthTextInput.clear();
        fifthTextInput.setNativeProps({
          ...Theme.transparentBackgroundOrangeBorder,
        });
        break;
      case 5:
        sixthTextInput.clear();
        sixthTextInput.setNativeProps({
          ...Theme.transparentBackgroundOrangeBorder,
        });
        break;
    }
  };

  const inputChangeTextHandler = (index, text) => {
    if (text.length > 0) {
      verificationCodeArray.splice(index, 1, text); // replace 1 element at [index] of array
      setVerificationCodeArray((prev) => [...verificationCodeArray]);
    }
    switch (index) {
      case 0:
        if (text.length > 0) {
          firstTextInput.setNativeProps({
            ...Theme.transparentBackgroundGrayBorder,
          });
        }
        secondTextInput.focus();
        break;
      case 1:
        if (text.length > 0) {
          secondTextInput.setNativeProps({
            ...Theme.transparentBackgroundGrayBorder,
          });
        }
        thirdTextInput.focus();
        break;
      case 2:
        if (text.length > 0) {
          thirdTextInput.setNativeProps({
            ...Theme.transparentBackgroundGrayBorder,
          });
        }
        fourthTextInput.focus();
        break;
      case 3:
        if (text.length > 0) {
          fourthTextInput.setNativeProps({
            ...Theme.transparentBackgroundGrayBorder,
          });
        }
        fifthTextInput.focus();
        break;
      case 4:
        if (text.length > 0) {
          fifthTextInput.setNativeProps({
            ...Theme.transparentBackgroundGrayBorder,
          });
        }
        sixthTextInput.focus();
        break;
      case 5:
        if (text.length > 0) {
          sixthTextInput.setNativeProps({
            ...Theme.transparentBackgroundGrayBorder,
          });
        }
        break;
    }
  };

  useEffect(() => {
    let finishInputCode = true;
    let fullVerificationCode = '';
    verificationCodeArray.map((code) => {
      if (code === '') {
        finishInputCode = false;
      } else {
        fullVerificationCode += code;
      }
    });
    if (finishInputCode && typeof onfinishInputCode === 'function') {
      onfinishInputCode(fullVerificationCode);
    }
  }, [verificationCodeArray, onfinishInputCode]);

  return (
    <View style={styles.otpInputContainer}>
      <TextInput
        style={{
          ...styles.otpInput,
        }}
        name="firstInput"
        maxLength={1}
        onFocus={() => inputFocusHandler(0)}
        onChangeText={(text) => inputChangeTextHandler(0, text)}
        ref={(input) => (firstTextInput = input)}
        keyboardType={'number-pad'}
        returnKeyType={'done'}
      />
      <TextInput
        style={{
          ...styles.otpInput,
        }}
        maxLength={1}
        onFocus={() => inputFocusHandler(1)}
        onChangeText={(text) => inputChangeTextHandler(1, text)}
        ref={(input) => (secondTextInput = input)}
        keyboardType={'number-pad'}
        returnKeyType={'done'}
      />
      <TextInput
        style={{
          ...styles.otpInput,
        }}
        maxLength={1}
        onFocus={() => inputFocusHandler(2)}
        onChangeText={(text) => inputChangeTextHandler(2, text)}
        ref={(input) => (thirdTextInput = input)}
        keyboardType={'number-pad'}
        returnKeyType={'done'}
      />

      <TextInput
        style={{
          ...styles.otpInput,
        }}
        maxLength={1}
        onFocus={() => inputFocusHandler(3)}
        onChangeText={(text) => inputChangeTextHandler(3, text)}
        ref={(input) => (fourthTextInput = input)}
        keyboardType={'number-pad'}
        returnKeyType={'done'}
      />
      <TextInput
        style={{
          ...styles.otpInput,
        }}
        maxLength={1}
        onFocus={() => inputFocusHandler(4)}
        onChangeText={(text) => inputChangeTextHandler(4, text)}
        ref={(input) => (fifthTextInput = input)}
        keyboardType={'number-pad'}
        returnKeyType={'done'}
      />
      <TextInput
        style={{
          ...styles.otpInput,
        }}
        maxLength={1}
        onFocus={() => inputFocusHandler(5)}
        onChangeText={(text) => inputChangeTextHandler(5, text)}
        ref={(input) => (sixthTextInput = input)}
        keyboardType={'number-pad'}
        returnKeyType={'done'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  otpInputContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  otpInput: {
    width: 36,
    height: 36,
    textAlign: 'center',
    marginStart: 5,
    marginEnd: 5,
    borderRadius: 5,
    ...Theme.transparentBackgroundOrangeBorder,
    color: Colors.Gray9,
  },
});

export default OtpInputList;
