import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { Text } from 'react-native';
import AccountItem from '../AccountItem';

describe('Test AccountItem', () => {
  let wrapper;
  test('create AccountItem', () => {
    act(() => {
      wrapper = renderer.create(
        <AccountItem key={'account'} account={'account'} />
      );
    });
    const instance = wrapper.root;
    const text = instance.findAllByType(Text);
    expect(text.length).toBe(1);
  });
  test('create AccountItem account', () => {
    act(() => {
      wrapper = renderer.create(
        <AccountItem key={'account'} account={{ name: 'name' }} />
      );
    });
    const instance = wrapper.root;
    const text = instance.findAllByType(Text);
    expect(text.length).toBe(2);
  });
});
