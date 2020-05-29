import React from "react";
import {
    Container,
    Select,
    makeStyles,
    Grid,
    MenuItem
} from "@material-ui/core";
import { useBindable } from "../local-libs/data/Bindable";
import FilterJointType from "../libs/enums/FilterJointType";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(1)
  }
}));

const ConditionContainer = ({
    style,
    jointFilter
}) => {

  const joint = useBindable(jointFilter.joint);

  const classes = useStyles();

  const onJointChange = (e) => {
    jointFilter.joint.setValue(e.target.value);
  };

  return (
    <Container
      style={{
        ...style,
      }}
    >
      <Grid
        container
        spacing={1}
        justify="center"
        alignItems="center"
      >
        <Grid item xs={8} sm={6} md={4} style={{
          flexDirection: "row",
          display: "flex",
          justifyContent: "center"
        }}>
          <Select
            value={joint}
            data-testid="condition"
            id="condition"
            onChange={onJointChange}
            style={{
              width: "100%"
            }}
          >
            {
              Object.values(FilterJointType).map(t => (
                <MenuItem key={t.name} value={t}>{t.name}</MenuItem>
              ))
            }
          </Select>
        </Grid>
      </Grid>
    </Container>
  );
};
export default ConditionContainer;
