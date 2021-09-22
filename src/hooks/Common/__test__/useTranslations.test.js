import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { SCProvider } from '../../../context';
import { mockSCStore } from '../../../context/mockStore';
import { useTranslations } from '../useTranslations';

const mockedSetAction = jest.fn();

const wrapper = ({ children }) => <SCProvider>{children}</SCProvider>;

const mockUseContext = jest.fn().mockImplementation(() => ({
  stateData: mockSCStore({}),
  setAction: mockedSetAction,
}));

React.useContext = mockUseContext;

describe('Test useTranslations', () => {
  it('test useTranslations', () => {
    // eslint-disable-next-line no-unused-vars
    const { result } = renderHook(() => useTranslations(), { wrapper });
  });
});
