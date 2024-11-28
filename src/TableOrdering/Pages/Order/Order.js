import { Outlet } from "react-router-dom";
import HeaderComponent from "../../Components/Header/Header";
import "./Order.css";

function OrderPage() {
  return (
    <>
      <HeaderComponent />
      <Outlet></Outlet>
    </>
  );
}

export default OrderPage;
