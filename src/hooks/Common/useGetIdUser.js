import { useSCContextSelector } from '../../context';

export const useGetIdUser = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const idUser = useSCContextSelector(
    (state) => state?.auth?.account?.user?.id
  );
  return idUser;
};
