// module

// components
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
// stylesheet
import "./MobileMainNavbar.css";

interface Props {
  closeBar: any;
}

const MobileBar: React.FC<Props> = (props: Props) => {
  const memberInfo = useSelector((s: any) => s.memberInfo);

  const determineRouter = (): string => {
    var { permission } = memberInfo;
    if (permission === "ProductOwner") return "/dashboard";
    if (permission === "Manager" || permission === "Employee")
      return "/project-list";
    return "/login";
  };

  return (
    <div className="mobile-main-navbar">
      <div
        onClick={() => props.closeBar()}
        className="mobile-main-navbar_container"
      >
        <div className="mobile-main-navbar_dark-bg"></div>
        <div className="mobile-main-navbar_list-link">
          <h4 className="px-3 py-3 m-0">Timesheet</h4>
          <NavLink className="base-link" to="/home">
            <ListItemButton>
              <ListItemIcon>
                <i className="material-icons-outlined">home</i>
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </NavLink>
          <NavLink className="base-link" to={"/about"}>
            <ListItemButton>
              <ListItemIcon>
                <i className="material-icons-outlined">info</i>
              </ListItemIcon>
              <ListItemText primary="About" />
            </ListItemButton>
          </NavLink>
          <NavLink className="base-link" to={determineRouter()}>
            <ListItemButton>
              <ListItemIcon>
                <i className="material-icons-outlined">dashboard</i>
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </NavLink>
          <NavLink className="base-link" to={"/qr-scanner"}>
            <ListItemButton>
              <ListItemIcon>
                <i className="material-icons-outlined">qr_code_scanner</i>
              </ListItemIcon>
              <ListItemText primary="QR Scanner" />
            </ListItemButton>
          </NavLink>
          <NavLink className="base-link" to={"/url-controller"}>
            <ListItemButton>
              <ListItemIcon>
                <i className="material-icons-outlined">dashboard</i>
              </ListItemIcon>
              <ListItemText primary="Url" />
            </ListItemButton>
          </NavLink>
          <NavLink className="base-link" to={"/download"}>
            <ListItemButton>
              <ListItemIcon>
                <i className="material-icons-outlined">file_download</i>
              </ListItemIcon>
              <ListItemText primary="Download" />
            </ListItemButton>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default MobileBar;
