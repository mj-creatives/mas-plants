import React from "react";
import HeaderTwo from "../../components/headers/header-two";
import Breadcrubs from "../common/widgets/breadcrubs";
import Helmet from "react-helmet";
import favicon from "../../public/assets/images/favicon/1.png";
import MasterFooter from "../footers/common/MasterFooter";
import logof2 from "../../public/assets/images/icon/logo/f2.png";
import MasterFooterTwo from "../../components/footers/common/MasterFooterTwo";

const CommonLayout = ({ children, title, parent, subTitle }) => {
  return (
    <>
      {/* <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href={favicon ? favicon : ""} />
      </Helmet> */}
      <HeaderTwo
        logoName={"logo/15.png"}
        headerClass="header-2 green-gradient"
        topClass="top-header top-header-dark"
      />
      <Breadcrubs title={title} parent={parent} subTitle={subTitle} />
      <>{children}</>
      <MasterFooterTwo
        footerClass="footer-5"
        logoName={logof2}
        btnGreen={true}
      />
    </>
  );
};

export default CommonLayout;
