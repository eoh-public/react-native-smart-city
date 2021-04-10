import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { Colors } from '../../configs';
import Avatar from '../../../assets/images/avatar.svg';

const AccountItem = ({ account }) => {
  return (
    <View style={styles.container}>
      <View styles={styles.wrap}>
        <Avatar width={40} height={40} />
      </View>
      <View style={styles.space} />
      <View style={styles.wrap}>
        {account.name && (
          <Text style={{ color: Colors.Gray9 }}>{account.name}</Text>
        )}
        <Text style={{ color: Colors.Gray8 }}>{account.phone_number}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrap: {
    flex: 1,
  },
  space: {
    width: 16,
  },
});

export default AccountItem;
