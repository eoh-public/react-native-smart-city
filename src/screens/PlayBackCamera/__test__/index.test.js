import React from 'react';
import { act, create } from 'react-test-renderer';
import PlayBackCamera from '..';
import { ModalCustom } from '../../../commons/Modal';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      goBack: jest.fn(),
    }),
    useRoute: jest.fn().mockReturnValue({
      params: {
        item: {},
        thumbnail: {},
      },
    }),
  };
});

const wrapComponent = () => (
  <SCProvider initState={mockSCStore({})}>
    <PlayBackCamera />
  </SCProvider>
);

describe('Test PlayBackCamera', () => {
  let tree;
  it('Test render', async () => {
    await act(() => {
      tree = create(wrapComponent());
    });
    const instance = tree.root;
    const HeaderCustoms = instance.findAllByType(ModalCustom);
    expect(HeaderCustoms).toHaveLength(1);
  });
});
