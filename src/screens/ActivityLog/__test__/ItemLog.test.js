import React from 'react';
import { Text } from 'react-native';
import { act, create } from 'react-test-renderer';
import ItemLog from '../ItemLog';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';

const wrapComponent = (props) => (
  <SCProvider initState={mockSCStore({})}>
    <ItemLog {...props} />
  </SCProvider>
);

jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    memo: (x) => x,
  };
});

test('test ItemLog action', () => {
  let tree;
  let props = {
    item: {
      action_name: 'action',
      name: 'name',
      created_at: '2021-07-02T15:48:24.917932Z',
    },
    type: 'action',
    length: 1,
    index: 0,
  };
  act(() => {
    tree = create(wrapComponent(props));
  });
  const instance = tree.root;
  const texts = instance.findAllByType(Text);
  expect(texts[2].props.children).toBe(props.item.name);
});

test('test ItemLog smart assistant', () => {
  let tree;
  let props = {
    item: {
      content_code: 'AUTO_ACTIVATED',
      created_at: '2021-07-02T15:48:24.917932Z',
    },
    type: 'automate',
    length: 2,
    index: 0,
  };
  act(() => {
    tree = create(wrapComponent(props));
  });
  const instance = tree.root;
  const texts = instance.findAllByType(Text);
  expect(texts[1].props.children).toBe('Auto Activated');
});

test('test ItemLog one tap', () => {
  let tree;
  let props = {
    item: {
      content_code: 'ACTIVATED_BY',
      params: {
        username: 'username',
      },
      created_at: '2021-07-02T15:48:24.917932Z',
    },
    type: 'automate',
    length: 2,
    index: 1,
  };
  act(() => {
    tree = create(wrapComponent(props));
  });
  const instance = tree.root;
  const texts = instance.findAllByType(Text);
  expect(texts[2].props.children).toBe(props.item.params.username);
});
