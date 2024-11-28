import { Outlet } from "react-router-dom";

import HeaderComponent from "../../Components/Header/Header";
import "./Main.css";

function MainPage() {
  return (
    <>
      <HeaderComponent />
      <Outlet></Outlet>
    </>
  );
}

export default MainPage;
