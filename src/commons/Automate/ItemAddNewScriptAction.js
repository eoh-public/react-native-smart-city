import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import Text from '../Text';
import { IconOutline } from '@ant-design/icons-react-native';
import { Colors } from '../../configs';
import styles from './ItemAddNewScriptActionStyles';

const ItemAddNewScriptAction = ({ order, title, onAddNew }) => {
  return (
    <TouchableWithoutFeedback onPress={onAddNew}>
      <View style={styles.wrap}>
        <View style={[styles.wrapOrder, styles.border]}>
          <Text type="H4" color={Colors.Gray9} bold>
            {`${order}`.padStart(2, '0')}
          </Text>
        </View>
        <View style={[styles.wrapItem, styles.border]}>
          <View style={styles.wrapIcon}>
            <IconOutline name="plus" size={22} color={Colors.Gray8} />
          </View>
          <Text type="H4" color={Colors.Gray8}>
            {title}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ItemAddNewScriptAction;
