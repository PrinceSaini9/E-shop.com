import React from "react";
import Head from "./header.js";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import AdminHead from "./adminHeader.js";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';





export function Home(props) {
  const [prodList, setProdList] = useState([]);
  const [alignment, setAlignment] = useState('all');
  const [option, setOption] = useState(1);
  const [open,setOpen]= useState(false);
  const [prod,setProd]=useState("");
  const handleClose = () => setOpen(false);
  const defaultList = props.prod;
  const navigate = useNavigate();
  const [page,setPage]=useState(0);
  const [del,setDel]= useState(false);
  const [mod,setMod]= useState(false);
  const [add,setAdd]= useState(false);
  const [newProduct,setProduct]= useState({
    name: "",
    category: "",
    description: "",
    manufacturer: "",
    imageURL: "",
    availableItems: "",
    price: ""
});
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  let data={};
if(localStorage.getItem('x-auth-token')){
     data =jwtDecode(localStorage.getItem('x-auth-token'));
    }
    
    async function deleteItem(){
      setOpen(false);
      
       await fetch(`http://localhost:3001/api/v1/products/${prod._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': `${localStorage.getItem('x-auth-token')}`
      }
    })
      
      
      .catch(error => {
        alert(error);
      });
      setDel(true);
      props.showProd();

    }

  function goToLogin() {
    navigate("/login");
  }

  useEffect(() => {
    setProdList(props.prod);

  }, [props.prod]);

  const handleChange = (e) => {
    let newAlignment = e.target.value;
    setAlignment(newAlignment);
    setOption(0);
    if (newAlignment !== "all") {
      let product = defaultList.filter((item) => item.category === newAlignment);
      setProdList([...product]);
    }
    else
      setProdList(defaultList);
  };

  async function handleSubmit(){
    
    const data = {...newProduct};
   await fetch(`http://localhost:3001/api/v1/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': `${localStorage.getItem('x-auth-token')}`
      },
      body: JSON.stringify(data)
    })
      .catch(error => {
        alert(error);
      });
      setProduct({
        name: "",
        category: "",
        description: "",
        manufacturer: "",
        imageURL: "",
        availableItems: "",
        price: ""
    })

      props.showProd();
      setPage(0);
      setAdd(true);
      
      

  }
  function inputHandler(e){
    const state = {...newProduct}
    state[e.target.id] = e.target.value;
    setProduct(state);
  }
  function modifyHandler(e){
    const state = {...prod}
    state[e.target.id] = e.target.value;
    setProd(state);
  }
   async function handleModify(){
    
   await  fetch(`http://localhost:3001/api/v1/products/${prod._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': `${localStorage.getItem('x-auth-token')}`
      },
      body: JSON.stringify(prod)
    })
      .catch(error => {
        alert(error);
      });
      props.showProd();
      setPage(0);
      setMod(true);
  }

  function sortOrder(prop) {
    return function (a, b) {
      if (a[prop] > b[prop])
        return 1;
      else if (a[prop] < b[prop])
        return -1;
      else
        return 0;
    }
  }
  function revSortOrder(prop) {
    return function (a, b) {
      if (a[prop] > b[prop])
        return -1;
      else if (a[prop] < b[prop])
        return 1;
      else
        return 0;
    }
  }

  const handleOptions = (event) => {
    let newValue = event.target.value
    setOption(newValue);
    if (newValue === 2)
      prodList.sort(revSortOrder("price"));
    else if (newValue === 3)
      prodList.sort(sortOrder("price"));
    else if (newValue === 4)
      prodList.sort(revSortOrder("createdAt"));
    else
      prodList.sort(sortOrder("createdAt"));

  };
  function selectProduct(id) {
    props.setId(id);
    navigate(`/product-details/${id}`)
  }
  function handleSearch(value) {
    if (value !== "") {
      let product = defaultList.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()));
      setProdList([...product]);
    }
    else {
      setProdList(defaultList);
    }
  }

  if (data.isAdmin===false) {

    return (
      <>
        <Head email={data.name} handleSearch={handleSearch} />
        
        <Grid container mt={2} justifyContent="center"  >
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton value="all">ALL</ToggleButton>
            <ToggleButton value="Apparel">APPAREL</ToggleButton>
            <ToggleButton value="Automotive">AUTOMOTIVE</ToggleButton>
            <ToggleButton value="Electronics">ELECTRONICS</ToggleButton>
            <ToggleButton value="Home Accessories">HOME ACCESSORIES</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Box mt={2} ml={4} sx={{ width: "30%" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={option}
              label="SortBy"
              onChange={handleOptions}
            >
              <MenuItem value={1}>Default</MenuItem>
              <MenuItem value={2}>Price high to low</MenuItem>
              <MenuItem value={3}>Price low to high</MenuItem>
              <MenuItem value={4}>Newest</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Grid container display="flex" justifyContent="center" sm={12} spacing={4} mt={2} pl={4} flexWrap="wrap">
          {
            prodList.map((items) => {
              return (

                <Grid item xs={6} sm={3}  >
                  <Card sx={{ height: 345 }}>
                    <CardMedia
                      component="img"
                      alt={items.name}
                      height="140"
                      image={items.imageURL}
                    />
                    <Grid container display="flex" flexDirection="row" height="60%" justifyContent="space-between">
                      <Grid item xs={12} height="75%" overflow="auto" >
                        <CardContent>
                          <Grid container >
                            <Grid item xs={12}>
                              <Grid container justifyContent="space-between">
                                <Grid item  >
                                  <Typography gutterBottom variant="h6" component="div">
                                    {items.name}
                                  </Typography>
                                </Grid>
                                <Grid item >
                                  <Typography gutterBottom variant="h6" component="div">
                                    &#8377;{items.price}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item overflow="hidden">
                              <Typography variant="body2" color="text.secondary">
                                {items.description}
                              </Typography>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Grid>
                      <Grid item xs={12} >
                        <CardActions>
                          <Button size="small" style={{ color: "white", backgroundColor: "#3f51b5" }} onClick={() => selectProduct(items._id)}>Buy</Button>
                        </CardActions>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              );
            })
          }
        </Grid>
      </>

    );
  }
  else if( data.isAdmin && page===0){
 return(
  <>
  <AdminHead  handleSearch={handleSearch} setPage={setPage}/>
  <Stack position="fixed" sx={{ width: '30%', right: 10 }} >
                        <Collapse in={del}>
                            <Alert variant="filled" style={{ fontSize: 12 }} onClose={() => { setDel(false); }}>Product - {prod.name} deleted Successfully</Alert>
                        </Collapse>
                    </Stack>
                    <Stack position="fixed" sx={{ width: '30%', right: 10 }} >
                        <Collapse in={mod}>
                            <Alert variant="filled" style={{ fontSize: 12 }} onClose={() => { setMod(false); }}>Product - {prod.name} modified Successfully</Alert>
                        </Collapse>
                    </Stack>
                    <Stack position="fixed" sx={{ width: '30%', right: 10 }} >
                        <Collapse in={add}>
                            <Alert variant="filled" style={{ fontSize: 12 }} onClose={() => { setAdd(false); }}>New Product added Successfully</Alert>
                        </Collapse>
                    </Stack>
  <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirm Deletion of Product!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete the product?
          </Typography>
          <Grid container justifyContent="flex-end"  sx={{ mt: 2 }}>
            <Button color="success" variant="contained" onClick={deleteItem}>Yes</Button>
            &nbsp;
            <Button color="error" variant="contained" onClick={handleClose}>No</Button>
          </Grid>
        </Box>
      </Modal>
  <Grid container mt={2} justifyContent="center"  >
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton value="all">ALL</ToggleButton>
            <ToggleButton value="Apparel">APPAREL</ToggleButton>
            <ToggleButton value="Automotive">AUTOMOTIVE</ToggleButton>
            <ToggleButton value="Electronics">ELECTRONICS</ToggleButton>
            <ToggleButton value="Home Accessories">HOME ACCESSORIES</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Box mt={2} ml={4} sx={{ width: "30%" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={option}
              label="SortBy"
              onChange={handleOptions}
            >
              <MenuItem value={1}>Default</MenuItem>
              <MenuItem value={2}>Price high to low</MenuItem>
              <MenuItem value={3}>Price low to high</MenuItem>
              <MenuItem value={4}>Newest</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Grid container display="flex" justifyContent="center" sm={12} spacing={4} mt={2} pl={4} flexWrap="wrap">
          {
            prodList.map((items) => {
              return (

                <Grid item xs={6} sm={3}  >
                  <Card sx={{ height: 345 }}>
                    <CardMedia
                      component="img"
                      alt={items.name}
                      height="140"
                      image={items.imageURL}
                    />
                    <Grid container display="flex" flexDirection="row" height="60%" justifyContent="space-between">
                      <Grid item xs={12} height="75%" overflow="auto" >
                        <CardContent>
                          <Grid container >
                            <Grid item xs={12}>
                              <Grid container justifyContent="space-between">
                                <Grid item  >
                                  <Typography gutterBottom variant="h6" component="div">
                                    {items.name}
                                  </Typography>
                                </Grid>
                                <Grid item >
                                  <Typography gutterBottom variant="h6" component="div">
                                    &#8377;{items.price}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item overflow="hidden">
                              <Typography variant="body2" color="text.secondary">
                                {items.description}
                              </Typography>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Grid>
                      <Grid item xs={12} >
                        <Grid container xs={12} mx={1} justifyContent="space-between">
                          <Grid item xs={5}>
                          <Button size="small" style={{ color: "white", backgroundColor: "#3f51b5" }} onClick={() => selectProduct(items._id)}>Buy</Button>
                          </Grid>
                          <Grid item  mr={2}>
                            <EditIcon onClick={()=>{setProd(items);setPage(2)}} />
                            &nbsp;&nbsp;&nbsp;
                            <DeleteIcon onClick={()=>{setProd(items);setOpen(true)}}/>
                          </Grid>
                          </Grid>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              );
            })
          }
        </Grid>
  </>
  
 )
  }
  else if(data.isAdmin && page===1){
 return(
  <>
  <AdminHead  handleSearch={handleSearch} setPage={setPage}/>
  <Grid container sm={12}>
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
                                ADD PRODUCT
                            </Typography>
                            <ValidatorForm onSubmit={handleSubmit}>
                                <Grid container spacing={2} xs={12} >
                                    <Grid item xs={12} >
                                        <TextValidator
                                            id="name"
                                            label="Enter Name"
                                            type="text"
                                            fullWidth
                                            required
                                            value={newProduct.name}
                                            validators={["required"]}
                                            onChange={inputHandler}
                                            errorMessages={["Name cannot be empty"]}
                                        ></TextValidator>
                                    </Grid>
                                    <Grid item xs={12} >
                                        <TextValidator
                                            id="category"
                                            label="Category"
                                            type="text"
                                            fullWidth
                                            required
                                            value={newProduct.category}
                                            validators={["required"]}
                                            onChange={inputHandler}
                                            errorMessages={["Category is required"]}
                                        ></TextValidator>
                                    </Grid>
                                    <Grid item xs={12} >
                                        <TextValidator
                                            id="description"
                                            label="Product Description"
                                            type="text"
                                            fullWidth
                                            value={newProduct.description}
                                            onChange={inputHandler}
                                        ></TextValidator>
                                    </Grid>
                                    <Grid item xs={12} >
                                        <TextValidator
                                            id="price"
                                            label="Price"
                                            type="text"
                                            fullWidth
                                            required
                                            value={newProduct.price}
                                            validators={["required","isNumber"]}
                                            onChange={inputHandler}
                                            errorMessages={["price is mandatory","can be number only"]}
                                        ></TextValidator>
                                    </Grid>
                                    <Grid item xs={12} >
                                        <TextValidator
                                            id="availableItems"
                                            label="Available Items"
                                            type="text"
                                            fullWidth
                                            required
                                            value={newProduct.availableItems}
                                            validators={["required"]}
                                            onChange={inputHandler}
                                            errorMessages={["availableItems feild is mandatory"]}
                                        ></TextValidator>
                                    </Grid>
                                    <Grid item xs={12} >
                                        <TextValidator
                                            id="imageURL"
                                            label="image URL"
                                            type="text"
                                            fullWidth
                                            value={newProduct.imageURL}
                                            onChange={inputHandler}
                                        ></TextValidator>
                                    </Grid>
                                    <Grid item xs={12} >
                                        <TextValidator
                                            id="manufacturer"
                                            label="Manufacturer"
                                            type="text"
                                            fullWidth
                                            required
                                            value={newProduct.manufacturer}
                                            validators={["required"]}
                                            onChange={inputHandler}
                                            errorMessages={["manufacturer is mandatory"]}
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
                                    ADD PRODUCT
                                </Button>
                            </ValidatorForm>
                        </Box>
                    </Container>
                </Grid>
  </Grid>
  </>
 )
  }
  else if(data.isAdmin && page===2){
    return(
      <>
      <AdminHead  handleSearch={handleSearch} setPage={setPage}/>
      <Grid container sm={12}>
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
                                MODIFY PRODUCT
                            </Typography>
                            <ValidatorForm onSubmit={handleModify} >
                                <Grid container spacing={2} xs={12} >
                                    <Grid item xs={12} >
                                        <TextValidator
                                            id="name"
                                            label="Enter Name"
                                            type="text"
                                            fullWidth
                                            required
                                            value={prod.name}
                                            validators={["required"]}
                                            onChange={modifyHandler}
                                            errorMessages={["Name cannot be empty"]}
                                        ></TextValidator>
                                    </Grid>
                                    <Grid item xs={12} >
                                        <TextValidator
                                            id="category"
                                            label="Category"
                                            type="text"
                                            fullWidth
                                            required
                                            value={prod.category}
                                            validators={["required"]}
                                            onChange={modifyHandler}
                                            errorMessages={["Category is required"]}
                                        ></TextValidator>
                                    </Grid>
                                    <Grid item xs={12} >
                                        <TextValidator
                                            id="description"
                                            label="Product Description"
                                            type="text"
                                            fullWidth
                                            value={prod.description}
                                            onChange={modifyHandler}
                                        ></TextValidator>
                                    </Grid>
                                    <Grid item xs={12} >
                                        <TextValidator
                                            id="price"
                                            label="Price"
                                            type="text"
                                            fullWidth
                                            required
                                            value={prod.price}
                                            validators={["required","isNumber"]}
                                            onChange={modifyHandler}
                                            errorMessages={["price is mandatory","can be number only"]}
                                        ></TextValidator>
                                    </Grid>
                                    <Grid item xs={12} >
                                        <TextValidator
                                            id="availableItems"
                                            label="Available Items"
                                            type="text"
                                            fullWidth
                                            required
                                            value={prod.availableItems}
                                            validators={["required"]}
                                            onChange={modifyHandler}
                                            errorMessages={["availableItems feild is mandatory"]}
                                        ></TextValidator>
                                    </Grid>
                                    <Grid item xs={12} >
                                        <TextValidator
                                            id="imageURL"
                                            label="image URL"
                                            type="text"
                                            fullWidth
                                            value={prod.imageURL}
                                            onChange={modifyHandler}
                                        ></TextValidator>
                                    </Grid>
                                    <Grid item xs={12} >
                                        <TextValidator
                                            id="manufacturer"
                                            label="Manufacturer"
                                            type="text"
                                            fullWidth
                                            required
                                            value={prod.manufacturer}
                                            validators={["required"]}
                                            onChange={modifyHandler}
                                            errorMessages={["manufacturer is mandatory"]}
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
                                    MODIFY PRODUCT
                                </Button>
                            </ValidatorForm>
                        </Box>
                    </Container>
                </Grid>
  </Grid>

      </>
    )
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
