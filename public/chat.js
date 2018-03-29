//connecting to the server from the browser side!!!!!!!!!!!
var socket=io.connect('http://localhost:4000');

//query DOM
var message=document.getElementById('message');
var handle=document.getElementById('handle');
var btn=document.getElementById('send');
var output=document.getElementById('output');
var feedback=document.getElementById('feedback');

//emit events
btn.addEventListener('click',function(){
  //emit a message down the web socket to the server
  socket.emit('chat',{
    message:message.value,
    handle:handle.value
  });
message.value="";
});

//send out the message that I am typing the message by looking into the handle of the user
message.addEventListener('keypress',function(){
  socket.emit('typing',handle.value);
});



//listen for events
//if any message has come to us then we by this
socket.on('chat',function(data){
  feedback.innerHTML="";
  output.innerHTML+='<p><strong>'+data.handle+':</strong>'+data.message+'</p>';

});

socket.on('typing',function(data){
  feedback.innerHTML='<p><em>' +data+ ' is typing a message </em></p>';

});
