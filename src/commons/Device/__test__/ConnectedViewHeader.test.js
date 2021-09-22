import React from 'react';
import { act, create } from 'react-test-renderer';
import moment from 'moment';

import Text from '../../Text';
import { ConnectedViewHeader } from '../ConnectedViewHeader';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';

const wrapComponent = (lastUpdated) => (
  <SCProvider initState={mockSCStore({})}>
    <ConnectedViewHeader lastUpdated={lastUpdated} />
    );
  </SCProvider>
);

describe('Test ConnectedViewHeader', () => {
  let tree;

  beforeAll(() => {
    Date.now = jest.fn(() => new Date('2021-01-24T12:00:00.000Z'));
  });

  test('render ConnectedViewHeader', async () => {
    const lastUpdated = moment(new Date('2021-01-20T05:00:00.629Z'));
    await act(() => {
      tree = create(wrapComponent(lastUpdated));
    });
    const isntance = tree.root;
    const texts = isntance.findAllByType(Text);
    expect(texts).toHaveLength(1);
  });

  test('render ConnectedViewHeader no last updated', async () => {
    await act(() => {
      tree = create(wrapComponent());
    });
    const isntance = tree.root;
    const texts = isntance.findAllByType(Text);
    expect(texts).toHaveLength(1);
  });
});
