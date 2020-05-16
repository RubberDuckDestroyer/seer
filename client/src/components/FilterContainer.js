import React, { useState } from 'react';
import {
    Container, Select, MenuItem, TextField, Grid, makeStyles
} from "@material-ui/core";

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

const FilterContainer = ({
    style
}) => {
    const [category, setCategory] = useState('');
    const [condition, setCondition] = useState('');
    const [value, setValue] = useState("");

    const classes = useStyles();

    const isTextInput = category === "c";

    const onChangeCategory = (e) => {
        setCategory(e.target.value);
    };
    const onChangeCondition = (e) => {
        setCondition(e.target.value);
    };
    const onChangeValue = (e) => {
        setValue(e.target.value);
    };

    return (
        <Container style={{
            ...style,
            borderRadius: "10px"
        }}>
            <Grid
                className={classes.gridContainer}
                container
                spacing={1}
            >
                <Grid item xs={4}>
                    <Select
                        className={classes.selectionItem}
                        value={category}
                        onChange={onChangeCategory}
                    >
                        <MenuItem value={"a"}>SE Method</MenuItem>
                        <MenuItem value={"b"}>SE Methodology</MenuItem>
                        <MenuItem value={"c"}>Outcome</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={4}>
                    <Select
                        className={classes.selectionItem}
                        value={condition}
                        onChange={onChangeCondition}
                    >
                        <MenuItem value={1}>CONTAINS</MenuItem>
                        <MenuItem value={2}>STARTS WITH</MenuItem>
                        <MenuItem value={3}>ENDS WITH</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={4}>
                    {
                        isTextInput &&
                        <TextField
                            className={classes.selectionItem}
                            variant="standard"
                            label="Value"
                            value={value}
                            onChange={onChangeValue}
                            error={false}
                            helperText={""}
                        />
                    }
                    {
                        !isTextInput &&
                        <Select
                            className={classes.selectionItem}
                            value={value}
                            onChange={onChangeValue}
                        >
                            <MenuItem value={1}>AAA</MenuItem>
                            <MenuItem value={2}>BBB</MenuItem>
                            <MenuItem value={3}>CCC</MenuItem>
                        </Select>
                    }
                </Grid>
            </Grid>
        </Container>
    );
};
export default FilterContainer;
