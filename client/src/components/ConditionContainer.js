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

const useStyles = makeStyles(() => ({
    gridContainer: {
      padding: "auto",
      height: "100%",
      display: "flex",
      alignItems: "flex-end"
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
            borderRadius: "10px",
          }}
        >
          <Grid className={classes.gridContainer} container spacing={1}>
            <Select
              className={classes.selectionItem}
              value={joint}
              data-testid="condition"
              id="condition"
              onChange={onJointChange}
            >
              {
                Object.values(FilterJointType).map(t => (
                  <MenuItem key={t.name} value={t}>{t.name}</MenuItem>
                ))
              }
            </Select>
          </Grid>
        </Container>
    );
};
export default ConditionContainer;
