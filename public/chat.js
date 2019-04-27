const socket =io();

//DOM elements
let message=document.getElementById('message');
let username=document.getElementById('username');
let btn=document.getElementById('send');
let output=document.getElementById('output');
let actions=document.getElementById('actions');

socket.emit('chat:LogIn',{
    "message": "Ingreso desde Web",
    "username": username.value
});

btn.addEventListener('click',()=>{
    console.log(username.value, message.value);
    
    socket.emit('chat:message',{
        "message": message.value,
        "username": username.value
    });
});

socket.on('chat:message',function (data){
    //console.log(data);
    output.innerHTML+= '<p><strong>'+data.username+'</strong>: '+data.message+'</p>';
    actions.innerHTML='';
});

message.addEventListener('keypress',()=>{
    socket.emit('chat:typing',username.value)
});

socket.on('chat:typing',(data)=>{
    actions.innerHTML='<p>'+data+' is typing...</p>';
});

socket.on('chat:LogIn',function (data){
    //console.log(data);
    output.innerHTML+= '<p class="chatLogInfo">'+data.username+' '+data.message+'</p>';
    actions.innerHTML='';
});

socket.on('chat:LogOut',function (data){
    //console.log(data);
    output.innerHTML+= '<p class="chatLogInfo">'+data.username+' '+data.message+'</p>';
    actions.innerHTML='';
});








