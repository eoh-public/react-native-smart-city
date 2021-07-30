import React, { memo, useCallback, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import QualityIndicatorItem from './WaterQualitySensor/QualityIndicatorsItem';
import AlertStatusMachine from './WaterPurifierStatus/AlertStatusMachine';
import Modal from 'react-native-modal';
import { useBoolean } from '../../hooks/Common';
import Text from '../Text';
import Routes from '../../utils/Route';
import { IconFill, IconOutline } from '@ant-design/icons-react-native';
import { Colors, Constants } from '../../configs';
import { t } from 'i18n-js';
import { TESTID } from '../../configs/Constants';

const marginHorizontal = 20;
const widthItem = (Constants.width - marginHorizontal * 2) / 2;

const FlatListItems = memo(({ data, style, title, offsetTitle }) => {
  const [showInfo, setShowInfo, setHideInfo] = useBoolean(false);
  const filtersNeedReplace = data.filter((item) => item.value <= 10);

  const [viewFull, setViewFull] = useState(false);
  const isFilters = title === 'filters';

  const stylesOffset = StyleSheet.create({
    moveUpOffset: {
      bottom: offsetTitle * 50,
    },
  });

  const getNElementData = useCallback(
    (n) => {
      return data ? data.slice(0, n) : data;
    },
    [data]
  );

  const renderFlatList = useCallback(() => {
    let items = [];
    if (data) {
      if (isFilters) {
        items = viewFull ? data : getNElementData(4);
      } else {
        items = data;
      }
    }
    return items.map((item, index) => (
      <QualityIndicatorItem
        key={item.id.toString()}
        standard={item.standard}
        value={item.value}
        measure={item.measure}
        evaluate={item.evaluate}
        style={styles.boxStatus}
        descriptionScreen={Routes.TDSGuide}
        type={title}
      />
    ));
  }, [data, getNElementData, isFilters, title, viewFull]);

  return (
    <View style={style}>
      <View
        style={[
          styles.titleFilter,
          !isFilters ? stylesOffset.moveUpOffset : '',
        ]}
      >
        <Text size={20} semibold>
          {t(title)}
        </Text>
        {isFilters && (
          <TouchableOpacity
            onPress={setShowInfo}
            style={styles.iconInfo}
            testID={TESTID.TOUCH_INFO_FLAT_LIST_ITEM}
          >
            <IconOutline name={'info-circle'} size={16} color={Colors.Gray8} />
          </TouchableOpacity>
        )}
      </View>

      {filtersNeedReplace.length > 0 && filtersNeedReplace[0].measure === 'H' && (
        <AlertStatusMachine
          message={t('%{number}_filter_need_to_be_replaced', {
            number: filtersNeedReplace.length,
          })}
          style={styles.alertReplaceFilter}
          icon={'warning'}
        />
      )}
      <View style={styles.listBox}>{renderFlatList()}</View>

      {isFilters && !viewFull && (
        <TouchableOpacity
          style={styles.viewMore}
          onPress={() => setViewFull(true)}
        >
          <Text style={styles.textSeeMore}>{t('see_more')}</Text>
          <IconFill name={'caret-down'} color={Colors.Gray8} size={16} />
        </TouchableOpacity>
      )}

      <Modal
        isVisible={showInfo}
        onBackButtonPress={setHideInfo}
        onBackdropPress={setHideInfo}
        backdropColor={Colors.Transparent}
        animationIn={'zoomIn'}
        animationOut={'zoomOut'}
      >
        <View style={[styles.popoverStyle, styles.buttonShadow]}>
          <Text type="Label" color={Colors.Gray8}>
            {t('filter_water_purifier_description_1')}
            {'\n'}
            {t('filter_water_purifier_description_2')}
          </Text>
        </View>
      </Modal>
    </View>
  );
});

export default FlatListItems;

const styles = StyleSheet.create({
  listBox: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  popoverStyle: {
    width: '100%',
    backgroundColor: Colors.White,
    position: 'absolute',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  buttonShadow: {
    shadowColor: Colors.Gray11,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
    marginBottom: 16,
    marginRight: 16,
  },
  titleFilter: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  boxStatus: {
    borderColor: Colors.Gray4,
    borderWidth: 1,
    width: widthItem,
    height: 126,
    marginTop: 8,
  },
  boxWarningReplace: {
    borderColor: Colors.Red6,
    borderWidth: 1,
    width: widthItem,
    height: 126,
    marginTop: 8,
  },
  alertReplaceFilter: {
    backgroundColor: Colors.Red1,
    paddingVertical: 9,
    borderColor: Colors.Red6,
    marginRight: 16,
    marginBottom: 10,
  },
  iconInfo: {
    paddingHorizontal: 10,
  },
  viewMore: {
    top: 20,
    paddingVertical: 5,
    borderColor: Colors.Gray5,
    borderWidth: 1,
    marginRight: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSeeMore: {
    paddingRight: 5,
  },
});
