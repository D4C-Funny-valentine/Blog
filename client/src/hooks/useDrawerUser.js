import { useDispatch, useSelector } from "react-redux";
import { setDrawerUser } from "../redux/services/slices/drawerUserSlice";

export const useDrawerUser = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userStore);

  const userDrawerHandler = (userId) => {
    dispatch(setDrawerUser({ owner: userId === user._id ? true : false }));
  };

  return {
    userDrawerHandler,
  };
};
