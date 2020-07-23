import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Typography } from "@material-ui/core";

export default function SimpleMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(
    props.users[props.activeUser - 1].Name
  );

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const updateCurrentUser = e => {
    setCurrentUser(e);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Typography>
        You are Logged-in as:
      </Typography>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        variant="contained"
        color="secondary"
      >
        {currentUser}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {props.users
          .filter(user => user.id != props.activeUser)
          .map((user, index) => (
            <MenuItem
              onClick={() => {
                props.changeProfile(user.id);
                updateCurrentUser(user.Name);
                handleClose();
              }}
            >
              {user.Name}
            </MenuItem>
          ))}
      </Menu>
    </div>
  );
}
