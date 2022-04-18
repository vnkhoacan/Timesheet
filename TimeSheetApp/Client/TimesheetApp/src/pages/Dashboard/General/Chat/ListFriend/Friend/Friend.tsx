import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import MyAvatar from "../../../../../../components/Avatar/Avatar";
import DateConverter from "../../../../../../services/Date/DateConverter";

interface Props {
  avatar: string;
  name: string;
  message: string;
  recentDate: string;
  isOnline: Boolean;
  keyName:string;
}
//--------------------------------------------------------------#e67e22
//--------------------------------------------------------------
const ListFriend: React.FC<Props> = (props: Props) => {

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: (props.isOnline?"#44b700":"#e67e22"),
      color: (props.isOnline?"#44b700":"#e67e22"),
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));

  return (
    <ListItem key={props.keyName} style={{ cursor: "pointer" }} alignItems="flex-start">
      <ListItemAvatar>
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <MyAvatar src={props.avatar} name={props.name} />
        </StyledBadge>
      </ListItemAvatar>
      <ListItemText
        primary={props.name}
        secondary={<React.Fragment>{props.message}</React.Fragment>}
      />
      <p style={{ fontSize: "13px", color: "#64748b" }}>
        {DateConverter.parseShortDate(props.recentDate)}
      </p>
    </ListItem>
  );
};

export default ListFriend;
