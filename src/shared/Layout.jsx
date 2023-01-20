// src/shared/Layout.js

import React from "react";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const HeaderStyles = {
  width: "100%",
  height: "100px",
  display: "flex",
  alignItems: "center",
  paddingLeft: "20px",
  color: "white",
  fontWeight: "600",
  fontSize: "60px",
  margin: "120px 0 0 -50px",
};
const FooterStyles = {
  width: "100%",
  height: "50px",
  display: "flex",
  background: "black",
  color: "white",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "12px",
};

const layoutStyles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "90vh",
};

function Header() {
  const navigate = useNavigate();
  return (
    <div style={{ ...HeaderStyles }}>
      <img
        src={process.env.PUBLIC_URL + "img/main1.png"}
        alt="logo"
        onClick={() => navigate("/Index")}
      />
      <span>우리 주인님을 소개합니다</span>
    </div>
  );
}

function Footer() {
  return (
    <div style={{ ...FooterStyles }}>
      <span>copyright @Team 3</span>
    </div>
  );
}

function Layout({ children }) {
  return (
    <div>
      <Header />
      <div style={{ ...layoutStyles }}>{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
