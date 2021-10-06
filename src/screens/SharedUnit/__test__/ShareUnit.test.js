import React from 'react';
import { create, act } from 'react-test-renderer';
import SharedUnit from '../index';
import Modal from 'react-native-modal';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';

const wrapComponent = () => (
  <SCProvider initState={mockSCStore({})}>
    <SharedUnit />
  </SCProvider>
);

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useLayoutEffect: jest.fn(),
}));

jest.mock('react-native-onesignal', () => {
  return {
    setNotificationWillShowInForegroundHandler: jest.fn(),
  };
});

describe('test SharedUnit', () => {
  let tree;
  test('render SharedUnit', async () => {
    await act(async () => {
      tree = await create(wrapComponent());
    });
    const instance = tree.root;
    const modalShareds = instance.findAllByType(Modal);
    expect(modalShareds[0]).not.toBeUndefined();
  });
});
