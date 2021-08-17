import { useSCContextSelector } from '../../context';

// this hook is using for the screen have unit.user_id in route
export const useIsOwnerOfUnit = (unitOwnerId) => {
  const token = useSCContextSelector(state => state?.auth?.account?.token)
  let isOwner = token === unitOwnerId;

  return {
    isOwner,
  };
};
