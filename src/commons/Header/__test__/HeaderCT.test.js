import React from 'react';
import { TouchableOpacity } from 'react-native';
import { act } from '@testing-library/react-hooks';
import { create } from 'react-test-renderer';
import { HeaderCustom } from '..';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';

const mockOnRefresh = jest.fn();
const mockShowPopoverWithRef = jest.fn();

const wrapComponent = (defaultProps) => (
  <SCProvider initState={mockSCStore({})}>
    <HeaderCustom {...defaultProps} />
  </SCProvider>
);

describe('Test HeaderCustom', () => {
  let tree;
  let defaultProps = {
    title: '',
    isShowRight: false,
    onRefresh: mockOnRefresh,
    showPopoverWithRef: mockShowPopoverWithRef,
  };

  it('Test not render right', () => {
    act(() => {
      tree = create(wrapComponent(defaultProps));
    });
    const instance = tree.root;
    const TouchableOpacityElement = instance.findAllByType(TouchableOpacity);
    expect(TouchableOpacityElement).toHaveLength(1);
  });

  it('Test render right', () => {
    defaultProps = { ...defaultProps, isShowRight: true };
    act(() => {
      tree = create(wrapComponent(defaultProps));
    });
    const instance = tree.root;
    const TouchableOpacityElement = instance.findAllByType(TouchableOpacity);
    expect(TouchableOpacityElement).toHaveLength(3);
    act(() => {
      TouchableOpacityElement[1].props.onPress();
    });
    expect(mockOnRefresh).toBeCalled();
    act(() => {
      TouchableOpacityElement[2].props.onPress();
    });
    expect(mockShowPopoverWithRef).toBeCalled();
  });

  it('Test render without props', () => {
    act(() => {
      tree = create(wrapComponent(defaultProps));
    });
    const instance = tree.root;
    const TouchableOpacityElement = instance.findAllByType(TouchableOpacity);
    expect(TouchableOpacityElement).toHaveLength(3);
  });
});
