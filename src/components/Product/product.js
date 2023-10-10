import React from "react";
import Head from "./header";
import Grid from '@mui/material/Grid';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export function Product(props) {
    let product = props.product[0];
    const [quantity, setQuantity] = useState(1);

    function quantityHandler(e) {
        let newQuantity = e.target.value;
        setQuantity(newQuantity);
    };
    function submitHandler() {
        props.sendQuantity(quantity);
        navigate(`/order/${product._id}`)
    }
    const navigate = useNavigate();
    function goToLogin() {
        navigate("/login");
    }

    if (localStorage.getItem('x-auth-token')) {
        return (
            <>
                <Head />
                <Grid container spacing={2} sm={12} sx={{ mt: 18 }} >
                    <Grid item sm={3} ml={12}>
                        <img src={product.imageURL} alt={product.name} height={350} width="100%" />
                    </Grid>
                    <Grid item sm={7}>
                        <Grid container sm={12}>
                            <Grid container spacing={1} sm={12}>
                                <Grid item sm={8}>
                                    <h1>{product.name}</h1>
                                </Grid>
                                <Grid item p={1} mt={5} style={{ fontSize: "60%", height: "30px", backgroundColor: "#3f51b5", color: "white", borderRadius: "20px" }}>
                                    Available Quantity :{product.availableItems}
                                </Grid>
                                <Grid item sm={12}>
                                    <span> Category:
                                        <span style={{ fontWeight: "bold" }}> {product.category}</span>
                                    </span>
                                </Grid>
                                <Grid item mt={2} sm={10}>
                                    <div>
                                        {product.description}
                                    </div>
                                </Grid>
                                <Grid item sm={12} style={{ color: "orange" }}>
                                    <h2>&#8377; {product.price}</h2>
                                </Grid>
                                <Grid item sm={12}>
                                    <ValidatorForm onSubmit={submitHandler}>
                                        <TextValidator
                                            id="quantity"
                                            label="Enter Quantity"
                                            type="text"
                                            value={quantity}
                                            onChange={quantityHandler}
                                            validators={["required", "isNumber", `maxNumber:${product.availableItems}`]}
                                            errorMessages={["Quantity cannot be empty", "quantity can only be number", "quantity not availiable"]}
                                        ></TextValidator>
                                        <Grid item my={2}>
                                            <button type="submit" style={{ backgroundColor: "#3f51b5", color: "white", padding: "10px", border: "0" }}>
                                                PLACE ORDER</button>
                                        </Grid>
                                    </ValidatorForm>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>
            </>
        );
    }
    else {
        return (
            <>
                <h1 style={{ background: "blue", textAlign: "center" }}>You are not logged in -- Login in First to access this
                    <div>
                        <button style={{ background: "orange" }} onClick={goToLogin}>Go To Login</button>
                    </div>
                </h1>

            </>
        );
    }

}