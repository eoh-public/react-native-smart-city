import React, { memo, useState, useEffect, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import HighchartsReactNative from '@highcharts/highcharts-react-native';
import moment from 'moment';
import { Colors } from '../../configs';

const convertData = (data = []) => {
  let arr = [];
  for (let i = 0; i < data.length; i++) {
    arr.push([moment(data[i].x).valueOf(), data[i].y]);
  }
  return arr;
};
const chartOptions = {
  chart: {},
  credits: {
    enabled: false,
  },
  rangeSelector: {
    selected: 1,
  },
  yAxis: {
    title: {
      text: '',
    },
  },
  title: {
    text: '',
  },

  series: [
    {
      name: 'AQI',
      data: [],
      type: 'spline',
      tooltip: {
        valueDecimals: 2,
      },
    },
  ],
  time: {
    timezoneOffset: -7 * 60,
  },
  xAxis: {
    type: 'datetime',
    title: {
      text: '',
    },
    labels: {
      formatter: function (value) {
        const time = new Date(this.value || value);
        let date = ('0' + time.getDate()).slice(-2);
        let month = ('0' + (time.getMonth() + 1)).slice(-2);
        let hours = ('0' + time.getHours()).slice(-2);
        let minutes = ('0' + time.getMinutes()).slice(-2);
        if (hours === '00' && minutes === '00') {
          return `${date}.${month}`;
        }
        return `${hours}:${minutes}`;
      },
    },
    minRange: 3600 * 1000,
  },
  plotOptions: {
    series: {
      point: {
        events: {
          click: () => {
            let series = this.series.chart.series;
            const seriesIndex = this.series.index;
            for (let i = 0; i < series.length; i++) {
              if (series[i].index !== seriesIndex) {
                series[i].visible ? series[i].hide() : series[i].show();
              }
            }
            return false;
          },
        },
      },
      events: {
        legendItemClick: (event) => {
          if (!this.visible) {
            return true;
          }
          let seriesIndex = this.index;
          let series = this.chart.series;
          for (let i = 0; i < series.length; i++) {
            if (series[i].index !== seriesIndex) {
              series[i].visible ? series[i].hide() : series[i].show();
            }
          }
          return false;
        },
      },
      showInNavigator: true,
    },
  },
};

function LinearChart({ datas }) {
  const [options, setOption] = useState(chartOptions);
  const getSeries = useCallback(() => {
    let series = [];
    for (let i = 0; i < datas.length; i++) {
      const arr = convertData(datas[i].data);

      series.push({
        name: datas[i].title,
        data: arr,
        type: 'spline',
        color: datas[i].color,
      });
    }
    return series;
  }, [datas]);

  const updateChart = useCallback(() => {
    setOption({
      ...chartOptions,
      series: getSeries(),
    });
  }, [getSeries]);

  useEffect(() => {
    updateChart();
  }, [updateChart]);

  return (
    <View style={styles.container}>
      <HighchartsReactNative styles={styles.chartStyle} options={options} />
    </View>
  );
}

export default memo(LinearChart);

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    backgroundColor: Colors.White,
    justifyContent: 'center',
    flex: 1,
    marginRight: 24,
  },
  chartStyle: {
    backgroundColor: Colors.White,
    flex: 1,
  },
});
