import React, { useEffect } from "react";
import "./App.css";
import PageRoutes from "./routes/PageRoutes";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/ui/Footer";
import { useDispatch, useSelector } from "react-redux";
import Model from "./components/AuthModel/Model";
import Toast from "./components/ui/Toast";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import MantineDrawer from "./lib/MantineDrawer";
import { useDisclosure } from "@mantine/hooks";
import Cookies from "js-cookie";
import { addUser } from "./redux/services/slices/userStoreSlice";

const App = () => {
  const model = useSelector((state) => state.model);
  const [opened, { open, close }] = useDisclosure(false);

  // first initialize for if the user login
  const dispatch = useDispatch();
  useEffect(() => {
    const token = Cookies.get("token");
    const cookieUser = Cookies.get("user");
    if (cookieUser && token) {
      const user = JSON.parse(cookieUser);
      dispatch(addUser({ token, user }));
    }
  }, []);
  return (
    <>
      {model.openModel ? (
        <Model />
      ) : (
        <MantineProvider>
          <div className="">
            <Navbar open={open} />
            <PageRoutes />
            <Footer />
            <MantineDrawer close={close} opened={opened} />
          </div>
        </MantineProvider>
      )}
      <Toast />
    </>
  );
};

export default App;
