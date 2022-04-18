import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Friend from "./Friend/Friend";

import "./ListFriend.css";
import { useEffect, useState } from "react";

interface Props {
  showChatBox: any;
  friends: any;
}

const ListFriend: React.FC<Props> = (props: Props) => {

  const [defaultFriends, setDefaultFriends] = useState<any>(props.friends);

  const searchFriend = (name: string): void => {
    if (name) {
      var newDefaultFriends: any = [];
      newDefaultFriends = defaultFriends.filter(
        (v: any) => v.member_name.toUpperCase().indexOf(name.toUpperCase()) >= 0
      );
      setDefaultFriends(newDefaultFriends);
    } else setDefaultFriends([...props.friends]);
  };

  useEffect(()=>{
    setDefaultFriends(props.friends);
  },[props.friends])

  return (
    <div className="list-friend light-border-right">
      <div className="px-3 light-border-bottom list-friend_header">
        <div className="m-auto w-75">
          <input
            className="form-control"
            type="search"
            placeholder="Search friend"
            onChange={(e:any)=>searchFriend(e.target.value)}
          />
        </div>
      </div>
      <List
        className="list-friend_body"
        key={1}
        sx={{ width: "100%", maxWidth: "inherit", bgcolor: "background.paper" }}
      >
        {defaultFriends.map((value: any, index: number) => {
          return (
            <div
              onClick={() => {
                props.showChatBox(value);
              }}
            >
              <Friend
                keyName={index.toString()}
                avatar={value.avatar}
                name={value.member_name}
                message={value.recent_message}
                isOnline={value.isOnline}
                recentDate={value.recent_date}
              />
              <Divider variant="inset" component="li" />
            </div>
          );
        })}
      </List>
    </div>
  );
};

export default ListFriend;
