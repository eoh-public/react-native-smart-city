import React from 'react';
import { act, create } from 'react-test-renderer';

import MenuActionAddnew from '../../../commons/MenuActionAddnew';
import AddMenu from '../AddMenu';

const mockedNavigate = jest.fn();
const mockedAfterItemClick = jest.fn();
const mockedHideAddModal = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
    useIsFocused: jest.fn(),
  };
});

describe('Test AddMenu Unit', () => {
  let tree;
  test('render AddMenu without route', async () => {
    let unit = { id: 1, name: 'Unit 1' };
    let route_data = { route: '', data: {} };
    await act(async () => {
      tree = create(
        <AddMenu
          unit={unit}
          afterItemClick={mockedAfterItemClick}
          showAdd={true}
          setHideAdd={mockedHideAddModal}
        />
      );
    });

    const instance = tree.root;
    const menuActionAddnew = instance.findAllByType(MenuActionAddnew);
    expect(menuActionAddnew).toHaveLength(1);
    await act(async () => {
      await menuActionAddnew[0].props.onItemClick(route_data);
    });
    expect(mockedNavigate).toHaveBeenCalledTimes(0);
    expect(mockedAfterItemClick).toHaveBeenCalledTimes(1);
    expect(mockedHideAddModal).toHaveBeenCalledWith(true);
  });
});
