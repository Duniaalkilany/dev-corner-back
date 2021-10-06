
// //use port number of socket==>8900

// const io = require("socket.io")(8900, {
//     cors: {
//         //reat app url
//       origin: "http://localhost:3000",
//     },
//   });

// //
//   let users = [];
// //filter users before add to users array 
//   const addUser = (userId, socketId) => {
//       //not in users array so add it 
//     !users.some((user) => user.userId == userId) &&
//       users.push({ userId, socketId });
//   };


//   const removeUser = (socketId) => {
//     users = users.filter((user) => user.socketId !== socketId);
//   };
  
//   const getUser = (userId) => {
//     return users.find((user) => user.userId == userId);
//   };

//   //after every connection 
//   io.on("connection", (socket) => {
//     //when connect
//     console.log("a user connected.");
// //   io.emit("welcom","hello from socket server")
//     //after every connection take userId and socketId from user
//     socket.on("addUser", (userId) => {
//       addUser(userId, socket.id);
//       io.emit("getUsers", users);
//     })

//     //send and get message
//   socket.on("sendMessage", ({ senderId, receiverId, text }) => {
//     const user = getUser(receiverId);
//     io.to(user.socketId).emit("getMessage", {
//       senderId,
//       text,
//     });
//   });


//    //when disconnect
//  socket.on("disconnect", () => {
//     console.log("a user disconnected!");
//     removeUser(socket.id);
//     io.emit("getUsers", users);
//   });

// })

const io = require("socket.io")(8900, {
    cors: {
      origin: "http://localhost:3000",
    },
  });
  
  let users = [];
  
  const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
      console.log('gggggggggggggggggggggggggggggggg',users);
  };
  const getUser = (userId) => {
    return users.find((user) => user.userId == userId);
   
  };
  
  console.log("afterrrrrrrrrrrrrrrrrrrr=>>>",users);
  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };
  
  
  io.on("connection", (socket) => {
    //when ceonnect
    console.log("a user connected.");
  
    //take userId and socketId from user
    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
      io.emit("getUsers", users);
    });
  
    //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
     const user = getUser(receiverId);
      console.log('olllllllllllllllllllll',receiverId);
      console.log('ttttttttttttttttttttttttttttttttttttt',users);
      console.log('user--------------------------------->',user);
      io.to(user.socketId).emit("getMessage", {
        
        senderId,
        text,
      });
      console.log('done');
    });
  
    //when disconnect
    socket.on("disconnect", () => {
      console.log("a user disconnected!");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });


