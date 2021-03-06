import * as React from 'react';
import { CardStyleInterpolators } from '@react-navigation/stack';
import { StackActions } from '@react-navigation/native';

// NavigationContainer is referred here - Check NavigationStack
export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function goBack() {
  navigationRef.current?.goBack();
}

export const screenOptions = {
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

export const popAction = (value) => StackActions.pop(value);

export default {
  navigate,
  goBack,
};
