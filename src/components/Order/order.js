import React from "react";
import Head from "../Product/header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import { OrdDetail } from "./order-details";
import { SetAddress } from "../Address/setAddress";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { useEffect } from "react";


export function Order(props) {

    let product = props.product[0];
    const navigate = useNavigate();
    const [option, setOption] = useState(-1);
    const [open, setOpen] = useState(false);
    const [conf, setConf] = useState(false);
    const [stepNum, setStepNum] = useState(0);
    const [addressList, setAddressList] = useState([]);

    const steps = [
        'Item',
        'Set address',
        'Confirm order',
    ];

    /* get api call for address*/
    function getAddress() {
        fetch('http://localhost:3001/api/v1/addresses', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': `${localStorage.getItem('x-auth-token')}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setAddressList(data);
            })
            .catch(error => {
                alert(error);
            });
    }

    useEffect(() => {
        getAddress();
    }, [open])


    function handleOptions(newValue) {

        setOption(newValue);
        console.log(addressList[0]);
        setStepNum(2);

    }

    function handleSubmit(state) {

        props.saveAddress(state);
        setOpen(true);
    }

    function next() {
        setStepNum(1);
    }

    if (localStorage.getItem('x-auth-token')) {
        /* item page*/
        if (stepNum === 0) {
            return (
                <>
                    <Head />

                    <OrdDetail product={product} steps={steps} next={next} stepNum={stepNum} quantity={props.quantity} />
                </>
            );
        }
        /*set address page */
        else if (stepNum === 1) {
            return (
                <>
                    <Head />
                    <Stack position="fixed" sx={{ width: '30%', right: 10 }} >
                        <Collapse in={open}>
                            <Alert variant="filled" style={{ fontSize: 12 }} onClose={() => { setOpen(false); }}>Address saved Successfully</Alert>
                        </Collapse>
                    </Stack>
                    <SetAddress steps={steps} stepNum={stepNum} option={option} handleOptions={handleOptions} addressList={addressList} handleSubmit={handleSubmit} />
                </>
            );
        }
        /* confirm order page*/
        else if (stepNum === 2 || stepNum === 3) {
            return (
                <>
                    <Head />
                    <Stack position="fixed" alignItems="center" justifyContent="center" sx={{ width: "50%", right: "25%", top: 600 }} >
                        <Collapse in={conf}  >
                            <Alert variant="filled"
                                action={
                                    <Button variant="contained" size="small" onClick={() => { setConf(false); navigate('/products') }}>
                                        Go To Home Page
                                    </Button>
                                }
                            >
                                Your Order placed Successfully
                            </Alert>
                        </Collapse>
                    </Stack>
                    <Grid container sm={12} mt={4} justifyContent="center">
                        <Grid item sm={9}>
                            <Box sx={{ width: '100%' }}>
                                <Stepper activeStep={stepNum} alternativeLabel>
                                    {steps.map((label) => (
                                        <Step key={label}>
                                            <StepLabel onClick={(e) => { console.log(e) }}>{label}</StepLabel>
                                        </Step>
                                    ))}
                                </Stepper>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            '& > :not(style)': {
                                mx: 9,
                                mt: 9,
                                width: "100%",
                            },
                        }}
                    >
                        <Paper style={{ borderRadius: 80, border: "5px solid black" }} elevation={4} >
                            <Grid container sm={12} height="100%" alignItems="center" >
                                <Grid item sm={2} style={{ textAlign: "center" }} onClick={() => { setStepNum(1) }}>
                                    <ArrowBackIosIcon fontSize="large" />
                                    <h1>Back</h1>
                                </Grid>
                                <Grid item sm={6} pl={2} style={{ borderLeft: "5px  solid black" }} >

                                    <h2>{product.name}</h2>
                                    <div>Quantity:
                                        <span style={{ fontWeight: "bold" }}> {props.quantity}</span></div>
                                    <div>Category:
                                        <span style={{ fontWeight: "bold" }}> {product.category}</span></div>
                                    <h2 style={{ color: "orange" }}> Total Price : &#8377; {props.quantity * product.price}</h2>
                                </Grid>
                                <Grid item sm={4} pl={2} style={{ borderLeft: "5px  solid black" }}>
                                    <h2 >Address Details</h2>
                                    <h3>Name : {addressList[option].name}</h3>
                                    <h6>Contact Number : {addressList[option].contactNumber}</h6>
                                    <h6>Address : {addressList[option].street},{addressList[option].city}-{addressList[option].state}</h6>
                                    <h6>Zipcode : {addressList[option].zipCode}</h6>
                                </Grid>

                            </Grid>
                        </Paper>
                    </Box>
                    <Grid container sm={12} justifyContent="center">
                        <Button
                            type="submit"
                            onClick={() => { setStepNum(3); setConf(true) }}
                            style={{ backgroundColor: "#3f51b5" }}
                            variant="contained"
                            sx={{ mt: 6, mb: 2 }}
                            sm={6}
                        >
                            Confirm Order
                        </Button>
                    </Grid>
                </>
            );
        }
    }
    
    else {
        return (
            <>
                <h1 style={{ background: "blue", textAlign: "center" }}>You are not logged in -- Login in First to access this
                    <div>
                        <button style={{ background: "orange" }} onClick={() => { navigate("/login"); }}>Go To Login</button>
                    </div>
                </h1>

            </>
        );
    }

}