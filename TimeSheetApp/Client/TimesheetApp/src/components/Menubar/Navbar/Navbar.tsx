import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MailIcon from "@mui/icons-material/Mail";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Avatar from "../../Avatar/Avatar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Button } from "@mui/material";
import NativeStorage from "../../../services/NativeStorage/NativeStorage";
import { useHistory } from "react-router";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ListMessages from "../../List/ListMessages/ListMessages";
import ListMails from "../../List/ListMails/ListMails";
import MobileMainNavbar from "../MobileMainNavbar/MobileMainNavbar";
import ChatIcon from "@mui/icons-material/Chat";

import "./Navbar.css";
// global functions
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const socket = useSelector((s: any) => s.socket);
  const memberInfo = useSelector((s: any) => s.memberInfo);
  const unreadMessages = useSelector((s: any) => s.unreadMessages);

  const unreadMails = useSelector((s: any) => s.unreadMails);

  const [isShownUM, setIsShownUM] = useState<boolean>(false);

  const [isShownMobileMainNavbar, setIsShownMobileMainNavbar] =
    useState<boolean>(false);

  const [isShownUnreadMails, setIsShownUnreadMails] = useState<boolean>(false);

  const isLogedIn = useSelector((s: any) => s.isLogedIn);
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: any) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const closeBar = () => {
    setIsShownMobileMainNavbar(false);
  };

  const openBar = () => {
    setIsShownMobileMainNavbar(true);
  };

  const logOut = async (): Promise<void> => {
    await NativeStorage.clear();
    dispatch({
      type: "SET_STATE",
      payload: {
        memberInfo: {
          member_id: "",
          first_name: "",
          last_name: "",
          email: "",
          permission: "",
          avatar: "",
        },
        isLogedIn: false,
        project_id: "",
      },
    });
    history.push("/home");
    socket.emit("Offline");
  };

  const determineRouter = (): string => {
    var { permission } = memberInfo;
    if (permission === "ProductOwner") return "/dashboard";
    if (permission === "Manager" || permission === "Employee")
      return "/project-list";
    return "/login";
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      PaperProps={{
        style: {
          width: 350,
        },
      }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <div className="row p-0 m-0 w-100">
          <div className="col-3">
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={handleProfileMenuOpen}
            >
              <Avatar
                name={memberInfo.first_name + " " + memberInfo.last_name}
                src={memberInfo.avatar}
              />
            </IconButton>
          </div>
          <div className="col-9">
            <div className="h-100 d-flex">
              <span className="mt-auto mb-auto">
                <div>{memberInfo.email}</div>
                <div>{memberInfo.first_name + " " + memberInfo.last_name}</div>
              </span>
            </div>
          </div>
        </div>
      </MenuItem>
      <div className="dropdown-divider" />
      {memberInfo.permission === "ProductOwner" ? (
        <MenuItem onClick={handleMenuClose}>
          <NavLink className="base-link" to="/dashboard">
            <DashboardIcon />
            <span className="ms-4">Dashboard</span>
          </NavLink>
        </MenuItem>
      ) : (
        <MenuItem onClick={handleMenuClose}>
          <NavLink className="base-link" to="/project-list">
            <ListAltIcon />
            <span className="ms-4">Project List</span>
          </NavLink>
        </MenuItem>
      )}
      <MenuItem onClick={handleMenuClose}>
        <NavLink className="base-link" to="/dashboard/profile">
          <ManageAccountsIcon />
          <span className="ms-4">Profile</span>
        </NavLink>
      </MenuItem>
      <div className="dropdown-divider" />
      <MenuItem
        onClick={async () => {
          await logOut();
          handleMenuClose();
        }}
      >
        <ExitToAppIcon />
        <span className="ms-4">Logout</span>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      PaperProps={{
        style: {
          width: 300,
        },
      }}
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <NavLink
        style={{
          textDecoration: "none",
          color: "black",
        }}
        to="/home"
      >
        <MenuItem>
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <HomeIcon />
          </IconButton>
          <p className="m-0">Home</p>
        </MenuItem>
      </NavLink>

      <NavLink
        style={{
          textDecoration: "none",
          color: "black",
        }}
        to="/home"
      >
        <MenuItem>
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <InfoIcon />
          </IconButton>
          <p className="m-0">About</p>
        </MenuItem>
      </NavLink>
      <NavLink
        style={{
          textDecoration: "none",
          color: "black",
        }}
        to="/home"
      >
        <MenuItem>
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <FileDownloadIcon />
          </IconButton>
          <p className="m-0">Download</p>
        </MenuItem>
      </NavLink>
      <NavLink
        style={{
          textDecoration: "none",
          color: "black",
        }}
        to="/qr-scanner"
      >
        <MenuItem>
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <QrCodeScannerIcon />
          </IconButton>
          <p className="m-0">QR Scanner</p>
        </MenuItem>
      </NavLink>
    </Menu>
  );

  return (
    <>
      {isShownMobileMainNavbar ? <MobileMainNavbar closeBar={closeBar} /> : ""}
      <Box className="main-navbar" sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              style={{ position: "relative" }}
              sx={{ display: { xs: "flex", md: "none" } }}
              onClick={() => openBar()}
            >
              <i className="material-icons-outlined">menu</i>
            </IconButton>
            <img
              className="p-1 me-3"
              style={{
                width: "35px",
                height: "35px",
                borderRadius: "100%",
                background: "white",
              }}
              src="assets/icon/favicon.png"
              alt=""
            />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <h3 className="m-0 me-3">Timesheet</h3>
            </Box>

            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <NavLink
                style={{
                  textDecoration: "none",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                to="/home"
                className="main-navbar_link"
              >
                <Button size="medium" color="inherit">
                  Home
                </Button>
              </NavLink>
              <NavLink
                style={{
                  textDecoration: "none",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                to="/about"
                className="main-navbar_link"
              >
                <Button size="medium" color="inherit">
                  About
                </Button>
              </NavLink>
              <NavLink
                style={{
                  textDecoration: "none",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                to="/download"
                className="main-navbar_link"
              >
                <Button size="medium" color="inherit">
                  Download
                </Button>
              </NavLink>
              <NavLink
                style={{
                  textDecoration: "none",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                to={
                  determineRouter()
                }
                className="main-navbar_link"
              >
                <Button size="medium" color="inherit">
                  Dashboard
                </Button>
              </NavLink>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
                style={{ position: "relative" }}
                onClick={() => {
                  setIsShownUM(!isShownUM);
                }}
                hidden={!isLogedIn}
              >
                <Badge badgeContent={unreadMessages.length} color="error">
                  <ChatIcon />
                </Badge>
                {isShownUM ? (
                  <ListMessages
                    message="Current, You don't have any messages"
                    list={unreadMessages}
                  />
                ) : (
                  ""
                )}
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                onClick={() => {
                  setIsShownUnreadMails(!isShownUnreadMails);
                }}
                style={{ position: "relative" }}
                hidden={!isLogedIn}
              >
                <Badge badgeContent={unreadMails.length} color="error">
                  <MailIcon />
                </Badge>
                {isShownUnreadMails ? (
                  <ListMails
                    message="Current, You don't have any mails"
                    list={unreadMails}
                  />
                ) : (
                  ""
                )}
              </IconButton>
              {isLogedIn ? (
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="show 17 new notifications"
                  aria-controls={menuId}
                  color="inherit"
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                >
                  <Avatar
                    name={memberInfo.first_name + " " + memberInfo.last_name}
                    src={memberInfo.avatar}
                  />
                </IconButton>
              ) : (
                <NavLink
                  style={{
                    textDecoration: "none",
                    color: "black",
                    margin: "0",
                    padding: "0",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: "10px",
                  }}
                  to="/login"
                >
                  <Button
                    size="small"
                    sx={{ width: "90px", fontSize: "11px" }}
                    color="inherit"
                    variant="contained"
                  >
                    Login Now
                  </Button>
                </NavLink>
              )}
            </Box>

            {/* mobile bar */}

            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                aria-controls="navbar_messages"
                color="inherit"
                style={{ position: "relative" }}
                onClick={() => {
                  setIsShownUM(!isShownUM);
                }}
                hidden={!isLogedIn}
              >
                <Badge badgeContent={unreadMessages.length} color="error">
                  <ChatIcon />
                </Badge>
                {isShownUM ? (
                  <ListMessages
                    message="Current, You don't have any messages"
                    list={unreadMessages}
                  />
                ) : (
                  ""
                )}
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                aria-controls="navbar_notification"
                color="inherit"
                onClick={() => {
                  setIsShownUnreadMails(!isShownUnreadMails);
                }}
                hidden={!isLogedIn}
              >
                <Badge badgeContent={unreadMails.length} color="error">
                  <MailIcon />
                </Badge>
                {isShownUnreadMails ? (
                  <ListMails
                    message="Current, You don't have any mails"
                    list={unreadMails}
                  />
                ) : (
                  ""
                )}
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                aria-controls="navbar_notification"
                color="inherit"
                hidden={!isLogedIn}
              >
                <NavLink
                  style={{
                    color: "white",
                  }}
                  to="/login-qr"
                >
                  <i className="material-icons">qr_code_scanner</i>
                </NavLink>
              </IconButton>

              {isLogedIn ? (
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="show 17 new notifications"
                  aria-controls={menuId}
                  color="inherit"
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                >
                  <Avatar
                    name={memberInfo.first_name + " " + memberInfo.last_name}
                    src={memberInfo.avatar}
                  />
                </IconButton>
              ) : (
                <NavLink
                  style={{
                    textDecoration: "none",
                    color: "black",
                    margin: "0",
                    padding: "0",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: "10px",
                  }}
                  to="/login"
                >
                  <Button
                    size="small"
                    sx={{ width: "90px", fontSize: "11px" }}
                    color="inherit"
                    variant="contained"
                  >
                    Login Now
                  </Button>
                </NavLink>
              )}
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>
    </>
  );
};

export default Navbar;
