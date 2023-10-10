import React from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Container from '@mui/material/Container';
import Typography from "@mui/material/Typography";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Button from '@mui/material/Button';
import { useState } from "react";


export function SetAddress(props) {
    const [address, setAddress] = useState({
        name: "",
        contactNumber: "",
        street: "",
        city: "",
        state: "",
        landmark: "",
        zipCode: ""
    })
    function handleOptions(event) {
        let newValue = event.target.value
        props.handleOptions(newValue);
    }
    function inputHandler(e) {
        const state = { ...address };
        state[e.target.id] = e.target.value;
        setAddress(state);
    }
    function handleSubmit(e) {
        e.preventDefault();
        let state = { ...address };
        props.handleSubmit(state);
        setAddress({
            name: "",
            contactNumber: "",
            street: "",
            city: "",
            state: "",
            landmark: "",
            zipCode: ""
        });
    }
    return (
        <>
            <Grid container sm={12} mt={4} justifyContent="center">
                <Grid item sm={9}>
                    <Box sx={{ width: '100%' }}>
                        <Stepper activeStep={props.stepNum} alternativeLabel>
                            {props.steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>
                </Grid>
                <Grid item sm={6} mt={4}>
                    <Box  >
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Select Address</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={props.option}
                                label="Select Address"
                                onChange={handleOptions}
                            >
                                {
                                    props.addressList.map((item, index) => {
                                        return (
                                            <MenuItem value={index}>{item.name} &#8596; {item.city},{item.state}-{item.zipCode}</MenuItem>
                                        );
                                    })
                                }


                            </Select>
                        </FormControl>
                    </Box>
                </Grid>

                <Grid item sm={12}>
                    <Container component="main" maxWidth="xs">
                        <Box
                            sx={{
                                marginTop: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Typography mb={2} component="h1" variant="h6">
                                --OR--
                            </Typography>
                            <Typography component="h1" variant="h4">
                                Add Address
                            </Typography>
                            <ValidatorForm onSubmit={handleSubmit} >
                                <Grid container spacing={2} xs={12} sx={{ mt: 2 }}>
                                    <Grid item xs={12} >
                                        <TextValidator
                                            id="name"
                                            label="Enter Name"
                                            type="text"
                                            fullWidth
                                            required
                                            value={address.name}
                                            validators={["required"]}
                                            onChange={inputHandler}
                                            errorMessages={["Name cannot be empty"]}
                                        ></TextValidator>
                                    </Grid>
                                    <Grid item xs={12} >
                                        <TextValidator
                                            id="contactNumber"
                                            label="Contact Number"
                                            type="text"
                                            fullWidth
                                            required
                                            value={address.contactNumber}
                                            validators={["required", "isNumber", "minNumber:1000000000", "maxNumber:9999999999"]}
                                            onChange={inputHandler}
                                            errorMessages={["Number is required", "should be 10 digit contact number only", "not a valid 10-digit contact number", "not a valid 10-digit contact number"]}
                                        ></TextValidator>
                                    </Grid>
                                    <Grid item xs={12} >
                                        <TextValidator
                                            id="street"
                                            label="Area"
                                            type="text"
                                            fullWidth
                                            required
                                            value={address.street}
                                            validators={["required"]}
                                            onChange={inputHandler}
                                            errorMessages={["Area is mandatory"]}
                                        ></TextValidator>
                                    </Grid>
                                    <Grid item xs={12} >
                                        <TextValidator
                                            id="city"
                                            label="City"
                                            type="text"
                                            fullWidth
                                            required
                                            value={address.city}
                                            validators={["required"]}
                                            onChange={inputHandler}
                                            errorMessages={["City is mandatory"]}
                                        ></TextValidator>
                                    </Grid>
                                    <Grid item xs={12} >
                                        <TextValidator
                                            id="state"
                                            label="State"
                                            type="text"
                                            fullWidth
                                            required
                                            value={address.state}
                                            validators={["required"]}
                                            onChange={inputHandler}
                                            errorMessages={["State is mandatory"]}
                                        ></TextValidator>
                                    </Grid>
                                    <Grid item xs={12} >
                                        <TextValidator
                                            id="landmark"
                                            label="Landmark"
                                            type="text"
                                            fullWidth
                                            value={address.landmark}
                                            onChange={inputHandler}
                                        ></TextValidator>
                                    </Grid>
                                    <Grid item xs={12} >
                                        <TextValidator
                                            id="zipCode"
                                            label="Zipcode"
                                            type="text"
                                            fullWidth
                                            required
                                            value={address.zipCode}
                                            validators={["required", "isNumber", "minNumber:100000", "maxNumber:999999"]}
                                            onChange={inputHandler}
                                            errorMessages={["Zipcode is mandatory", "can only be 6-digit number", "not a valid Zipcode", "not a valid Zipcode"]}
                                        ></TextValidator>
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    style={{backgroundColor:"#3f51b5"}}
                                >
                                    Save Address
                                </Button>
                            </ValidatorForm>
                        </Box>
                    </Container>
                </Grid>
            </Grid>

        </>
    );
}