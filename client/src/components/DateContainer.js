import React, { useContext } from "react";
import {
  Container,
  TextField,
  Grid,
  Slider,
  Typography,
  makeStyles,
  Hidden,
  Checkbox,
  FormControlLabel
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
  },
}));

function getFormattedDate(date) {
  return moment(date).format("YYYY-MM-DD");
}

const DateContainer = ({ style }) => {

  const searchBloc = useContext(AppContext).getBloc(SearchBloc);
  const minDate = DateUtils.toUTC(useBindable(searchBloc.minDate));
  const maxDate = DateUtils.toUTC(useBindable(searchBloc.maxDate));
  const isFilterDate = useBindable(searchBloc.filterDate);

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
      minDate.setUTCFullYear(minYear);
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

      const formatDateLabel = (i) => {
        if (i >= 0 && i <= 11) {
          return DateUtils.getMonthName(i).substr(0, 3);
        }
        return "";
        const onFilterDateButton = () => {
          searchBloc.filterDate.setValue(!searchBloc.filterDate.getValue());
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
        <Grid item xs={4} md={3} lg={2}>
          < TextField
            id="startDate"
            label="From Date"
            type="date"
            value={minDateString}
            onChange={onMinDateChange}
            className={classes.selectionItem}
              InputLabelProps={{
              shrink: true,
            }}
            />
        </Grid>
          <Hidden smDown>
          <Grid item md={3} lg={4}>
          <Typography id="year-range-slider" gutterBottom >
              Year
            </Typography>
            <Slider
              style={{ width: "90%", marginLeft: "5%" }}
          min={1900}
          max={new Date().getUTCFullYear()}
          value={[minDate.getUTCFullYear(), maxDate.getUTCFullYear()]}
              onChange={onYearChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
        />
          </Grid>  
    <Grid item md={3} lg={4}>
            <Typography id="month-range-slider" gutterBottom>
        Month
            </Typo g raphy>
  < Slider  
  style={{ width: "90%", marginLeft: "5%" }}
              mi n={0}
              ma x={11}
        value={[minDate.getUTCMonth(), maxDate.getUTCMonth()]}
        onChange={onMonthChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        valueLabelFormat={formatDateLabel}
      />
          </Grid>
        </Hidden>  
<Grid item xs={4} md={3} lg={2}>
          < TextField
            id="endDate"
  label="To Date"
            ty pe="date"
             value={maxDateString}
            onC hange={onMaxDateChange}
            className={classes.selectionItem}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={4} md={12}>
          <FormControlLabel
            value="end"
            control={<Checkbox color="primary" checked={isFilterDate} />}
            label="Filter date?"
            labelPlacement="end"
            onClick={onFilterDateButton}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default DateContainer;
