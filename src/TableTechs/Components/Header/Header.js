import "./Header.css";
import logo from "../../../Assets/logo-orange.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function HeaderComponent() {

  const [isMenuOpen, toggleMenu] = useState(false);

  return (
    <>
      <div className="header-bg">
        <div className="header-logo">
          <img src={logo} className="header-logo-img" alt="header-logo" />
          <span className="header-logo-text poppins-black">Table Techs</span>
        </div>
        <div className="header-navigation">
          <span className="header-navigation-text poppins-regular">Pricing</span>
          <span className="header-navigation-text poppins-regular">About Us</span>
          <span className="header-navigation-text poppins-regular">Contact</span>
        </div>
        <div className="header-btn">
          <span className="header-btn-text poppins-regular">Get Started</span>
        </div>
        <div className="header-menu">
          {!isMenuOpen && <FontAwesomeIcon icon={faBars} className="header-menu-btn" onClick={() => toggleMenu(true)} />}
          {isMenuOpen && <FontAwesomeIcon icon={faXmark} className="header-menu-btn" onClick={() => toggleMenu(false)} />}
        </div>
      </div>
      {isMenuOpen && <div className="header-menu-navigation-bg" onClick={() => toggleMenu(false)}>
        <div className="header-menu-navigation" onClick={(e) => e.stopPropagation()}>
          <p className="header-menu-navigation-text poppins-regular text-border">Pricing</p>
          <p className="header-menu-navigation-text poppins-regular text-border">About Us</p>
          <p className="header-menu-navigation-text poppins-regular">Contact</p>
        </div>
      </div>}
    </>
  );
}

export default HeaderComponent;
