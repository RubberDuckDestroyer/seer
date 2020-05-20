import React, { useState, useContext } from "react";
import {
  Container,
  TextField,
  Grid,
  Slider,
  Typography,
  makeStyles
} from "@material-ui/core";
import AppContext from "../AppContext";
import SearchBloc from "../bloc/SearchBloc";


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

  const searchBloc = useContext(AppContext).getBloc(SearchBloc);

  const [startDate, setStartDate] = useState(new Date().toString());
  const [endDate, setEndDate] = useState(new Date().toString());
  const [yearRange, setYearRange] = useState([1900, new Date().getFullYear()]);
  const [monthRange, setMonthRange] = useState([0, 11]);

  const onChangeStartDate = (e) => {
    searchBloc.minDate.setValue(e.target.value);
    setStartDate(e.target.value);
  };
  const onChangeEndDate = (e) => {
    searchBloc.maxDate.setValue(e.target.value);
    setEndDate(e.target.value);
  };
  const onChangeYearRange = (e, value) => {
    setYearRange(value);

    const endDateString = new Date(`${value[1]}-0${1}-0${2}`).toISOString();
    const startDateString = new Date(`${value[0]}-0${1}-0${2}`).toISOString();

    onChangeEndDate({
      target: { value: endDateString.slice(0, 10) }
    });
    onChangeStartDate({
      target: { value: startDateString.slice(0, 10) }
    });
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
        <Grid item xs={2}>
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
        <Grid item xs={4} >
          <Typography id="year-range-slider" gutterBottom >
            Year
          </Typography>
          <Slider
            style={{ width: "90%" }}
            min={1900}
            max={new Date().getFullYear()}
            value={yearRange}
            onChange={onChangeYearRange}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
          />
        </Grid>
        <Grid item xs={4}>
          <Typography id="month-range-slider" gutterBottom>
            Month
          </Typography>
          <Slider
            style={{ width: "90%" }}
            min={0}
            max={11}
            value={monthRange}
            onChange={onChangeMonthRange}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            valueLabelFormat={getMonthName}
          />
        </Grid>
        <Grid item xs={2}>
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
