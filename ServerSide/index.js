const { isObject } = require('util')

const app =require('express')()
const http =require('http').createServer(app)
const io=require('socket.io')(http)

app.get('/',function(req,res){
    res.send('<h1>ChatApp Backend</h1>')
})

io.on('connection',function(socket){
    socket.on('message',({name,message})=>{
        io.emit('message',{name,message})
        console.log({name,message})
    })
    // console.log('a user connected')
})

http.listen(4000,function(){
    console.log('listening on PORT 4000')
})