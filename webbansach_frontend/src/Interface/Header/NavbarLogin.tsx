import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Search } from "react-bootstrap-icons";
import { Link, NavLink } from "react-router-dom";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SearchIcon from "@mui/icons-material/Search";
import UserDropdown from "../Homepage/Componnents/Util/UserDropdown";
import LoginIcon from "@mui/icons-material/Login";
import Heading from "../Homepage/Componnents/Util/Heading";
import { Button } from "react-bootstrap";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface NavbarLoginRegistrationInterface {
  text: string;
  textInput: string;
}

const NavbarLoginRegistration: React.FC<NavbarLoginRegistrationInterface> = ({
  text,
  textInput,
}) => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{
        backgroundColor: "rgb(255,248,220)",
        // position: "fixed",
        top: 0,
        width: "100vw",
        height: "8vh",
        zIndex: 1000,
      }}
    >
      <div style={{ marginLeft: "2vw" }}>
        <Link to={"/home"}>
          <Button
            style={{
              backgroundColor: "rgb(210,180,140)",
              border: "1px solid black",
              color: "black",
              fontSize: "1.2vw",
            }}
          >
            <ArrowBackIcon style={{ fontSize: "2vw" }} />
            {textInput}
          </Button>
        </Link>
      </div>
      <div style={{ marginLeft: "5vw" }}>
        {/* Logo */}
        <NavLink
          className="navbar-brand"
          to="/home"
          style={{ fontFamily: "Arial", fontSize: "2px", color: "black" }}
        >
          <img
            src="https://tse1.mm.bing.net/th?id=OIP.WpRxxW7x4tacdOlgwTmk8wHaEM&pid=Api&P=0&h=220"
            alt="Mô tả của logo"
            style={{
              borderRadius: "50%",
              width: "6vw",
              height: "6vh",
              objectFit: "cover",
            }}
          />
        </NavLink>
      </div>
      <div
        style={{
          display: "inline-block",
          backgroundColor: "rgb(210,180,140)",
          borderRadius: "20px",
          padding: "5px",
        }}
      >
        <h2>{text}</h2>
      </div>
    </nav>
  );
};

export default NavbarLoginRegistration;
