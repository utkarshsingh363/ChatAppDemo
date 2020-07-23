import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Grid, Typography, Divider, ButtonBase , Avatar} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent:'center',
    alignItems:'center',
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(5),
      width: theme.spacing(60),
      height: theme.spacing(70),
    },
  },
}));

export default function SimplePaper(props) {
  const classes = useStyles();
  const [newMessage, setNewMessage] = React.useState('');


  return (
    <div className={classes.root}>
      <Paper elevation={5}>
        <Grid container xs={12} >
            <Grid item container xs={12} style={{backgroundColor:'purple'}} justify='center' alignItems='center'>
                <Grid item xs={2}>
                    <Avatar />
                </Grid>
                <Grid item xs={8} justify='center' style={{height:'50px', textAlign:'center', color:'white'}}>
                    <Typography style={{marginTop:'10px'}}>
                        {props.chatWith}
                    </Typography>
                </Grid>
                <Grid itemxs={2}  >
                    <ButtonBase onClick={props.turnChatOff}>
                        <CancelIcon />
                    </ButtonBase>
                </Grid>
            </Grid>
            <Grid item xs={12} style={{height:'450px'}}>
                {props.chat.map((message1,index)=>{
                    return(
                        <Typography style={{color:'blue'}}>
                            {message1.name.name}:<span style={{margin:'10px',color:'black'}}>{message1.name.message}</span>
                        </Typography>
                    )
                })}
            </Grid>
            <Grid item container xs={12} style={{height:'50px', alignContent:'center',textAlign:'center'}} alignItems='center'>
                <Grid item xs={2} >
                    <Typography>
                        Type:
                    </Typography>
                </Grid>
                <Grid item xs={9}>
                    <TextField id="standard-basic" label="Message..." fullWidth
                    value={newMessage}
                    onChange={(e)=>setNewMessage(e.target.value)}/>
                </Grid>
                <Grid item xs={1}>
                    <ButtonBase onClick={()=>{
                        props.onSendMessage(newMessage)
                        setNewMessage('')
                        }}>
                        <SendIcon />
                    </ButtonBase>
                </Grid>
            </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
