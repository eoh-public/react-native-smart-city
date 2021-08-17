import Text from '../Text';
import React, { memo, useMemo } from 'react';

import OneBigButtonTemplate from './OneBigButtonTemplate';
import ThreeButtonTemplate from './ThreeButtonTemplate';
import StatesGridActionTemplate from './StatesGridActionTemplate';
import NumberUpDownActionTemplate from './NumberUpDownActionTemplate';
import OptionsDropdownActionTemplate from './OptionsDropdownActionTemplate';
import OnOffTemplate from './OnOffTemplate';
import TimerActionTemplate from './TimerActionTemplate';

export const getActionComponent = (template) => {
  switch (template) {
    case 'three_button_action_template': // todo refactor later with backend
    case 'ThreeButtonActionTemplate':
      return ThreeButtonTemplate;
    case 'on_off_button_action_template': // todo refactor later with backend
    case 'OnOffButtonActionTemplate':
    case 'OnOffSimpleActionTemplate':
      return OnOffTemplate;
    case 'one_button_action_template': // todo refactor later with backend
    case 'OneBigButtonActionTemplate':
      return OneBigButtonTemplate;
    case 'NumberUpDownActionTemplate':
      return NumberUpDownActionTemplate;
    case 'StatesGridActionTemplate':
      return StatesGridActionTemplate;
    case 'OptionsDropdownActionTemplate':
      return OptionsDropdownActionTemplate;
    case 'TimerActionTemplate':
      return TimerActionTemplate;
    default:
      return null;
  }
};

const ActionGroup = memo((params) => {
  const { actionGroup } = params;
  const ButtonGroupComponent = useMemo(() => {
    return getActionComponent(actionGroup.template);
  }, [actionGroup]);

  return (
    <>
      {ButtonGroupComponent ? (
        <ButtonGroupComponent {...params} />
      ) : (
        <Text
          center
        >{`Invalid action template '${actionGroup.template}'`}</Text>
      )}
    </>
  );
});

export default ActionGroup;
