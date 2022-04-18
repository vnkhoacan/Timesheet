// components
import * as React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";

// modules
import DateConverter from "../../../services/Date/DateConverter";

// stylesheet
import "./TreeTaskItem.css";

interface Props {
  task_name: string;
  due: string;
  task_status: boolean;
  editTaskStatus: any;
}

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const TreeTaskItem: React.FC<Props> = (props: Props) => {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  console.log(props.due);
  console.log(DateConverter.parseShortDate(props.due));
  return (
    <Box className="task-list_task px-3">
      <Grid item xs={12} md={12}>
        <Demo>
          <List dense={dense}>
            <ListItem
              className="task-list_task_container"
              secondaryAction={
                // thoi gian bat dau ket thuc css lai
                <div className="time">
                  {DateConverter.compareDate(
                    new Date().toString(),
                    props.due
                  ) === "smaller" ? (
                    <i className="material-icons-outlined arrow-icon arrow-icon_on">
                      south
                    </i>
                  ) : (
                    <i className="material-icons-outlined arrow-icon">north</i>
                  )}

                  <span>{DateConverter.parseShortDate(props.due)}</span>
                </div>
              }
            >
              <ListItemAvatar>
                {/* css lai nut update lai task la hoan thanh hoac chua */}
                <IconButton
                  onClick={() => {
                    props.editTaskStatus();
                  }}
                >
                  <i
                    className={
                      "material-icons-outlined check-icon " +
                      (props.task_status ? "check-icon_on" : "")
                    }
                  >
                    check_circle
                  </i>
                </IconButton>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <span
                    style={{ color: props.task_status ? "#94a3b8" : "" }}
                    className="task-list_task_name"
                  >
                    {props.task_name}
                  </span>
                }
                secondary={secondary ? "Secondary text" : null}
              />
            </ListItem>
          </List>
        </Demo>
      </Grid>
    </Box>
  );
};

export default TreeTaskItem;
