import { useDispatch } from "react-redux";
import { setOpenModel } from "../../redux/services/slices/modalSlice";
import Cookies from "js-cookie";

const ProductRoute = ({ children }) => {
  const dispatch = useDispatch();
  const token = Cookies.get("token");

  if (token) {
    return children;
  } else {
    dispatch(setOpenModel({ isOpen: true, type: "signIn" }));
  }
};

export default ProductRoute;
