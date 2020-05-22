import React, { useState, useContext } from "react";
import {
  Container,
  TextField,
  Grid,
  Slider,
  Typography,
  makeStyles
} from "@material-ui/core";
import moment from "moment";

import AppContext from "../AppContext";
import SearchBloc from "../bloc/SearchBloc";
import { useBindable } from "../local-libs/data/Bindable";
import DateUtils from "../libs/DateUtils";

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

function getFormattedDate(date) {
  return moment(date).format("YYYY-MM-DD");
}

const DateContainer = ({ style }) => {

  const searchBloc = useContext(AppContext).getBloc(SearchBloc);
  const minDate = DateUtils.toUTC(useBindable(searchBloc.minDate));
  const maxDate = DateUtils.toUTC(useBindable(searchBloc.maxDate));

  const minDateString = getFormattedDate(minDate);
  const maxDateString = getFormattedDate(maxDate);

  const onMinDateChange = (e) => {
    searchBloc.minDate.setValue(e.target.value);
  };
  const onMaxDateChange = (e) => {
    searchBloc.maxDate.setValue(e.target.value);
  };
  const onYearChange = (e, value) => {
    const [minYear, maxYear] = value;
    if (minYear !== minDate.getUTCFullYear()) {
      console.log(minYear);
      minDate.setUTCFullYear(minYear);
      console.log(getFormattedDate(minDate));
      searchBloc.minDate.setValue(getFormattedDate(minDate));
    }
    if (maxYear !== maxDate.getUTCFullYear()) {
      maxDate.setUTCFullYear(maxYear);
      searchBloc.maxDate.setValue(getFormattedDate(maxDate));
    }
  };
  const onMonthChange = (e, value) => {
    const [minMonth, maxMonth] = value;
    if (minMonth !== minDate.getUTCMonth()) {
      minDate.setUTCMonth(minMonth);
      searchBloc.minDate.setValue(getFormattedDate(minDate));
    }
    if (maxMonth !== maxDate.getUTCMonth()) {
      maxDate.setUTCMonth(maxMonth);
      searchBloc.maxDate.setValue(getFormattedDate(maxDate));
    }
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
        <Grid item xs={2}>
          <TextField
            id="startDate"
            label="From Date"
            type="date"
            value={minDateString}
            onChange={onMinDateChange}
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
            max={new Date().getUTCFullYear()}
            value={[minDate.getUTCFullYear(), maxDate.getUTCFullYear()]}
            onChange={onYearChange}
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
            value={[minDate.getUTCMonth(), maxDate.getUTCMonth()]}
            onChange={onMonthChange}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            valueLabelFormat={DateUtils.getMonthName}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            id="endDate"
            label="To Date"
            type="date"
            value={maxDateString}
            onChange={onMaxDateChange}
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
