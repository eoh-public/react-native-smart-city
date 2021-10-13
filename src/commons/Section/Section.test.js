import React from 'react';
import { Text, View } from 'react-native';
import renderer, { act } from 'react-test-renderer';

import { Section } from './Section';

describe('Section', () => {
  let tree;

  test('Shoud match empty snapshot when type is border', () => {
    const component = (
      <Section type={'border'}>
        <Text>Hello world</Text>
      </Section>
    );
    act(() => {
      tree = renderer.create(component);
    });
    const instance = tree.root;
    const Views = instance.findAllByType(View);
    expect(Views).toHaveLength(1);
  });

  test('Shoud match empty snapshot when type is shadow', () => {
    const component = (
      // eslint-disable-next-line react-native/no-inline-styles
      <Section type={'shadow'} style={{ padding: 10 }}>
        <Text>Hello world</Text>
      </Section>
    );
    act(() => {
      tree = renderer.create(component);
    });
    const instance = tree.root;
    const Views = instance.findAllByType(View);
    expect(Views).toHaveLength(1);
  });
});
