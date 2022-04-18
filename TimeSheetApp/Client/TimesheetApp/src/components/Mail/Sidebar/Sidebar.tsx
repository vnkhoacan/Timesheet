// components
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/Inbox";
import { Button } from "@mui/material";
// stylesheet
import "./Sidebar.css";


interface Props {
  openMailForm: any;
  loadMail: any;
  mailType: string;
}

const Sidebar: React.FC<Props> = (props: Props) => {
  return (
    <Box
      className="light-border-right"
      sx={{ width: "100%", height: "100%", bgcolor: "background.paper" }}
    >
      <nav aria-label="main mailbox folders">
        <div className="d-flex py-3 px-3">
          <h1
            style={{ fontSize: "32px", fontWeight: 700 }}
            className="m-0 p-0 uhigh-weight"
          >
            Mailbox
          </h1>
        </div>
        <div className="d-flex py-3 px-3">
          <Button
            onClick={() => props.openMailForm()}
            style={{ borderRadius: "20px" }}
            className="d-flex align-items-center m-auto w-100"
            variant="contained"
          >
            <i className="material-icons-outlined me-3">add</i> Compose
          </Button>
        </div>
        <li className="dropdown-divider"></li>
        <List>
          <ListItem className={props.mailType ==="inbox"?"light-bg":""} onClick={() => props.loadMail("inbox")} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItemButton>
          </ListItem>
          <ListItem className={props.mailType ==="sent"?"light-bg":""} onClick={() => props.loadMail("sent")} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <i className="material-icons-outlined">forward_to_inbox</i>
              </ListItemIcon>
              <ListItemText primary="Sent" />
            </ListItemButton>
          </ListItem>
          <ListItem className={props.mailType ==="all"?"light-bg":""} onClick={() => props.loadMail("all")} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <i className="material-icons-outlined">mail</i>
              </ListItemIcon>
              <ListItemText primary="All Mail" />
            </ListItemButton>
          </ListItem>
          <ListItem className={props.mailType ==="spam"?"light-bg":""} onClick={() => props.loadMail("spam")} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <i className="material-icons-outlined">mark_as_unread</i>
              </ListItemIcon>
              <ListItemText primary="Spam" />
            </ListItemButton>
          </ListItem>
          <ListItem className={props.mailType ==="trash"?"light-bg":""} onClick={() => props.loadMail("trash")} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <i className="material-icons-outlined">outbox</i>
              </ListItemIcon>
              <ListItemText primary="Trash" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
};

export default Sidebar;
