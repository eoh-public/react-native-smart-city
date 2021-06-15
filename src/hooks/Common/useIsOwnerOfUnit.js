import { useSCContextSelector } from '../../context';

// this hook is using for the screen have unit.user_id in route
export const useIsOwnerOfUnit = (unitOwnerId) => {
  const idUser = useSCContextSelector((state) => state.auth.account.user.id);
  let isOwner = idUser === unitOwnerId;

  return {
    isOwner,
  };
};
