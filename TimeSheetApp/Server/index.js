// import libraries
const initRouter = require("./routes/routes");
const initLibraries = require("./config/libraries");
const SocketClient = require("./socket/SocketClient/SocketClient");
const Chat = require("./socket/Chat/Chat");
const User = require("./models/User");
const Mailbox = require("./socket/Mailbox/Mailbox");
const query = require("./sql-query/SQLQuery");

const APP = initLibraries(__dirname);
const PORT = process.env.PORT || 5000;

// init router
initRouter(APP);
const SERVER = require("http").Server(APP);

// init socket
//socket.initSocket(SERVER);
const io = require("socket.io")(SERVER, {
  cors: {
    origin: "*",
  },
});

global.baseDir = __dirname;

//test
// require("./functions/General/Mailbox");

APP.get("*", (req, res) => {
  res.send("hello");
  //res.sendFile("../Client/public/build/index.html");
  //res.sendFile(__dirname + "/views/index.html");
});

// global socket
var clients = [];
var sockets = [];

// function socket
io.on("connection", (client) => {
  /* … */
  // console.log("client " + client.id + " connected");
  // save socket client
  sockets[client.id] = client;

  // client was online
  client.on("Online", (user) => {
    
    // console.log(user.email + " connected with " + client.id);
    clients.map((value) => {
      var myOE = User.getOrganizationEmail(user.email);
      var friendOE = User.getOrganizationEmail(value.email);
      if (myOE == friendOE && value.email != user.email)
        io.to(value.socketID).emit("Online", user.member_id);
    });
    user.socketID = client.id;
    clients.push(user);

    // var a = "online : ";
    // clients.map((value) => {
    //   a += value.email + " ";
    // });
    // console.log(a);
    
  });

  // client offline
  client.on("Offline", function () {
    //console.log("client " + client.id + " offline");

    var offlineEmail = "";
    var offlineID = "";
    clients.map((value) => {
      if (value.socketID == client.id) {
        offlineEmail = value.email;
        offlineID = value.member_id;
      }
    });

    // server send clients offline
    if (offlineEmail) {
      clients.map((value) => {
        var myOE = User.getOrganizationEmail(offlineEmail);
        var friendOE = User.getOrganizationEmail(value.email);
        if (myOE == friendOE && value.email != offlineEmail)
          io.to(value.socketID).emit("Offline", offlineID);
      });
    }
  });

  // client disconnected
  client.on("disconnect", function () {
    //console.log("client " + client.id + " disconnected");
    var offlineEmail = "";
    var offlineID = "";
    clients.map((value) => {
      if (value.socketID == client.id) {
        offlineEmail = value.email;
        offlineID = value.member_id;
      }
    });

    // server send clients offline
    if (offlineEmail) {
      clients.map((value) => {
        var myOE = User.getOrganizationEmail(offlineEmail);
        var friendOE = User.getOrganizationEmail(value.email);
        if (myOE == friendOE && value.email != offlineEmail)
          io.to(value.socketID).emit("Offline", offlineID);
      });
    }
    clients = clients.filter((value) => value.socketID != client.id);
    // var a = "disconnect : ";
    // clients.map((value) => {
    //   a += value.email + " ";
    // });
    // console.log(a);
    delete sockets[client.id];
  });

  // send socket id to client
  SocketClient.sendSocketID(io, client.id);

  // load friend
  Chat.loadFriend(client, clients, io);

  // send message
  client.on("SendMessage", async function (message) {
    var index = clients.findIndex(
      (value) => value.member_id == message.receiver
    );

    await query(
      "insert into user_message values('" +
        message.sender +
        "','" +
        message.receiver +
        "',N'" +
        message.content +
        "',getdate(),0)"
    );

    if (index >= 0) {
      var socketID = clients[index].socketID;
      io.to(socketID).emit("ReceiveMessage", message);
    }
  });

  // client took attendant
  client.on("TakeAttendant", (socketID) => {
    io.to(socketID).emit("TakeAttendant", socketID);
  });

  // send comment
  client.on("SendComment", async function (comment) {
    clients.map((value) => {
      if (
        User.getOrganizationEmail(value.email) ==
          User.getOrganizationEmail(comment.email) &&
        value.member_id != comment.member_id
      ) {
        io.to(value.socketID).emit("ReceiveComment", comment);
      }
    });
  });

  // send member info
  client.on("SendMemberInfo", async function (memberData) {
    console.log("send member info");
    io.to(memberData.socketID).emit("ReceiveMemberInfo", memberData.memberInfo);
  });

  // send request to login
  client.on("SendRequestForLogin", async function (loginData) {
    console.log("send request");
    io.to(loginData.socketID).emit("ReceiveRequestForLogin", loginData);
  });

  // send request to login
  client.on("SendMail", async function (mail) {
    console.log(mail.content);
    Mailbox.sendMail(clients, io, mail);
    
    await Mailbox.saveMail(mail);
  });
});

// init server
SERVER.listen(PORT, () => {
  console.log("App listen at port " + PORT);
});
