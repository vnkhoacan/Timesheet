import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import Avatar from "../../Avatar/Avatar";
import "./ListMails.css";

interface Props {
  list: any;
  message: string;
}

const ListInfo: React.FC<Props> = (props: Props) => {
  return (
    <List
      sx={{
        width: "300px",
        maxWidth: 360,
        overflowY:"auto",
        maxHeight: "500px",
        bgcolor: "background.paper",
        position: "absolute",
        top: "55px",
        right: "-50px",
        zIndex: 1,
        borderRadius: "4px",
        boxShadow:
          "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
      }}
      className="list-mails_bar"
    >
      {props.list.length ? (
        props.list.map((item: any, index: number) => {
          return (
            <>
              {index > 0 ? <Divider variant="inset" component="li" /> : ""}
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar src={item.avatar} name={item.member_name} />
                </ListItemAvatar>
                <ListItemText
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    color: "black",
                  }}
                  className="w-100"
                  primary={item.member_name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      ></Typography>
                      <div
                        className="w-100 list-mails_bar_content"
                        dangerouslySetInnerHTML={{ __html: item.content }}
                      ></div>
                    </React.Fragment>
                  }
                />
              </ListItem>
            </>
          );
        })
      ) : (
        <div className="light-color large-font-size py-2">{props.message}</div>
      )}
    </List>
  );
};

export default ListInfo;
