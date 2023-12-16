import { useUserInfoQuery } from "../redux/services/api/userApi";
import { useSelector } from "react-redux";

export const useUser = () => {
  const { token } = useSelector((state) => state.userStore);
  const { data, isLoading } = useUserInfoQuery(token);

  return !isLoading && { user: data?.user };
};
