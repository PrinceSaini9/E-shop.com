import React from "react";
import LoginIn from "./components/loginIn Form/login";
import SignUp from "./components/SignUp Form/signUp.js";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Home } from "./components/Home/home";
import { Product } from "./components/Product/product";
import { Order } from "./components/Order/order";
import axios from "axios";



function App() {

  const [prod, setProd] = useState([]);
  const [prodId, setProdId] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [prodPath, setProdPath] = useState("");
  let orderPath = `/order/${prodId}`;

  /* api call to save address */
  function saveAddress(address) {

    fetch('http://localhost:3001/api/v1/addresses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': `${localStorage.getItem('x-auth-token')}`
      },
      body: JSON.stringify(address),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);

      })
      .catch(error => {
        alert(error);
      });
  }

  /* saving quantity */
  function sendQuantity(quan) {
    setQuantity(quan);
  }

  /* setting product id  */
  function setId(id) {
    setProdId(id);
    setProdPath(`/product-details/${id}`)
    let item = prod.filter((i) => i._id === id);
    setProduct(item);
  }

  /* api call for login  */
  async function postData(userEmail, userPassword, setOpen, setMsg) {

    let obj = {
      email: userEmail,
      password: userPassword,
    };

    try {
      const res = await axios.post('http://localhost:3001/api/v1/auth', obj);

      localStorage.setItem("x-auth-token", res.headers["x-auth-token"]);
      setTimeout(() => {
        navigate('/products');
      }, 2000)
      setTimeout(() => {
        setMsg("Login successfully")
        setOpen(true);
      }, 500)

    }
    catch (e) {
      setMsg(e.response.data);
      setOpen(true);
    }

  }

  const navigate = useNavigate();

  /* api call for signUp  */
  async function createUser(user, setOpen, setMsg) {
    try {
      await axios.post('http://localhost:3001/api/v1/users', user)

      setTimeout(() => {
        navigate('/login');
      }, 2000)
      setTimeout(() => {
        setMsg("Sign up Successfully")
        setOpen(true);

      }, 500)


    } catch (e) {

      setMsg(e.response.data);
      setOpen(true);
    }

  };

  useEffect(() => {
    showProd();
  }, [])

  /* api call for getting product  */
  async function showProd() {

    fetch('http://localhost:3001/api/v1/products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(data => {
        setProd(data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  /* routing for all the pages  */
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<SignUp createUser={createUser} />} />
        <Route exact path="/login" element={<LoginIn postData={postData} />} />
        <Route exact path="/products" element={<Home prod={prod} setId={setId} showProd={showProd} />} />
        <Route path={prodPath} element={<Product product={product} sendQuantity={sendQuantity} />} />
        <Route path={orderPath} element={<Order product={product} quantity={quantity} saveAddress={saveAddress} />} />
      </Routes>

    </div>
  );
}

export default App;
