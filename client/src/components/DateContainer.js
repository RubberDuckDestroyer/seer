import React, { useState } from "react";
import {
  Container,
  TextField,
  Grid,
  Slider,
  Typography,
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
  const [startDate, setStartDate] = useState(new Date().toString());
  const [endDate, setEndDate] = useState(new Date().toString());
  const [yearRange, setYearRange] = useState([1900, new Date().getFullYear()]);
  const [monthRange, setMonthRange] = useState([0, 11]);

  const onChangeStartDate = (e) => {
    setStartDate(e.target.value);
  };
  const onChangeEndDate = (e) => {
    setEndDate(e.target.value);
  };
  const onChangeYearRange = (e, value) => {
    setYearRange(value);

    const endDateString = new Date(`${value[1]}-${1}-${2}`).toISOString();
    const startDateString = new Date(`${value[0]}-${1}-${2}`).toISOString();

    setEndDate(endDateString.slice(0, 10));
    setStartDate(startDateString.slice(0, 10));
  };
  const onChangeMonthRange = (e, value) => {
    setMonthRange(value);
  };

  const classes = useStyles();

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  function getMonthName(monthNum) {
    const shortName = monthNames[monthNum].charAt(0).toUpperCase() +
      monthNames[monthNum].substring(1, 3);
    return shortName;
  }

  return (
    <Container
      style={{
        ...style,
        borderRadius: "10px",
      }}
    >
      <Grid className={classes.gridContainer} container spacing={1}>
        <Grid item xs={4}>
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
        <Grid item xs={2}>
          <Typography id="year-range-slider" gutterBottom>
            Year
          </Typography>
          <Slider
            min={1900}
            max={new Date().getFullYear()}
            value={yearRange}
            onChange={onChangeYearRange}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
          />
        </Grid>
        <Grid item xs={2}>
          <Typography id="month-range-slider" gutterBottom>
            Month (probably dont need this)
          </Typography>
          <Slider
            min={0}
            max={11}
            value={monthRange}
            onChange={onChangeMonthRange}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            valueLabelFormat={getMonthName}
          />
        </Grid>
        <Grid item xs={4}>
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
  );
};

export default DateContainer;
