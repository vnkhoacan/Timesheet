// import functions
const SocketClient = require("./SocketClient/SocketClient");
const Chat = require("./Chat/Chat");
function initSocket(SERVER) {
  // global socket
  var clients = [];
  var sockets = [];
  // import and use socket
  const io = require("socket.io")(SERVER, {
    cors: {
      origin: "*",
    },
  });
  // function socket
  io.on("connection", (client) => {
    /* … */
    console.log("client " + client.id + " connected");
    // save socket client
    sockets[client.id] = client;
    // send socket id to client
    SocketClient.sendSocketID(io, client.id);
    // client was online
    SocketClient.connect(client, clients, io);
    // client was offline
    SocketClient.disconnect(client, clients, sockets);
    // load friend
    Chat.loadFriend(client, clients, io);
    // send message
    Chat.sendMessage(client, clients, io);
  });
}

module.exports = { initSocket };
