import FlatListItems from '../FlatListItems';
import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { TouchableOpacity } from 'react-native';
import { TESTID } from '../../../configs/Constants';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';

const wrapComponent = (data) => (
  <SCProvider initState={mockSCStore({})}>
    <FlatListItems data={data} title={'filters'} />
  </SCProvider>
);

describe('Test FlatListItems', () => {
  let tree;

  test('render FlatListItems', () => {
    const data = [
      {
        standard: 'Coil 1',
        value: 20,
      },
      {
        standard: 'Coil 2',
        value: 8,
      },
    ];
    act(() => {
      tree = renderer.create(wrapComponent(data));
    });
    const instance = tree.root;
    const touch = instance.find(
      (el) =>
        el.props.testID === TESTID.TOUCH_INFO_FLAT_LIST_ITEM &&
        el.type === TouchableOpacity
    );
    expect(touch).not.toBeUndefined();
  });
});
