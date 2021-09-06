import { Colors } from '../../configs';
import moment from 'moment';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { HeaderCustom } from '../../commons/Header';
import styles from './Styles';

const PlayBackCamera = () => {
  const [selected, setSelected] = useState(moment().format('YYYY-MM-DD'));
  return (
    <View style={styles.wrap}>
      <HeaderCustom title={'Playback Camera'} />
      <Calendar
        current={selected}
        onDayPress={(day) => {
          setSelected(day.dateString);
        }}
        maxDate={moment().format('YYYY-MM-DD')}
        onMonthChange={(month) => {}}
        onPressArrowLeft={(subtractMonth) => subtractMonth()}
        onPressArrowRight={(addMonth) => addMonth()}
        markedDates={{
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: Colors.Primary,
            selectedTextColor: Colors.White,
          },
        }}
        enableSwipeMonths={true}
      />
    </View>
  );
};

export default PlayBackCamera;
