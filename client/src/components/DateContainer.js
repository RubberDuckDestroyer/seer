import React, { useState } from "react";
import {
  Container,
  TextField,
  Grid,
  makeStyles
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    padding: "auto",
    height: "100%",
    display: "flex",
    alignItems: "flex-end"
  },
  selectionItem: {
    width: "100%",
    marginBottom: theme.spacing(1)
  }
}));

const DateContainer = ({ style }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const onChangeStartDate = (e) => {
    setStartDate(e.target.value);
  };
  const onChangeEndDate = (e) => {
    setEndDate(e.target.value);
  };

  const classes = useStyles();

  return (
    <Container
      style={{
        ...style,
        borderRadius: "10px",
      }}
    >
      <Grid className={classes.gridContainer} container spacing={1}>
        <Grid item xs={6}>
          <TextField
            id="startDate"
            label="From Date"
            type="date"
            value={startDate}
            onChange={onChangeStartDate}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="endDate"
            label="To Date"
            type="date"
            value={endDate}
            onChange={onChangeEndDate}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Grid>
    </Container>
  )
}

export default DateContainer;