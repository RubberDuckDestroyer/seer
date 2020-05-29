import React from "react";
import {
  Button,
  Container,
  Select,
  MenuItem,
  TextField,
  Grid,
  makeStyles
} from "@material-ui/core";

import { useBindable } from "../local-libs/data/Bindable";
import FilterCategoryType from "../libs/enums/FilterCategoryType";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    padding: "auto",
    height: "100%",
    display: "flex",
    alignItems: "flex-end"
  },
  gridItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start"
  },
  selectionItem: {
    width: "100%",
    padding: 0,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  actionButton: {
    width: "50%",
    margin: theme.spacing(1),
  }
}));

const FilterContainer = ({
  style,
  searchFilter,
  onPlusButton = () => { },
  onMinusButton = () => { },
}) => {

  const category = useBindable(searchFilter.category);
  const condition = useBindable(searchFilter.condition);
  const value = useBindable(searchFilter.value);

  const isTextInput = !category.valueType.isDropdown;

  const classes = useStyles();

  const onChangeCategory = (e) => {
    searchFilter.category.setValue(e.target.value);
  };
  const onChangeCondition = (e) => {
    searchFilter.condition.setValue(e.target.value);
  };
  const onChangeValue = (e) => {
    searchFilter.value.setValue(e.target.value);
  };

  return (
    <Container
      style={{
        ...style,
        borderRadius: "10px",
        border: "1px solid #ccc",
        backgroundColor: "#eee"
      }}
    >
      <Grid className={classes.gridContainer} container spacing={1}>
        <Grid item xs={4} sm={3} lg={4} className={classes.gridItem}>
          <Select
            className={classes.selectionItem}
            value={category}
            onChange={onChangeCategory}
          >
            {
              Object.values(FilterCategoryType).map(type => {
                return (
                  <MenuItem key={type.name} value={type}>{type.name}</MenuItem>
                );
              })
            }
          </Select>
        </Grid>
        <Grid item xs={4} sm={3} lg={2} className={classes.gridItem}>
          <Select
            className={classes.selectionItem}
            value={condition}
            onChange={onChangeCondition}
          >
            {
              category.valueType.conditions.map(c => {
                return <MenuItem key={c.name} value={c}>{c.name}</MenuItem>;
              })
            }
          </Select>
        </Grid>
        <Grid item xs={4} sm={3} lg={4} className={classes.gridItem}>
          {
            isTextInput && (
              <TextField
                className={classes.selectionItem}
                variant="standard"
                type={category.valueType.isNumeric ? "number" : "text"}
                value={value}
                onChange={onChangeValue}
                error={false}
                helperText={""}
                InputLabelProps={{
                  shrink: false,
                }}
                style={{
                  marginTop: 0
                }}
              />
            )
          }
          {
            !isTextInput && (
              <Select
                className={classes.selectionItem}
                value={value}
                onChange={onChangeValue}
              >
                {
                  category.domain.map(item => {
                    return <MenuItem key={item.name} value={item.name}>{item.name}</MenuItem>;
                  })
                }
              </Select>
            )
          }
        </Grid>
        <Grid item xs={12} sm={3} lg={2} className={classes.gridItem}>
          <Button
            variant="contained"
            color="secondary"
            onClick={onMinusButton}
            data-testid="filterMinus"
            id="filterMinus"
            className={classes.actionButton}
          >
            -
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={onPlusButton}
            data-testid="filterPlus"
            id="filterPlus"
            className={classes.actionButton}
          >
            +
          </Button>
        </Grid>
      </Grid >
    </Container >
  );
};
export default FilterContainer;
