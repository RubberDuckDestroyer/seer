import React, { useState } from "react";
import {
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
  selectionItem: {
    width: "100%",
    marginBottom: theme.spacing(1)
  }
}));

const FilterContainer = ({ style, searchFilter }) => {

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
      }}
    >
      <Grid className={classes.gridContainer} container spacing={1}>
        <Grid item xs={4}>
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
        <Grid item xs={4}>
          <Select
            className={classes.selectionItem}
            value={condition}
            onChange={onChangeCondition}
          >
            {
              category.valueType.conditions.map(c => {
                return <MenuItem key={c.name} value={c}>{c.name}</MenuItem>
              })
            }
          </Select>
        </Grid>
        <Grid item xs={4}>
          {
            isTextInput && (
              <TextField
                className={classes.selectionItem}
                variant="standard"
                label="Value"
                value={value}
                onChange={onChangeValue}
                error={false}
                helperText={""}
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
      </Grid>
    </Container>
  );
};
export default FilterContainer;
