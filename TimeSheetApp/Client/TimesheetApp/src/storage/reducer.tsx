// base state
const initialState = {
  project_id: "",
  isConnectedSocket: false,
  hasConnectedSocket: false,
  isLogedIn: false,
  isLogedInWithQRCode: false,
  isReceivedMemberInfo: false,
  socketID: "",
  memberInfo: {
    member_id: "",
    first_name: "",
    last_name: "",
    email: "",
    permission: "",
    avatar: "",
  },
  message: {},
  unreadMessages: [],
  unreadMails: [],
  comment: {},
  mail: {},
};

// payload function
export const reducer = (state: any = initialState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_STATE":
      return { ...state, ...payload };
    case "SET_COMMENT":
      return { ...state, comment: payload };
    case "SET_MAIL":
      return { ...state, mail: payload };
    default:
      return state;
  }
};
