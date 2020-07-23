import React ,{useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import Topbar from "./component/Topbar/Topbar";
import UserTable from "./component/UsersTable/UsersTable";
import ModalBox from "./component/ModalBox/ModalBox";
import { Button } from "@material-ui/core";
import ChatWindow from './component/ChatWindow/ChatWindow'
import io from 'socket.io-client'

const socket =io('http://localhost:4000')

const userList = [
  {
    id: 1,
    Name: "Utkarsh Singh",
    Company: "Google"
  },
  {
    id: 2,
    Name: "Jane Doe",
    Company: "Microsoft"
  },
  {
    id: 3,
    Name: "Karan Kumar",
    Company: "Amazon"
  },
  {
    id: 4,
    Name: "John Doe",
    Company: "Apple"
  }
];

export default function App() {
  const [activeUserID, setActiveUserID] = React.useState(1);
  const [open, setOpen] = React.useState(false);
  const [users, setUsers] = React.useState(userList);
  const [chatOn,setChatOn]=React.useState(false);
  const [chatWith,setChatWith]=React.useState(null);
  const [message,setMessage]=React.useState({message:'',name:''})
  const[chat,setChat]=React.useState([])

  useEffect(()=>{
    socket.on('message', (name,message)=>{
      setChat([...chat,{name,message}])
    })
  })

  const activeUserName=users.filter(user=>user.id===activeUserID)[0].Name

  const addUser = user => {
    user.id = users.length + 1;
    setUsers([...users, user]);
    // console.log(users);
  };

  const chatting=(e)=>{
    setChatWith(e)
  }

  // const toggleChat=()=>{
  //   var currentChatStatus=chatOn
  //   setChatOn(!currentChatStatus)
  // }
  const turnChatOn=()=>{
    setChatOn(true)
  }

  const turnChatOff=()=>{
    setChatOn(false)
  }

  const removeUser = deluser => {
    setUsers(users.filter(e => e.id != deluser.id));
  };

  const updateUser = updatedUser => {
    setUsers(updatedUser);
    // console.log(updatedUser);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeActiveUser = e => {
    setActiveUserID(e);
    console.log(e);
  };

  const onSendMessage=(e)=>{
    // e.preventDefault()
    socket.emit('message',{
      name:activeUserName,
      message:e
    })
    // setMessage(
    //   {name:activeUserName,
    //     message:e
    // })
  }

  return (
    <div style={{ backgroundColor: "lightgray", height: "100vh" }}>
      <Topbar
        users={users}
        activeUser={activeUserID}
        changeProfile={e => changeActiveUser(e)}
      />
      <Grid container md={12} xs={12} >
        <Grid item md={6} xs={12}>
        <Button
            variant="contained"
            color="primary"
            onClick={handleOpen}
            style={{ marginTop: "10px", marginBottom: "10px" }}
          >
            Add User
          </Button>
          <ModalBox
            open={open}
            handleClose={handleClose}
            addUser={e => addUser(e)}
          />
          <UserTable
            userList={users}
            activeUser={activeUserID}
            removeUser={e => removeUser(e)}
            updateUser={e => updateUser(e)}
            chatting={(e)=>chatting(e)}
            turnChatOn={turnChatOn}
          />
        </Grid>
        <Grid item md={6} xs={12} >
          {chatOn?
          <ChatWindow chatWith={chatWith} turnChatOff={turnChatOff} onSendMessage={(e)=>onSendMessage(e)} chat={chat}/>:null}
        </Grid>
      </Grid>
    </div>
  );
}
