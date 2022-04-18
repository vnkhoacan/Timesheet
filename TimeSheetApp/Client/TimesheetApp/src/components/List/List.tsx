import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import Avatar from "../Avatar/Avatar";

interface Props {
  list: any;
  message:string;
}

const ListInfo: React.FC<Props> = (props: Props) => {
  if (props.list.length) {
    return (
      <List
        sx={{
          width: "300px",
          maxWidth: 360,
          bgcolor: "background.paper",
          position: "absolute",
          top: "50px",
          right: "0",
          zIndex: 1,
          borderRadius: "4px",
          boxShadow:
            "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
        }}
      >
        {props.list.map((item: any, index: number) => {
          return (
            <>
              {index > 0 ? <Divider variant="inset" component="li" /> : ""}
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar src={item.avatar} name={item.member_name} />
                </ListItemAvatar>
                <ListItemText
                  style={{color:"black"}}
                  primary={item.member_name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                      </Typography>
                      {item.content}
                    </React.Fragment>
                  }
                />
              </ListItem>
            </>
          );
        })}
      </List>
    );
  }
  return <div className="light-color">{props.message}</div>;
};

export default ListInfo;
