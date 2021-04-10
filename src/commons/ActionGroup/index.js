import React from 'react';

import OneBigButtonTemplate from './OneBigButtonTemplate';
import OnOffButtonTemplate from './OnOffButtonTemplate';
import ThreeButtonTemplate from './ThreeButtonTemplate';

const ActionGroup = ({ actionGroup, doAction }) => {
  switch (actionGroup.template) {
    case 'three_button_action_template':
      return (
        <ThreeButtonTemplate actionGroup={actionGroup} doAction={doAction} />
      );
    case 'on_off_button_action_template':
      return (
        <OnOffButtonTemplate actionGroup={actionGroup} doAction={doAction} />
      );
    case 'one_button_action_template':
      return (
        <OneBigButtonTemplate actionGroup={actionGroup} doAction={doAction} />
      );
  }
};

export default ActionGroup;
