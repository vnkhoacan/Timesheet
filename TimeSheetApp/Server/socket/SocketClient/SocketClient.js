//--------------------------------------------------------------
//--------------------------------------------------------------
function sendSocketID(io, socketID) {
  io.to(socketID).emit("ReceiveSessionID", socketID);
}
//--------------------------------------------------------------
//--------------------------------------------------------------
function connect(client, clients, io) {
  client.on("Online", (user) => {
    user.socketID = client.id;
    clients.push(user);
  });
}
//--------------------------------------------------------------
//--------------------------------------------------------------
function disconnect(client, clients, sockets) {
  client.on("disconnect", function () {
    console.log("client " + client.id + " disconnected");
    clients = clients.filter((value) => value.socketID != client.id);
    delete sockets[client.id];
  });
}
//--------------------------------------------------------------
//--------------------------------------------------------------

module.exports = { connect, disconnect, sendSocketID };
