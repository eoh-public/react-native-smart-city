import React from 'react';
import { act, create } from 'react-test-renderer';

import MenuActionAddnew from '../../../commons/MenuActionAddnew';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';
import AddMenu from '../AddMenu';

const mockedNavigate = jest.fn();
const mockedAfterItemClick = jest.fn();
const mockedHideAddModal = jest.fn();

const wrapComponent = (unit) => (
  <SCProvider initState={mockSCStore({})}>
    <AddMenu
      unit={unit}
      afterItemClick={mockedAfterItemClick}
      showAdd={true}
      setHideAdd={mockedHideAddModal}
    />
  </SCProvider>
);

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
    useIsFocused: jest.fn(),
  };
});

jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    memo: (x) => x,
  };
});

describe('Test AddMenu Unit', () => {
  let tree;
  test('render AddMenu without route', async () => {
    let unit = { id: 1, name: 'Unit 1' };
    await act(async () => {
      tree = create(wrapComponent(unit));
    });

    const instance = tree.root;
    const menuActionAddnew = instance.findAllByType(MenuActionAddnew);
    expect(menuActionAddnew).toHaveLength(1);
  });

  test('test hideAddModal', async () => {
    let unit = { id: 1, name: 'Unit 1' };
    await act(async () => {
      tree = create(wrapComponent(unit));
    });

    const instance = tree.root;
    const menuActionAddnew = instance.findByType(MenuActionAddnew);
    act(() => {
      menuActionAddnew.props.hideModal();
    });
    expect(menuActionAddnew.props.visible).toBe(true);
  });

  test('test onItemClick', async () => {
    let unit = { id: 1, name: 'Unit 1' };
    await act(async () => {
      tree = create(wrapComponent(unit));
    });

    const instance = tree.root;
    const menuActionAddnew = instance.findByType(MenuActionAddnew);
    act(() => {
      menuActionAddnew.props.onItemClick({
        route: 'route test',
        data: 'data test',
      });
    });

    expect(menuActionAddnew.props.visible).toBe(true);
    expect(mockedAfterItemClick).toHaveBeenCalled();
    expect(mockedNavigate).toHaveBeenCalledWith('route test', 'data test');
  });
});
