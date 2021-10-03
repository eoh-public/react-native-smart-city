import React from 'react';
import { TouchableOpacity } from 'react-native';
import { create } from 'react-test-renderer';
import { act } from 'react-test-renderer';
import UnitSummary from '../';
import styles from '../indexstyles';

const mockGoToSummary = jest.fn();

describe('Test UnitSummary', () => {
  let tree;
  const defaultProps = {
    summary: {
      color_right_text: null,
      color_left_text: null,
    },
    mockGoToSummary: mockGoToSummary,
  };

  it('Test index = 0', async () => {
    await act(() => {
      tree = create(<UnitSummary {...defaultProps} index={0} />);
    });
    const instance = tree.root;
    const TouchableOpacities = instance.findAllByType(TouchableOpacity);
    expect(TouchableOpacities[0].props.style).toEqual([
      styles.summaryContainer,
      { borderTopLeftRadius: 10 },
    ]);
  });

  it('Test index = 1', async () => {
    await act(() => {
      tree = create(<UnitSummary {...defaultProps} index={1} />);
    });
    const instance = tree.root;
    const TouchableOpacities = instance.findAllByType(TouchableOpacity);
    expect(TouchableOpacities[0].props.style).toEqual([
      styles.summaryContainer,
      { borderTopRightRadius: 10 },
    ]);
  });

  it('Test len % 2 === 0 && index = len - 1', async () => {
    await act(() => {
      tree = create(<UnitSummary {...defaultProps} index={1} len={2} />);
    });
    const instance = tree.root;
    const TouchableOpacities = instance.findAllByType(TouchableOpacity);
    expect(TouchableOpacities[0].props.style).toEqual([
      styles.summaryContainer,
      { borderBottomRightRadius: 10 },
    ]);
  });

  it('Test len % 2 !== 0 && index = len - 1', async () => {
    await act(() => {
      tree = create(<UnitSummary {...defaultProps} index={2} len={3} />);
    });
    const instance = tree.root;
    const TouchableOpacities = instance.findAllByType(TouchableOpacity);
    expect(TouchableOpacities[0].props.style).toEqual([
      styles.summaryContainer,
      { borderBottomLeftRadius: 10 },
    ]);
  });
});
