import ListFriend from "./ListFriend/ListFriend";
import ChatBox from "./ChatBox/ChatBox";
import { useState, useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import HttpClient from "../../../../services/HttpClient/HttpClient";
//--------------------------------------------------------------
//--------------------------------------------------------------
const Chat: React.FC = () => {
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const [isShown, setIsShown] = useState(false);
  const [chatBoxInfo, setChatBoxInfo] = useState<any>({});
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const socket = useSelector((allSelectors: any) => allSelectors.socket);
  const isConnectedSocket = useSelector(
    (allSelectors: any) => allSelectors.isConnectedSocket
  );
  const [messages, setMessages] = useState<any>([]);
  const newMessage = useSelector((allSelectors: any) => allSelectors.message);
  const [friends, setFriends] = useState<any>([]);
  var memberInfo = useSelector((allSelectors: any) => allSelectors.memberInfo);
  var isLogedIn = useSelector((allSelectors: any) => allSelectors.isLogedIn);
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const receiveMessage = (): void => {
    if (isConnectedSocket) {
      // socket.on("ReceiveMessage", async (message: any) => {
      //   console.log(message);
      //   console.log(isShownCB);
      //   console.log(friends);
      //   console.log(isShown);
      //   if (isShownCB) {
      //     if (friendID === message.sender) {
      //       var audio = new Audio("/assets/sound/message-notification.mp3");
      //       audio.play();
      //       var newMessages: any = [...defaultMessages];
      //       newMessages.push(message);
      //       defaultMessages = [...newMessages];
      //       setMessages([...newMessages]);
      //       //dispatch({ type: "NEW_MESSAGE", message });
      //       console.log("ok1");
      //       console.log(messages);
      //     }
      //   } else {
      //     var info: any = {};
      //     for (var i in friends) {
      //       if (friends[i].member_id === message.sender) {
      //         info = friends[i];
      //       }
      //     }
      //     friendID = info.member_id;
      //     var result = await HttpClient.post("Chat/LoadMessages", {
      //       myID: memberInfo.member_id,
      //       friendID: info.member_id,
      //     });
      //     var audio = new Audio("/assets/sound/message-notification.mp3");
      //     audio.play();
      //     setIsShown(true);
      //     setChatBoxInfo(info);
      //     var newMessages: any = [...result];
      //     newMessages.push(message);
      //     defaultMessages = [...newMessages];
      //     setMessages([...newMessages]);
      //     //dispatch({ type: "NEW_MESSAGE", message });
      //     isShownCB = true;
      //     console.log("ok2");
      //     console.log(messages);
      //   }
      // });
    }
  };
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const receiveOnline = (): void => {
    if (isConnectedSocket) {
      socket.on("Online", (member_id: string) => {
        console.log(member_id);
        console.log(friends);
        var index = friends.findIndex((v: any) => v.member_id === member_id);
        if (index >= 0) {
          var newFriends = [...friends];
          newFriends[index].isOnline = true;
          setFriends(newFriends);
        }
      });
    }
  };
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const receiveOffline = (): void => {
    if (isConnectedSocket) {
      socket.on("Offline", (member_id: string) => {
        console.log(member_id);
        console.log(friends);

        var index = friends.findIndex((v: any) => v.member_id === member_id);
        if (index >= 0) {
          var newFriends = [...friends];
          newFriends[index].isOnline = false;
          setFriends(newFriends);
        }
      });
    }
  };
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const loadOnline = (): void => {
    if (isConnectedSocket) {
      socket.on("LoadFriend", (onlineFriends: any) => {
        console.log(onlineFriends);
        var newFriends = [...friends];
        for (var i in newFriends) {
          if (onlineFriends.indexOf(newFriends[i].member_id) >= 0)
            newFriends[i].isOnline = true;
        }
        setFriends(newFriends);
      });
      socket.emit("LoadFriend", {
        member_id: memberInfo.member_id,
        email: memberInfo.email,
      });
    }
  };
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const loadFriends = async (): Promise<void> => {
    if (isLogedIn) {
      var result = await HttpClient.post("Chat/LoadFriends", {
        member_id: memberInfo.member_id,
      });
      if (result) setFriends(result);
    }
  };
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const loadMessages = async (friendID: string): Promise<void> => {
    var newMessages = await HttpClient.post("Chat/LoadMessages", {
      myID: memberInfo.member_id,
      friendID: friendID,
    });
    setMessages(newMessages);
  };
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const sendMessage = (messageFromInput: any): void => {
    var newMessages: any = [...messages];
    newMessages.push(messageFromInput);
    setMessages(newMessages);
  };
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const showChatBox = (info: any): void => {
    setIsShown(true);
    setChatBoxInfo(info);
    loadMessages(info.member_id);
  };
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  // update socket
  useEffect(() => {
    loadFriends();
  }, [isLogedIn]);
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  useEffect(() => {
    if (friends.length && isLoaded) {
      setIsLoaded(false);
      receiveMessage();
      receiveOffline();
      receiveOnline();
      loadOnline();
    }
  }, [friends]);
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  // update message
  const updateMessage = async (): Promise<void> => {
    if (newMessage.content !== undefined) {
      if (isShown) {
        if (chatBoxInfo.member_id === newMessage.sender) {
          var audio = new Audio("/assets/sound/message-notification.mp3");
          audio.play();
          var newMessages: any = [...messages];
          newMessages.push(newMessage);
          setMessages(newMessages);
        }
      } else {
        var info: any = {};
        for (var i in friends) {
          if (friends[i].member_id === newMessage.sender) {
            info = friends[i];
            break;
          }
        }
        var result = await HttpClient.post("Chat/LoadMessages", {
          myID: memberInfo.member_id,
          friendID: info.member_id,
        });
        var audio = new Audio("/assets/sound/message-notification.mp3");
        audio.play();
        setIsShown(true);
        setChatBoxInfo(info);
        var newMessages: any = [...result];
        newMessages.push(newMessage);
        setMessages(newMessages);
      }
      setTimeout(() => {
        var chatBoxBody: any = document.getElementById("chat-box_body_messages");
        chatBoxBody.scrollTop = chatBoxBody.scrollHeight;
      }, 500);
    }
  };
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  useEffect(() => {
    updateMessage();
  }, [newMessage]);
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  return (
    <div className="chat h-100 w-100">
      <div className="row w-100 h-100 m-0">
        <div className="col-xl-4 p-0">
          
          <ListFriend friends={friends} showChatBox={showChatBox} />
        </div>
        <div className="col-xl-8 p-0">
          {isShown ? (
            <ChatBox
              hideChatBox={() => {
                setIsShown(false);
              }}
              avatar={chatBoxInfo.avatar}
              member_name={chatBoxInfo.member_name}
              member_id={chatBoxInfo.member_id}
              messages={messages}
              sendMessage={sendMessage}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
//--------------------------------------------------------------
//--------------------------------------------------------------
export default Chat;
