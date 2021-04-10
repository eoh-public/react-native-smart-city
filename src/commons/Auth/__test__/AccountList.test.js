import React from 'react';
import renderer, { act } from 'react-test-renderer';
import AccountList from '../AccountList';
import { Text } from 'react-native';

describe('Test AccountList', () => {
  let wrapper;
  test('create 1 AccountList', () => {
    const accounts = [{ name: 'name', id: 1 }];
    act(() => {
      wrapper = renderer.create(<AccountList accounts={accounts} />);
    });
    const instance = wrapper.root;
    const text = instance.findAllByType(Text);
    expect(text.length).toBe(2);
  });

  test('render accounts null AccountList', () => {
    const accounts = [];
    act(() => {
      wrapper = renderer.create(<AccountList accounts={accounts} />);
    });
    const instance = wrapper.root;
    const text = instance.findAllByType(Text);
    expect(text.length).toBe(0);
  });

  test('render list accounts null AccountList', () => {
    const accounts = [{}];
    act(() => {
      wrapper = renderer.create(<AccountList accounts={accounts} />);
    });
    const instance = wrapper.root;
    const text = instance.findAllByType(Text);
    expect(text.length).toBe(1);
  });
});
