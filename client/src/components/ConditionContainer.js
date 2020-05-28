import React from "react";
import {
    Container,
    Select,
    makeStyles,
    Grid,
    MenuItem
} from "@material-ui/core";

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
}) => {

    const category = "CLICK ME";
    const classes = useStyles();

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
              value={category}
              data-testid="condition"
              id="condition"
            >
                <MenuItem>CLICK ME</MenuItem>
            </Select>
          </Grid>
        </Container>
    )
};

export default ConditionContainer;