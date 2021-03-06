import React, { memo } from 'react';
import { TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';
import Text from '../../Text';

import { Colors } from '../../../configs';
import styles from './styles';
import { TESTID } from '../../../configs/Constants';

const ItemAddNew = memo(({ title, onAddNew, wrapStyle }) => {
  return (
    <TouchableWithoutFeedback onPress={onAddNew}>
      <View style={[styles.container, wrapStyle]}>
        <View style={styles.boxIcon}>
          <TouchableOpacity
            style={styles.buttonPlus}
            onPress={onAddNew}
            testID={TESTID.PLUS}
          >
            <IconOutline name="plus" size={22} color={Colors.Gray8} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={onAddNew}>
          <Text
            numberOfLines={1}
            type="H4"
            color={Colors.Gray8}
            style={styles.title}
          >
            {title}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
});

export default ItemAddNew;
