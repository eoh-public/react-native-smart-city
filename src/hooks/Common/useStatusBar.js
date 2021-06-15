import { useSCContextSelector } from '../../context';

export const useStatusBar = () => {
  const statusBar = useSCContextSelector((state) => state.statusBar);

  return {
    statusBar,
  };
};
