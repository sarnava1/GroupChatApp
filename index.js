var express=require('express');
var socket=require('socket.io');
var app=express();

//creating the server
var server=app.listen(4000,function(){
  console.log("listening to port no 4000");
});

//creating the static file which we will render using the express.static method
app.use(express.static('public'));


//socket setup on the server side
var io=socket(server);

io.on('connection',function(socket){

  //socket.id returns the ids of the different sockets or the channels or that we can say users who open up
  //the chat app in their computers
  console.log('made socket connection', socket.id)

  socket.on('chat',function(data){
    io.sockets.emit('chat',data);
  });

  socket.on('typing',function(data){
    socket.broadcast.emit('typing', data);
  });



});
