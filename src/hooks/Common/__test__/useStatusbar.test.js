import { useStatusBarPreview, useHiddenStatusBar } from '../useStatusBar';

describe('test useStatusBarPreview', () => {
  let Platform;
  beforeEach(() => {
    Platform = require('react-native').Platform;
  });

  it('test useStatusBarPreview on android', () => {
    Platform.OS = 'ios';
    useStatusBarPreview();
  });

  it('test useStatusBarPreview on iOS', () => {
    Platform.OS = 'android';
    useStatusBarPreview();
  });

  it('test useHiddenStatusBar on android', () => {
    Platform.OS = 'ios';
    useHiddenStatusBar(false);
  });

  it('test useHiddenStatusBar on iOS', () => {
    Platform.OS = 'android';
    useHiddenStatusBar(true);
  });
});
