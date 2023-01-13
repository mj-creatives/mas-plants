import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MENUITEMS } from "../../constant/menu";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

const NavBar = () => {
  const { t } = useTranslation();
  const [navClose, setNavClose] = useState({ right: "0px" });
  const router = useRouter();

  useEffect(() => {
    if (window.innerWidth < 750) {
      setNavClose({ right: "-410px" });
    }
    if (window.innerWidth < 1199) {
      setNavClose({ right: "-300px" });
    }
  }, []);

  const openNav = () => {
    setNavClose({ right: "0px" });
    if (router.asPath == "/layouts/Gym")
      document.querySelector("#topHeader").classList.add("zindex-class");
  };

  const closeNav = () => {
    setNavClose({ right: "-410px" });
    if (router.asPath == "/layouts/Gym")
      document.querySelector("#topHeader").classList.remove("zindex-class");
  };
  // eslint-disable-next-line

  const [mainmenu, setMainMenu] = useState(MENUITEMS);

  useEffect(() => {
    const currentUrl = location.pathname;
    MENUITEMS.filter((items) => {
      if (items.path === currentUrl) setNavActive(items);
    });
  }, []);

  const setNavActive = (item) => {
    MENUITEMS.filter((menuItem) => {
      if (menuItem != item) menuItem.active = false;
    });

    setMainMenu({ mainmenu: MENUITEMS });
  };

  return (
    <div>
      <div className="main-navbar">
        <div id="mainnav">
          <div className="toggle-nav" onClick={openNav.bind(this)}>
            <i className="fa fa-bars sidebar-bar"></i>
          </div>
          <ul className="nav-menu" style={navClose}>
            <li className="back-btn" onClick={closeNav.bind(this)}>
              <div className="mobile-back text-end">
                <span>Back</span>
                <i className="fa fa-angle-right ps-2" aria-hidden="true"></i>
              </div>
            </li>
            {MENUITEMS.map((menuItem, i) => {
              return (
                <li
                  key={i}
                >
                  <Link href={menuItem.path} className="nav-link">
                      {t(menuItem.title)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
