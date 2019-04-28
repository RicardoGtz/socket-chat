//Imports
const path= require('path'); //Library to manage paths
const express= require('express'); //Library to set up the server
const bodyParser = require("body-parser"); //Library to manage POST requests
const SocketIO=require('socket.io'); //Library to manage websockets

const app=express(); //Instance an express server

//settings
app.set('port', process.env.PORT || 3000) //Set the default port  or port 3000
app.set('view engine', 'ejs'); //Set an engine to render the views (Webs pages)

//midelware
app.use(bodyParser.urlencoded({ extended: false })); //To manage the request as JSON
app.use(bodyParser.json());

//static files
app.use(express.static(path.join(__dirname,'public'))); /* Set the public folder
                                                           all the CSS and javascript files belong 
                                                           to this folder */
                                                
// The rotes are all the URLs which ara accesible for the server                                                            
                                            
//routes
app.get('/',(req,res)=>{    // Set the root route for "localhos:3000/" by get method GET
    // Render index page in (views/index.ejs)
    res.render('index');
});

app.post('/socket-chat',(req,res)=>{    //route for "localhos:3000/" by get method POST
    //store username parameter send by POST
    var user=req.body.username;
    //render chat page in (views/chat.ejs) and send a JSON to page
    res.render('chat',{username: user});    
});

//Start server
const server=app.listen(app.get('port'),()=>{       //Server start to listen in PORT
    console.log('Server on port ',app.get('port'));
});

const io=SocketIO(server); // instance a io Socket passing the server as parameter

var users={}; //Object to store all the users who log in, works like a map

//Websockets 
io.on('connection',(socket)=>{              //Socket wait for a new "connection" event
    console.log('new conection',socket.id); //Prints in console
    //Add the socket.id to user object
    users[socket.id]="";

    socket.on('chat:LogIn',(data)=>{        //Socket listen for "chat:LogIn" event
        //Adds the username to users
        users[socket.id]=data.username;
        console.log(data);
        //Sends the data to all the connecteds sockets except for the sender
        socket.broadcast.emit('chat:LogIn',data);
    });

    socket.on('chat:typing',(data)=>{       //Socket listen for "chat:typing" event
        console.log(data);
        //Sends the data to all the connecteds sockets except for the sender
        socket.broadcast.emit('chat:typing',data);
    });

    socket.on('chat:message',(data)=>{      //Socket listen for "chat:typing" event
        console.log(data);
        //Sends the data to all the connecteds sockets including the sender
        io.sockets.emit('chat:message',data);
    });    

    socket.on('disconnect', function() {    //Socket listen for "chat:typing" event
        console.log(users[socket.id]+' disconnected!');
        //Socket listen for "chat:typing" event
        socket.broadcast.emit('chat:LogOut',{
                                                "message": "abandono el chat",
                                                "username":users[socket.id]
                                            })
     });
});