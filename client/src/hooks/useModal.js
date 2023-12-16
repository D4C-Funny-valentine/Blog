import { useDispatch } from "react-redux";
import { setOpenModel } from "../redux/services/slices/modalSlice";

export const useModal = () => {
  const dispatch = useDispatch();

  const openModalHandler = (type) => {
    dispatch(setOpenModel({ isOpen: true, type }));
  };

  const closeModalHandler = (type) => {
    dispatch(setOpenModel({ isOpen: false, type }));
  };

  const autoOpenModalHandlerWhenNoToken = (token) => {
    if (token === null) {
      dispatch(setOpenModel({ isOpen: true, type: "signIn" }));
    }
  };

  return {
    openModalHandler,
    closeModalHandler,
    autoOpenModalHandlerWhenNoToken,
  };
};
