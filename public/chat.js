//Instance of Socket.io ("Previously called in chat.ejs script tag")
const socket =io();

//references to DOM elements
let message=document.getElementById('message');
let username=document.getElementById('username');
let btn=document.getElementById('send');
let output=document.getElementById('output');
let actions=document.getElementById('actions');

// Socket emits
socket.emit('chat:LogIn',{            // Once the page loads emit 'chat:LogIn' 
    "message": "Ingreso desde Web",   // event through socket, send JSON object
    "username": username.value
});

btn.addEventListener('click',()=>{
    console.log(username.value, message.value);
    /* When the send button is clicked emits 'chat:message' event
       and send JSON object if message is not empty */ 
    if(!!message.value){
        socket.emit('chat:message',{        
            "message": message.value,
            "username": username.value
        });
        message.value="";
    }
});

message.addEventListener('keypress',()=>{
     /* When typing emits 'chat:typing' event and send JSON object */ 
    socket.emit('chat:typing',username.value)
});

// Socket listens
socket.on('chat:message',function (data){   //Listen for 'chat:message' event
    //Adds message to page
    output.innerHTML+= '<p><strong>'+data.username+'</strong>: '+data.message+'</p>';
    actions.innerHTML='';
});

socket.on('chat:typing',(data)=>{    //Listen for 'chat:typing' event 
     //Adds typing message to page
    actions.innerHTML='<p>'+data+' is typing...</p>';
});

socket.on('chat:LogIn',function (data){    //Listen for 'chat:LogIn' event
    //Adds Login message to page
    output.innerHTML+= '<p class="chatLogInfo">'+data.username+' '+data.message+'</p>';
});

socket.on('chat:LogOut',function (data){   //Listen for 'chat:Logout' event
    //Adds LogOut message to page
    output.innerHTML+= '<p class="chatLogInfo">'+data.username+' '+data.message+'</p>';
});








