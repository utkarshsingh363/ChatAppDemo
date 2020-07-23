import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Divider } from "@material-ui/core";
import ActiveProfile from "./ActiveProfile/ActiveProfile";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  }
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <AppBar position="static"> */}
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          ChatApp
        </Typography>
        <ActiveProfile
          users={props.users}
          changeProfile={e => props.changeProfile(e)}
          activeUser={props.activeUser}
        />
        {/*    */}
      </Toolbar>
      <Divider />
      {/* </AppBar> */}
    </div>
  );
}
