import React, { memo } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { Colors } from '../../../configs';
import Text from '../../../commons/Text';
import IconComponent from '../../../commons/IconComponent';
import styles from './DeviceStyles';

const Device = memo(({ svgMain, sensor, title, isSelectDevice, onPress }) => {
  const isActive = isSelectDevice && styles.active;

  const onPressDevice = () => {
    onPress && onPress(sensor);
  };

  return (
    <TouchableWithoutFeedback onPress={onPressDevice}>
      <View style={[styles.container, isActive]}>
        <View style={styles.boxIcon}>
          <IconComponent
            icon={svgMain}
            iconKit={sensor.icon_kit}
            style={styles.iconSensor}
          />
        </View>
        <Text numberOfLines={1} semibold type="Body" color={Colors.Gray9}>
          {title}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
});

export default Device;
