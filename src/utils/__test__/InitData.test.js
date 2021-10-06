import * as Sentry from '@sentry/react-native';
import { initData } from '../InitData';

jest.mock('@sentry/react-native');

describe('Test initData', () => {
  afterEach(() => {
    Sentry.setUser.mockClear();
  });

  it('Test initData when has user', () => {
    initData({ token: 1, user: { id: 1 } });
    expect(Sentry.setUser).toBeCalledWith({ id: 1 });
  });

  it('Test initData when has no user', () => {
    initData({ token: 1 });
    expect(Sentry.setUser).not.toBeCalled();
  });
});
