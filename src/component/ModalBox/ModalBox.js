import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Typography, TextField, Grid, Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

export default function TransitionsModal(props) {
  const classes = useStyles();
  const [name, setName] = React.useState("");
  const [company, setCompany] = React.useState("");

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={props.open}>
          <div className={classes.paper}>
            <Typography
              variant="h4"
              id="transition-modal-title"
              style={{ textAlign: "center", fontWeight: "bold" }}
            >
              Add User
            </Typography>
            <Typography variant="h6" id="transition-modal-description">
              Please Enter the Following user details:
            </Typography>
            <Grid container xs={12} justify="center">
              <Grid item xs={12}>
                <TextField
                  style={{ marginTop: "10px", marginBottom: "10px" }}
                  fullWidth
                  label="Name"
                  defaultValue=""
                  variant="outlined"
                  onChange={e => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  style={{ marginBottom: "10px" }}
                  fullWidth
                  label="Company"
                  defaultValue=""
                  variant="outlined"
                  onChange={e => setCompany(e.target.value)}
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    props.addUser({ Name: name, Company: company });
                    props.handleClose();
                  }}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
