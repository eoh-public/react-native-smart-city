import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../../configs';
import styles from './indexstyles';

const UnitSummary = ({ summary, goToSummary, index, len }) => {
  let RadiusProps = {};
  if (index === 0) {
    RadiusProps = StyleSheet.create({
      radiusProps: {
        borderTopLeftRadius: 10,
      },
    });
  }
  if (index === 1) {
    RadiusProps = StyleSheet.create({
      radiusProps: {
        borderTopRightRadius: 10,
      },
    });
  }
  if (len % 2 === 0 && index === len - 1) {
    RadiusProps = StyleSheet.create({
      radiusProps: {
        borderBottomRightRadius: 10,
      },
    });
  }
  if (len % 2 !== 0 && index === len - 1) {
    RadiusProps = StyleSheet.create({
      // eslint-disable-next-line react-native/no-unused-styles
      radiusProps: {
        borderBottomLeftRadius: 10,
      },
    });
  }
  const stylesProps = StyleSheet.create({
    colorRightText: {
      color: summary.color_right_text || Colors.Yellow6,
    },
    colorLeftText: {
      color: summary.color_left_text || Colors.Yellow6,
    },
  });
  return (
    <TouchableOpacity
      onPress={() => goToSummary(summary)}
      style={[styles.summaryContainer, RadiusProps.radiusProps]}
    >
      <View>
        <Text
          style={[styles.leftValue, stylesProps.colorLeftText]}
          numberOfLines={1}
        >
          {summary.left_value}
        </Text>
        <Text style={styles.leftText}>{summary.left_text}</Text>
      </View>
      <View>
        <Text style={[styles.rightValue, stylesProps.colorRightText]}>
          {summary.right_value}
        </Text>
        <Text style={styles.rightText}>{summary.right_text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default UnitSummary;
