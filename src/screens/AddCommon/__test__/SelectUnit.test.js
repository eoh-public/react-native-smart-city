import React from 'react';
import renderer, { act } from 'react-test-renderer';

import AddCommonSelectUnit from '../SelectUnit';
import { TouchableOpacity } from 'react-native';
import Text from '../../../commons/Text';

describe('Test ParkingInputManually container', () => {
  let tree;
  const list_type = ['AddSubUnit', 'AddDevice', 'AddMember', ''];
  const result = [
    'Thêm khu vực',
    'Thêm thiết bị',
    'Chọn một địa điểm',
    'Thêm khu vực',
  ];
  list_type.forEach(function (type, i) {
    test(`create ParkingInputManually ${type} container`, () => {
      const route = { params: { addType: type } };
      act(() => {
        tree = renderer.create(<AddCommonSelectUnit route={route} />);
      });
      const instance = tree.root;
      const button = instance.findAllByType(TouchableOpacity);
      expect(button.length).toBe(2);
      const button1 = instance.findAllByType(Text);
      expect(button1[0].props.children).toEqual(result[i]);
    });
  });
});
