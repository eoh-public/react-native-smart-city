import React, { memo, useCallback, useState } from 'react';
import { TouchableOpacity, View, Switch } from 'react-native';
import { Icon } from '@ant-design/react-native';
import { t } from 'i18n-js';

import Text from '../Text';
import { Colors } from '../../configs';
import styles from './ThreeButtonTemplateStyle';

const ThreeButtonTemplate = memo(({ actionGroup, doAction }) => {
  const { configuration } = actionGroup;
  const [lock, setLock] = useState(false);
  const iconSquareStop = () => {
    return <View style={styles.squareStop} />;
  };
  const onButton1Press = useCallback(
    () => doAction(configuration.action1_data),
    [configuration.action1_data, doAction]
  );
  const onButton2Press = useCallback(
    () => doAction(configuration.action2_data),
    [configuration.action2_data, doAction]
  );
  const onButton3Press = useCallback(
    () => doAction(configuration.action3_data),
    [configuration.action3_data, doAction]
  );
  const onChangeSwitch = useCallback(() => {
    if (lock) {
      setLock(false);
      doAction(configuration.action_off_data);
      return;
    }
    doAction(configuration.action_on_data);
    setLock(true);
  }, [
    configuration.action_off_data,
    configuration.action_on_data,
    doAction,
    lock,
  ]);
  const itemLock = (icon, color) => {
    return (
      <>
        <View style={styles.lockDoor}>
          <Icon name={icon} size={15} color={color} style={styles.iconLock} />
          <Text style={styles.textLockDoor}>
            {configuration.text_door_lock}{' '}
          </Text>
        </View>
        <Switch
          trackColor={{ false: Colors.Gray4, true: Colors.Primary }}
          thumbColor={Colors.White}
          ios_backgroundColor={Colors.Gray4}
          onValueChange={onChangeSwitch}
          value={lock}
        />
      </>
    );
  };
  return (
    <>
      <View style={styles.card}>
        <Text style={styles.headerThreeButton}>{t('controller')}</Text>
        <View style={styles.wrap}>
          <TouchableOpacity
            style={styles.buttonActionDoor}
            onPress={onButton1Press}
            underlayColor={Colors.Gray2}
          >
            <View style={styles.imageBtn}>
              <Icon
                name={configuration.icon1}
                size={30}
                color={Colors.Primary}
              />
            </View>
            <Text style={styles.text}>{configuration.text1}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonActionDoor}
            onPress={onButton2Press}
            underlayColor={Colors.Gray2}
          >
            <View style={styles.imageBtn}>{iconSquareStop()}</View>
            <Text style={styles.text}>{configuration.text2}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonActionDoor}
            onPress={onButton3Press}
            underlayColor={Colors.Gray2}
          >
            <View style={styles.imageBtn}>
              <Icon
                name={configuration.icon3}
                size={30}
                color={Colors.Primary}
              />
            </View>
            <Text style={styles.text}>{configuration.text3}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.lockSwitch}>
          {configuration.is_display_lock &&
            itemLock(
              lock ? 'lock' : 'unlock',
              lock ? Colors.Primary : Colors.Gray6
            )}
        </View>
      </View>
      {!!actionGroup.title && (
        <Text size={20} semibold center>
          {actionGroup.title}
        </Text>
      )}
    </>
  );
});

export default ThreeButtonTemplate;
