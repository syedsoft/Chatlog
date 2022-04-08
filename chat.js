$(document).ready(function (){

    var socket = io.connect('http://localhost:4000');

    var username = $("#username");

    var change_username = $("#change_username");

    var feedback = $("#feedback");

    var message = $("#message");

    var change_message = $("#change_message");

    change_message.click(function(){
        socket.emit('new_message',{message:message.val()})
    })

    socket.on('new_message',(data)=>{
       // feedback.html('');
        message.val('');

        feedback.append('<p>' + data.username + ":" + data.message + '</p>');
    })

    change_username.click(function(){
        socket.emit('change_username',{username:username.val()})
    })  
})
    message.bind('keypress',()=>{
      socket.emit('typing',{username:username,typing:true})
    })
    socket.on('display',(data)=>{
        if(data.typing==true)
        $('.typing').text('${data.username} is typing...')
        else
        $('.typing').text("")
    })