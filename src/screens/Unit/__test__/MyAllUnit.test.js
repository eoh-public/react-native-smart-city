import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { useNavigation } from '@react-navigation/native';

import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';
import MyAllUnit from '../MyAllUnit';
import ListMyAllUnit from '../components/ListMyAllUnit';
import Header from '../components/Header';

const mockGoBack = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      goBack: mockGoBack,
    }),
  };
});

const wrapComponent = (route, navigation) => (
  <SCProvider initState={mockSCStore({})}>
    <MyAllUnit route={route} navigation={navigation} />
  </SCProvider>
);

describe('Test MyAllUnit', () => {
  let tree;
  let route = {
    params: {
      myUnits: [
        {
          id: 1,
          background: 'background test',
          name: 'name test',
          stations: [
            {
              name: 'stations test',
              sensors: [
                {
                  name: 'sensors name test',
                },
              ],
            },
          ],
        },
        {
          id: 2,
          background: 'background test 2',
          name: 'name test 2',
          stations: [
            {
              name: 'stations test 2',
              sensors: [
                {
                  name: 'sensors name test 2',
                },
              ],
            },
          ],
        },
      ],
    },
  };
  test('test render MyAllUnit', () => {
    const navigation = useNavigation();
    act(() => {
      tree = renderer.create(wrapComponent(route, navigation));
    });
    const instance = tree.root;
    const listMyAllUnit = instance.findByType(ListMyAllUnit);
    expect(listMyAllUnit.props.unitItems).toEqual(route.params.myUnits);
  });

  test('test header goBack', () => {
    const navigation = useNavigation();
    act(() => {
      tree = renderer.create(wrapComponent(route, navigation));
    });
    const instance = tree.root;
    const header = instance.findByType(Header);
    act(() => {
      header.props.goBack();
    });
    expect(mockGoBack).toHaveBeenCalled();
  });
});
