import React from 'react';
import { SectionList, Text } from 'react-native';
import { create } from 'react-test-renderer';
import { act } from '@testing-library/react-hooks';
import ActivityLog from '../';
import { Constants } from '../../../configs';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';
import ItemLog from '../ItemLog';
import { AUTOMATE_TYPE } from '../../../configs/Constants';
import axios from 'axios';

const mockUseSelector = jest.fn();

jest.mock('react-redux', () => {
  return {
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
    useSelector: () => mockUseSelector,
  };
});

jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    memo: (x) => x,
  };
});

jest.mock('axios');

const wrapComponent = (route) => (
  <SCProvider initState={mockSCStore({})}>
    <ActivityLog route={route} />
  </SCProvider>
);

describe('Test Activity log', () => {
  let tree;
  let route = {
    params: {
      id: 1,
      type: `automate.${AUTOMATE_TYPE.ONE_TAP}`,
    },
  };
  Date.now = jest.fn(() => new Date('2021-07-02T15:48:24.917932Z'));

  it('render empty list', async () => {
    axios.get.mockImplementation(async () => {
      return { status: 400 };
    });
    await act(async () => {
      tree = await create(wrapComponent(route));
    });
    const instance = tree.root;
    const SectionListElement = instance.findAllByType(SectionList);
    expect(SectionListElement).toHaveLength(1);
    const TextElement = instance.findAllByType(Text);
    expect(TextElement[2].props.style).toEqual({
      alignSelf: 'center',
      marginTop: Constants.height * 0.3,
      fontSize: 16,
    });
  });

  it('render list', async () => {
    axios.get.mockImplementationOnce(() => ({
      status: 200,
      data: {
        results: [
          {
            id: 1,
            content_code: 'ACTIVATED_BY',
            params: { username: 'name' },
            created_at: '2021-07-01T15:48:24.917932Z',
          },
        ],
        count: 1,
      },
    }));
    await act(async () => {
      tree = await create(wrapComponent(route));
    });
    const instance = tree.root;
    const items = instance.findAllByType(ItemLog);
    expect(items).toHaveLength(1);
  });
});
