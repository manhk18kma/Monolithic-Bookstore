import React, { useEffect, useRef } from "react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import ContentCut from "@mui/icons-material/ContentCut";
import ContentCopy from "@mui/icons-material/ContentCopy";
import ContentPaste from "@mui/icons-material/ContentPaste";
import Cloud from "@mui/icons-material/Cloud";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Brightness6Icon from "@mui/icons-material/Brightness6";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { logout } from "../../../../Authentication/JwtService";
import { useNavigate } from "react-router-dom";
import { useAuthenticationContext } from "../../../../Authentication/AuthenticationContext";
import { Link } from "react-router-dom";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
interface UserDropdonwInterface {
  isDropdownOpen: any;
  setIsDropDownOpen: any;
}

const UserDropdown: React.FC<UserDropdonwInterface> = ({
  isDropdownOpen,
  setIsDropDownOpen,
}) => {
  const navigate = useNavigate();
  const authenticationContext = useAuthenticationContext();
  console.log(authenticationContext);

  return (
    // <div ref={userDropdownRef}>
    authenticationContext.isLoggedIn ? (
      <Paper
        sx={{
          width: 230,
          maxWidth: "100%",
          position: "fixed",
          top: "8.2vh",
          left: "83vw",
          zIndex: 9999,
          backgroundColor: "rgb(255,248,220)",
          border: "0.5vw solid rgb(210,180,140)",
        }}
      >
        <MenuList>
          <>
            <MenuItem>
              <ListItemIcon>
                <AccountCircleIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>View profile</ListItemText>
              <ListItemIcon>
                <ArrowForwardIosIcon fontSize="small" />
              </ListItemIcon>
            </MenuItem>

            <MenuItem>
              <ListItemIcon>
                <BorderColorIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Edit profile</ListItemText>
              <ListItemIcon>
                <ArrowForwardIosIcon fontSize="small" />
              </ListItemIcon>
            </MenuItem>

            <MenuItem>
              <ListItemIcon>
                <Brightness6Icon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Screen & bright</ListItemText>
              <ListItemIcon>
                <ArrowForwardIosIcon fontSize="small" />
              </ListItemIcon>
            </MenuItem>

            <MenuItem>
              <ListItemIcon>
                <HelpOutlineIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Support & help</ListItemText>
              <ListItemIcon>
                <ArrowForwardIosIcon fontSize="small" />
              </ListItemIcon>
            </MenuItem>
            <Divider />
            <MenuItem
              onClick={() => {
                authenticationContext.setIsLoggedIn(false);
                logout(navigate);
              }}
            >
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Log out</ListItemText>
            </MenuItem>
          </>
        </MenuList>
      </Paper>
    ) : (
      <Paper
        sx={{
          width: 230,
          maxWidth: "100%",
          position: "fixed",
          top: "8.2vh",
          left: "83vw",
          zIndex: 9999,
          backgroundColor: "rgb(255,248,220)",
          border: "0.5vw solid rgb(210,180,140)",
        }}
      >
        <MenuList>
          <>
            <MenuItem
              onClick={() => {
                navigate("/loginpage");
              }}
            >
              <ListItemText>Log in</ListItemText>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
            </MenuItem>
            <Divider />
            <MenuItem
              onClick={() => {
                navigate("registrationpage");
              }}
            >
              <ListItemText>Register</ListItemText>
              <ListItemIcon>
                <PersonAddIcon fontSize="small" />
              </ListItemIcon>
            </MenuItem>
          </>
        </MenuList>
      </Paper>
    )
  );
};
export default UserDropdown;
