import React from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useNavigate } from "react-router-dom";


export function OrdDetail(props) {

    const navigate = useNavigate();
    function next() {
        props.next();
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
            </Grid>
            <Grid container spacing={2} sm={12} sx={{ mt: 6 }} >
                <Grid item sm={3} ml={12}>
                    <img src={props.product.imageURL} alt={props.product.name} height={350} width="100%" />
                </Grid>
                <Grid item sm={7}>
                    <Grid container spacing={1} sm={12}>
                        <Grid item sm={8}>
                            <h1>{props.product.name}</h1>
                        </Grid>
                        <Grid item sm={12}>
                            <span> Quantity:
                                <span style={{ fontWeight: "bold" }}> {props.quantity}</span>
                            </span>
                        </Grid>
                        <Grid item sm={12}>
                            <span> Category:
                                <span style={{ fontWeight: "bold" }}> {props.product.category}</span>
                            </span>
                        </Grid>
                        <Grid item mt={2} sm={10}>
                            <div>
                                {props.product.description}
                            </div>
                        </Grid>
                        <Grid item sm={12} style={{ color: "orange" }}>
                            <h2> Total Price : &#8377; {props.quantity * props.product.price}</h2>
                        </Grid>

                    </Grid>
                </Grid>
                <Grid container sm={12} my={3} justifyContent="center">
                    <Grid item sm={2}>
                        <button onClick={() => navigate(-1)} style={{ backgroundColor: "#3f51b5", color: "white", padding: "10px", border: "1px solid white" }}>BACK</button>
                        <button onClick={next} style={{ backgroundColor: "#3f51b5", color: "white", padding: "10px", border: "1px solid white" }}>NEXT</button>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}