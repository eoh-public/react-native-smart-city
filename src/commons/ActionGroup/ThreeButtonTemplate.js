import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from '@ant-design/react-native';

import Text from '../Text';
import { Colors } from '../../configs';

const ThreeButtonTemplate = ({ actionGroup, doAction }) => {
  const { configuration } = actionGroup;

  return (
    <View style={styles.wrap}>
      <TouchableOpacity
        style={styles.buttonActionDoor}
        onPress={() => doAction(configuration.action1_data)}
        underlayColor="#FAFAFA"
      >
        <View style={styles.imageBtn}>
          <Icon name={configuration.icon1} size={30} color={Colors.Gray5} />
        </View>
        <Text style={styles.text}>{configuration.text1}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonActionDoor}
        onPress={() => doAction(configuration.action2_data)}
        underlayColor="#FAFAFA"
      >
        <View style={styles.imageBtn}>
          <Icon name={configuration.icon2} size={30} color={Colors.Gray5} />
        </View>
        <Text style={styles.text}>{configuration.text2}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonActionDoor}
        onPress={() => doAction(configuration.action3_data)}
        underlayColor="#FAFAFA"
      >
        <View style={styles.imageBtn}>
          <Icon name={configuration.icon3} size={30} color={Colors.Gray5} />
        </View>
        <Text style={styles.text}>{configuration.text3}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
    paddingVertical: 16,
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: Colors.White,
    borderWidth: 1,
    borderColor: Colors.Gray4,
    borderRadius: 10,
    shadowColor: Colors.Black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  imageBtn: {
    height: 28,
    marginBottom: 7,
  },
  text: {
    fontSize: 14,
    lineHeight: 22,
  },
  buttonActionDoor: {
    flex: 1,
    aspectRatio: 1,
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.White,
    borderWidth: 1,
    borderColor: Colors.Gray4,
    borderRadius: 10,
    shadowColor: Colors.Shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
});

export default ThreeButtonTemplate;
