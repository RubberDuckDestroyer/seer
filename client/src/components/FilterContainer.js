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
import MethodologyType from "../libs/enums/MethodologyType";
import ParticipantType from "../libs/enums/ParticipantType";
import ResearchMethodType from "../libs/enums/ResearchMethodType";
import ResourceType from "../libs/enums/ResourceType";

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
  const textInputCategories = ["author"];

  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [value, setValue] = useState("");

  const isTextInput = textInputCategories.includes(category);

  const classes = useStyles();

  const onChangeCategory = (e) => {
    setCategory(e.target.value);
    setValue("0");
  };
  const onChangeCondition = (e) => {
    setCondition(e.target.value);
  };
  const onChangeValue = (e) => {
    setValue(e.target.value);
  };

  // Gets the items for the drop down on the right, based on the left
  function getFilterArray(filterString) {
    switch (filterString) {
      case "semethod":
        return Object.values(MethodType);
      case "semethodology":
        return Object.values(MethodologyType);
      case "participant":
        return Object.values(ParticipantType);
      case "researchmethod":
        return Object.values(ResearchMethodType);
      case "resourcetype":
        return Object.values(ResourceType);
      default:
        return [];
    }
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
          <Select
            className={classes.selectionItem}
            value={category}
            onChange={onChangeCategory}
          >
            <MenuItem value={"semethod"}>SE Method</MenuItem>
            <MenuItem value={"semethodology"}>SE Methodology</MenuItem>
            <MenuItem value={"participant"}>Participants</MenuItem>
            <MenuItem value={"researchmethod"}>Research Method</MenuItem>
            <MenuItem value={"resourcetype"}>Resource</MenuItem>
            <MenuItem value={"author"}>Author</MenuItem>
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
              {
                getFilterArray(category).map((item, index) => {
                  return <MenuItem key={item} value={index}>{item.name}</MenuItem>;
                })
              }
            </Select>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};
export default FilterContainer;
