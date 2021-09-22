import React from 'react';
import renderer, { act } from 'react-test-renderer';
import MemberList from '../MemberList';
import RowMember from '../RowMember';
import Text from '../../Text';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';

const wrapComponent = (dataMember, ownerId, currentUserId, mockFunc) => (
  <SCProvider initState={mockSCStore({})}>
    <MemberList
      dataMember={dataMember}
      ownerId={ownerId}
      currentUserId={currentUserId}
      onPressRemove={mockFunc}
    />
  </SCProvider>
);

describe('MemberList', () => {
  let tree;
  const mockFunc = jest.fn();
  test('MemberList snapshot id dataMember === ownerId', () => {
    const dataMember = [{ id: 1, name: 'CEO' }];
    act(() => {
      tree = renderer.create(wrapComponent(dataMember, 1, 2, mockFunc));
    });
    const instance = tree.root;
    const textInputs = instance.findAllByType(Text);
    expect(textInputs.length).toBe(2);
  });
  test('MemberList snapshot id dataMember !== ownerId', () => {
    const dataMember = [{ id: 1, name: 'CEO' }];
    act(() => {
      tree = renderer.create(wrapComponent(dataMember, 2, null, mockFunc));
    });
    const instance = tree.root;
    const textInputs = instance.findAllByType(Text);
    expect(textInputs.length).toBe(1);
  });
  test('MemberList snapshot id dataMember === currentUserId', () => {
    const dataMember = [{ id: 1, name: 'CEO' }];
    act(() => {
      tree = renderer.create(wrapComponent(dataMember, 2, 1, mockFunc));
    });
    const instance = tree.root;
    const textInputs = instance.findAllByType(Text);
    expect(textInputs.length).toBe(2);
  });
  test('MemberList dataMember null', () => {
    const dataMember = [];
    act(() => {
      tree = renderer.create(wrapComponent(dataMember));
    });
    const instance = tree.root;
    const textInputs = instance.findAllByType(RowMember);
    expect(textInputs.length).toBe(0);
  });
});
