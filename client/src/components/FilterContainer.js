import React, { useState } from "react";
import {
  Container,
  Select,
  MenuItem,
  TextField,
  Grid,
  makeStyles
} from "@material-ui/core";

import MethodType from "../libs/enums/MethodType";

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

const FilterContainer = ({ style }) => {
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [value, setValue] = useState("");

  const classes = useStyles();

  const isTextInput = category === "c";

  const onChangeCategory = (e) => {
    setCategory(e.target.value);
    // this probably doesnt work now, need to provide a nice string somehow
    // change the drop down list on the right to match the catagory selected
    // update the right things
  };
  const onChangeCondition = (e) => {
    setCondition(e.target.value);
  };
  const onChangeValue = (e) => {
    setValue(e.target.value);
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
            <MenuItem value={MethodType}>SE Method</MenuItem>
            <MenuItem value={"semethodology"}>SE Methodology</MenuItem>
            <MenuItem value={"participant"}>Participants</MenuItem>
            <MenuItem value={"researchmethod"}>Research Method</MenuItem>
            <MenuItem value={"researchmetric"}>Metric</MenuItem>
            <MenuItem value={"outcome"}>Outcome</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={4}>
          <Select
            className={classes.selectionItem}
            value={condition}
            onChange={onChangeCondition}
          >
            <MenuItem value={"contains"}>CONTAINS</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={4}>
          {isTextInput && (
            <TextField
              className={classes.selectionItem}
              variant="standard"
              label="Value"
              value={value}
              onChange={onChangeValue}
              error={false}
              helperText={""}
            />
          )}
          {!isTextInput && (
            <Select
              className={classes.selectionItem}
              value={value}
              onChange={onChangeValue}
            >
              <MenuItem value={1}>AAA</MenuItem>
              <MenuItem value={2}>BBB</MenuItem>
              <MenuItem value={3}>CCC</MenuItem>
            </Select>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};
export default FilterContainer;
