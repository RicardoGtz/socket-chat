const path= require('path')
const express= require('express');
const bodyParser = require("body-parser");
const app=express();

//settings
app.set('port', process.env.PORT || 3000) //Selecciona el puerto por defecto o 3000
app.set('view engine', 'ejs');

//midelware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//static files
app.use(express.static(path.join(__dirname,'public')));

//routes
app.get('/',(req,res)=>{
    console.log("Recibido");
    res.sendFile(path.join(__dirname,'index.html'));
});

app.post('/socket-chat',(req,res)=>{
    var user=req.body.username;
    res.render('chat',{username: user});
    
});

//Start server
const server=app.listen(app.get('port'),()=>{
    console.log('Server on port ',app.get('port'));
});


const SocketIO=require('socket.io');
const io=SocketIO(server);

var users={};

//Websockets
io.on('connection',(socket)=>{
    console.log('new conection',socket.id);
    //Añade el id del socket a la lista
    users[socket.id]="";

    socket.on('chat:message',(data)=>{
        console.log(data);
        io.sockets.emit('chat:message',data);
    });

    socket.on('chat:typing',(data)=>{
        console.log(data);
        socket.broadcast.emit('chat:typing',data);
    });

    socket.on('chat:LogIn',(data)=>{
        users[socket.id]=data.username;
        console.log(data);
        socket.broadcast.emit('chat:LogIn',data);
    });

    socket.on('disconnect', function() {
        console.log(users[socket.id]+' Got disconnect!');
        socket.broadcast.emit('chat:LogOut',{
            "message": "abandono el chat",
            "username":users[socket.id]
        })
     });

});


