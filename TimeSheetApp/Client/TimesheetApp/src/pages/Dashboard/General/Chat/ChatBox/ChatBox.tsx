// components
import MyAvatar from "../../../../../components/Avatar/Avatar";
import LeftMessage from "./Message/LeftMessage/LeftMessage";
import RightMessage from "./Message/RightMessage/RightMessage";
import IconButton from "@mui/material/IconButton";
// module
import EmojiPicker from "emoji-picker-react";
import { useSelector } from "react-redux";
import { useState } from "react";
// icon
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
// stylesheet
import "./ChatBox.css";

interface Props {
  member_name: string;
  member_id: string;
  avatar: string;
  messages: any;
  hideChatBox: any;
  sendMessage: any;
}

const ChatBox: React.FC<Props> = (props: Props) => {
  // declare variables
  const memberInfo = useSelector((s: any) => s.memberInfo);

  const socket = useSelector((s: any) => s.socket);

  const [isShownEmoji, setIsShownEmoji] = useState<boolean>(false);

  const [content, setContent] = useState<string>("");

  const sendMessage = (): void => {
    var sent_date =
      new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 1) +
      "-" +
      new Date().getDate();
    var message: any = {
      sender: memberInfo.member_id,
      receiver: props.member_id,
      content: content,
      sent_date: sent_date,
      status: false,
    };

    setTimeout(() => {
      var chatBoxBody: any = document.getElementById("chat-box_body_messages");
      chatBoxBody.scrollTop = chatBoxBody.scrollHeight;
    }, 500);

    props.sendMessage(message);
    socket.emit("SendMessage", message);
    setContent("");
  };

  const onEmojiClick = (event: any, emojiObject: any) => {
    var newContent = content + emojiObject.emoji;
    setContent(newContent);
  };

  const toggleEmoji = (): void => {
    setIsShownEmoji(!isShownEmoji);
  };

  //--------------------------------------------------------------
  //--------------------------------------------------------------
  return (
    <div className="chat-box">
      <div className="chat-box_header m-auto d-flex align-items-center px-4">
        <ArrowBackIosIcon
          style={{ cursor: "pointer" }}
          onClick={props.hideChatBox}
        />
        <MyAvatar src={props.avatar} name={props.member_name} />
        <p className="m-0 ms-3">{props.member_name}</p>
      </div>
      <div className="chat-box_body">
        <div className="chat-box_body_messages" id="chat-box_body_messages">
          {props.messages.map((value: any) => {
            if (memberInfo.member_id !== value.sender)
              return (
                <LeftMessage
                  member_name={props.member_name}
                  sent_date={value.sent_date}
                  content={value.content}
                  avatar={props.avatar}
                />
              );
            else
              return (
                <RightMessage
                  member_name={
                    memberInfo.first_name + " " + memberInfo.last_name
                  }
                  sent_date={value.sent_date}
                  content={value.content}
                  avatar={memberInfo.avatar}
                />
              );
          })}
        </div>
      </div>
      <div className="chat-box_footer">
        <div onClick={toggleEmoji} className="relative-position me-2">
          {isShownEmoji ? (
            <div
              style={{ bottom: "30px", left: "0" }}
              className="absolute-position"
            >
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          ) : (
            ""
          )}
          <IconButton>
            <i className="material-icons-outlined light-color chat-box_footer_icon">
              sentiment_satisfied_alt
            </i>
          </IconButton>
        </div>
        <div className="relative-position me-2">
          <IconButton>
            <i className="material-icons-outlined light-color chat-box_footer_icon">
              attachment
            </i>
          </IconButton>
        </div>
        <input
          onKeyDown={(e: any) => {
            if (e.keyCode === 13) sendMessage();
          }}
          onChange={(e: any) => {
            setContent(e.target.value);
          }}
          value={content}
          id="chat-box_footer_input"
          placeholder="Type a message"
          className="form-control me-3"
          type="text"
        />

        <div
          onClick={() => {
            sendMessage();
          }}
          className=""
        >
          <IconButton>
            <i className="material-icons-outlined light-color chat-box_footer_icon">
              send
            </i>
          </IconButton>
        </div>
      </div>
    </div>
  );
};
//--------------------------------------------------------------
//--------------------------------------------------------------
export default ChatBox;
