import React from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles } from "@material-ui/core";

// import Vuex store
import store from "../store";

const useStyles = makeStyles({
  "mb-2": {
    marginBottom: "2rem"
  }
});

export default function FormDialog() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({ firstName: "", lastName: "", age: 0 });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    store.commit("submitPerson", formData);
    handleClose();
  };

  const handleFormDataChange = e => {
    const field = e.target.id;
    const value = e.target.value;
    console.log(field, value);
    const newObject = {};
    newObject[field] = field === "age" ? Number(value) : value;
    const newState = { ...formData, ...newObject };
    setFormData(newState);
    store.commit("setForm", newState);
  };

  return (
    <div>
      <Button className={classes["mb-2"]} variant="outlined" color="primary" onClick={handleClickOpen}>
        Capture New Person
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="lg">
        <DialogTitle id="form-dialog-title">Capture New Person</DialogTitle>
        <DialogContent>
          <TextField
            value={formData.firstName}
            onChange={handleFormDataChange}
            autoFocus
            margin="dense"
            id="firstName"
            label="First Name"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            value={formData.lastName}
            onChange={handleFormDataChange}
            autoFocus
            margin="dense"
            id="lastName"
            label="Last Name"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            value={formData.age}
            onChange={handleFormDataChange}
            autoFocus
            margin="dense"
            id="age"
            label="Age"
            type="number"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
