import React from 'react';
import renderer, { act } from 'react-test-renderer';
import FooterInfo from '../FooterInfo';
import { Image } from 'react-native';

import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';

const wrapComponent = (data) => (
  <SCProvider initState={mockSCStore({})}>
    <FooterInfo data={data} />
  </SCProvider>
);

describe('Test FooterInfo', () => {
  let wrapper;

  test('render FooterInfo', async () => {
    const data = { icon_powered_by: 'icon', hotline: 'hotline' };
    await act(() => {
      wrapper = renderer.create(wrapComponent(data));
    });
    const instance = wrapper.root;
    const text = instance.findAllByType(Image);
    expect(text.length).toEqual(0);
  });
});
