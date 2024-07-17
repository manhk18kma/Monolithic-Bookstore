import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Search } from "react-bootstrap-icons";
import { Link, NavLink } from "react-router-dom";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SearchIcon from "@mui/icons-material/Search";
import UserDropdown from "../Homepage/Componnents/Util/UserDropdown";
import LoginIcon from "@mui/icons-material/Login";
import { useAuthenticationContext } from "../../Authentication/AuthenticationContext";
import { getUrlAvt } from "../../Authentication/JwtService";

const Navbar = () => {
  const [hoveredStates, setHoveredStates] = useState({
    hovered1: true,
    hovered2: false,
    hovered3: false,
    hovered4: false,
    hovered6: false,
  });
  const navLinkStyle1 = {
    fontFamily: "Arial",
    fontSize: "1.2vw",
    color: "black",
    padding: "10px 15px",
    textDecoration: "none",
    borderRadius: "20px",
    backgroundColor: "grey",
  };
  const navLinkStyle2 = {
    fontFamily: "Arial",
    fontSize: "1.2vw",
    color: "black",
    padding: "10px 15px",
    textDecoration: "none",
    borderRadius: "20px",
    backgroundColor: "rgba(128,128,128,0.5)",
  };

  // handleDropdown
  const [isDropdownOpen, setIsDropDownOpen] = useState({
    notification: false,
    card: false,
    user: false,
  });
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const usericon = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        usericon?.current !== null &&
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node) &&
        !usericon.current.contains(event.target as Node)
      ) {
        setIsDropDownOpen((prevState) => ({ ...prevState, user: false }));
      }
    }
    isDropdownOpen.user &&
      document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userDropdownRef, isDropdownOpen]);

  useEffect(() => {}, []);

  //context authentication
  const authenticationContext = useAuthenticationContext();
  console.log(authenticationContext);
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{
        backgroundColor: "rgb(210,180,140)",
        position: "fixed",
        top: 0,
        width: "100vw",
        height: "8vh",
        zIndex: 1000,
      }}
    >
      <div className="container-fluid">
        {/* Logo */}
        <NavLink
          className="navbar-brand"
          to="/home"
          style={{ fontFamily: "Arial", fontSize: "2px", color: "black" }}
        >
          <img
            src="https://tse1.mm.bing.net/th?id=OIP.WpRxxW7x4tacdOlgwTmk8wHaEM&pid=Api&P=0&h=220"
            alt="Mô tả của logo"
            onClick={() => {
              setHoveredStates({
                ...hoveredStates,
                hovered1: true,
                hovered2: false,
                hovered3: false,
                hovered4: false,
                hovered6: false,
              });
            }}
            style={{
              borderRadius: "50%",
              width: "6vw",
              height: "6vh",
              objectFit: "cover",
            }}
          />
        </NavLink>

        {/* Home */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul
            className="navbar-nav me-auto mb-2 mb-lg-0"
            style={{ display: "flex", flexDirection: "row" }}
          >
            {/* Home */}
            <li className="nav-item" style={{ marginRight: "1vw" }}>
              <NavLink
                id="tt"
                className="nav-link"
                aria-current="page"
                to="/home"
                style={
                  hoveredStates["hovered1"] ? navLinkStyle1 : navLinkStyle2
                }
                onClick={() => {
                  setHoveredStates({
                    ...hoveredStates,
                    hovered1: true,
                    hovered2: false,
                    hovered3: false,
                    hovered4: false,
                    hovered6: false,
                  });
                }}
              >
                Home
              </NavLink>
            </li>
            {/* Author */}
            <li className="nav-item" style={{ marginRight: "1vw" }}>
              <NavLink
                id="tg"
                className="nav-link"
                aria-current="page"
                to="/author"
                style={
                  hoveredStates["hovered2"] ? navLinkStyle1 : navLinkStyle2
                }
                onClick={() => {
                  setHoveredStates({
                    ...hoveredStates,
                    hovered1: false,
                    hovered2: true,
                    hovered3: false,
                    hovered4: false,
                    hovered6: false,
                  });
                }}
              >
                Author
              </NavLink>
            </li>

            <li id="tl" className="nav-item" style={{ marginRight: "1vw" }}>
              <NavLink
                className="nav-link"
                aria-current="page"
                to="/genres"
                style={
                  hoveredStates["hovered3"] ? navLinkStyle1 : navLinkStyle2
                }
                onClick={() => {
                  setHoveredStates({
                    ...hoveredStates,
                    hovered1: false,
                    hovered2: false,
                    hovered3: true,
                    hovered4: false,
                    hovered6: false,
                  });
                }}
              >
                Genres
              </NavLink>
            </li>
            <li id="s" className="nav-item" style={{ marginRight: "1vw" }}>
              <NavLink
                className="nav-link"
                aria-current="page"
                to="/book"
                style={
                  hoveredStates["hovered4"] ? navLinkStyle1 : navLinkStyle2
                }
                onClick={() => {
                  setHoveredStates({
                    ...hoveredStates,
                    hovered1: false,
                    hovered2: false,
                    hovered3: false,
                    hovered4: true,
                    hovered6: false,
                  });
                }}
              >
                Book
              </NavLink>
            </li>

            <li id="s" className="nav-item" style={{ marginRight: "24vw" }}>
              <NavLink
                className="nav-link"
                aria-current="page"
                to="/contact"
                style={
                  hoveredStates["hovered6"] ? navLinkStyle1 : navLinkStyle2
                }
                onClick={() => {
                  setHoveredStates({
                    ...hoveredStates,
                    hovered1: false,
                    hovered2: false,
                    hovered3: false,
                    hovered4: false,
                    hovered6: true,
                  });
                }}
              >
                Contact
              </NavLink>
            </li>

            <li
              id="s"
              className="nav-item"
              style={{ marginTop: "1vh", marginRight: "0.8vw" }}
            >
              {/* Tìm kiếm */}
              <div className="d-flex">
                <input
                  id="inputSearch"
                  className="form-control me-2"
                  type="search"
                  placeholder="Tìm kiếm"
                  aria-label="Search"
                  style={{ width: "20vw" }}
                />
                <button
                  id="buttonSearch"
                  className="btn btn-outline-success"
                  type="button"
                >
                  <Search />
                </button>
              </div>
            </li>

            <li
              id="s"
              className="nav-item"
              style={{ marginTop: "1.5vh", marginRight: "0.8vw" }}
            >
              <div style={{ position: "relative", display: "inline-block" }}>
                <button style={{ border: "none", background: "none" }}>
                  <NotificationsActiveIcon
                    style={{ fontSize: "2vw", color: "rgb(105,105,105)" }}
                    // onClick={() =>
                    //   setIsDropDownOpen((prevState) => ({
                    //     ...prevState,
                    //     notification: !prevState.notification,
                    //   }))
                    // }
                  />
                  <span
                    className="badge rounded-pill badge-notification bg-danger custom-badge"
                    style={{
                      fontSize: "14px",
                      backgroundColor: "#4267B2",
                      color: "white",
                      borderRadius: "50%",
                      padding: "3px 6px",
                      position: "absolute",
                      top: "0.7vh", // Điều chỉnh số px bạn muốn xuống dưới
                      right: "0.8vw", // Điều chỉnh số px bạn muốn lùi sang trái
                      transform: "translate(50%, -50%)",
                      zIndex: "1",
                    }}
                  >
                    9
                  </span>
                </button>
              </div>
            </li>

            <li
              id="s"
              className="nav-item"
              style={{ marginTop: "1.5vh", marginRight: "0.8vw" }}
            >
              <div style={{ position: "relative", display: "inline-block" }}>
                <button style={{ border: "none", background: "none" }}>
                  <ShoppingCartIcon
                    style={{ fontSize: "2vw", color: "rgb(105,105,105)" }}
                  />
                  <span
                    className="badge rounded-pill badge-notification bg-danger custom-badge"
                    style={{
                      fontSize: "14px",
                      backgroundColor: "#4267B2",
                      color: "white",
                      borderRadius: "50%",
                      padding: "3px 6px",
                      position: "absolute",
                      top: "0.7vh", // Điều chỉnh số px bạn muốn xuống dưới
                      right: "0.8vw", // Điều chỉnh số px bạn muốn lùi sang trái
                      transform: "translate(50%, -50%)",
                      zIndex: "1",
                    }}
                  >
                    9
                  </span>
                </button>
              </div>
            </li>

            <li
              id="s"
              className="nav-item"
              style={{ marginTop: "1.5vh", marginRight: "2vw" }}
            >
              <div
                ref={usericon}
                style={{ position: "relative", display: "inline-block" }}
              >
                <button
                  onClick={() => {
                    setIsDropDownOpen((prevState) => ({
                      ...prevState,
                      user: !prevState.user,
                    }));
                  }}
                  style={{ border: "none", background: "none" }}
                >
                  {authenticationContext.isLoggedIn ? (
                    <img
                      src={getUrlAvt()}
                      alt="User"
                      style={{
                        width: "2vw",
                        height: "2vw",
                        borderRadius: "10px",
                      }}
                    />
                  ) : (
                    <AccountBoxIcon
                      style={{ fontSize: "2vw", color: "rgb(105,105,105)" }}
                    />
                  )}
                </button>

                {/* <img src={getUrlAvt()} alt="" /> */}
                {/* <span
                      className="badge rounded-pill badge-notification bg-danger custom-badge"
                      style={{
                        fontSize: "10px",
                        backgroundColor: "#4267B2",
                        color: "white",
                        borderRadius: "50%",
                        padding: "3px 6px",
                        position: "absolute",
                        top: "0.5vh", // Điều chỉnh số px bạn muốn xuống dưới
                        right: "0.5vw", // Điều chỉnh số px bạn muốn lùi sang trái
                        transform: "translate(50%, -50%)",
                        zIndex: "1",
                      }}
                    >
                      9
                    </span> */}
              </div>
            </li>
          </ul>
        </div>
      </div>

      {isDropdownOpen.user && (
        <div ref={userDropdownRef}>
          <UserDropdown
            isDropdownOpen={isDropdownOpen}
            setIsDropDownOpen={setIsDropDownOpen}
          />
        </div>
      )}
    </nav>
  );
};

export default Navbar;

// )
// : (
//   <li
//     id="s"
//     className="nav-item"
//     style={{ marginTop: "1.5vh", marginRight: "2vw" }}
//   >
//     <div
//       ref={usericon}
//       style={{ position: "relative", display: "inline-block" }}
//     >
//       <Link to={"/loginpage"}>
//         <button style={{ border: "none", background: "none" }}>
//           <LoginIcon
//             style={{ fontSize: "2vw", color: "rgb(105,105,105)" }}
//           />
//         </button>
//       </Link>
//     </div>
//   </li>
// )}
