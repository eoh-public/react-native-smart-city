import React from 'react';
import { act, create } from 'react-test-renderer';
import moment from 'moment';

import Text from '../../Text';
import { ConnectedViewHeader } from '../ConnectedViewHeader';

describe('Test ConnectedViewHeader', () => {
  let tree;

  beforeAll(() => {
    Date.now = jest.fn(() => new Date('2021-01-24T12:00:00.000Z'));
  });

  test('render ConnectedViewHeader', () => {
    const lastUpdated = moment(new Date('2021-01-20T05:00:00.629Z'));
    act(() => {
      tree = create(<ConnectedViewHeader lastUpdated={lastUpdated} />);
    });
    const isntance = tree.root;
    const texts = isntance.findAllByType(Text);
    expect(texts).toHaveLength(2);
    expect(texts[1].props.children).toContain('Cập nhật lần cuối');
  });

  test('render ConnectedViewHeader no last updated', () => {
    act(() => {
      tree = create(<ConnectedViewHeader />);
    });
    const isntance = tree.root;
    const texts = isntance.findAllByType(Text);
    expect(texts).toHaveLength(1);
  });
});
