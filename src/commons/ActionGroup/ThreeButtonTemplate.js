import React, { memo, useCallback, useState } from 'react';
import { TouchableOpacity, View, Switch } from 'react-native';
import { Icon } from '@ant-design/react-native';
import { t } from 'i18n-js';
import styles from './ThreeButtonTemplateStyle';
import Text from '../Text';
import { TESTID } from '../../configs/Constants';
import { Colors } from '../../configs';
import { Card } from '../../commons/CardShadow';

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
          <Text
            style={styles.textLockDoor}
            testID={TESTID.TEXT_DOOR_LOOK_ON_OFF}
          >
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
      <Card title={actionGroup.title ? actionGroup.title : t('controller')}>
        <View style={styles.wrap}>
          <TouchableOpacity
            testID={TESTID.BUTTON_TEMPLATE_1}
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
            testID={TESTID.BUTTON_TEMPLATE_2}
            style={styles.buttonActionDoor}
            onPress={onButton2Press}
            underlayColor={Colors.Gray2}
          >
            <View style={styles.imageBtn}>{iconSquareStop()}</View>
            <Text style={styles.text}>{configuration.text2}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            testID={TESTID.BUTTON_TEMPLATE_3}
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
      </Card>
    </>
  );
});

export default ThreeButtonTemplate;
