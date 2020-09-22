import React, { useState } from "react";
import { useHistory } from "react-router-dom";
//import * as yup from "yup";
// import styled from "styled-components";
import axiosWithAuth from "../Utils/axiosWithAuth";

////-------------------------React 1: Ruth   creates form to createCard/ new "How-To"------------------------///

// const ????????????? = () => {
//     const [] = useState({

//     });

const history = useHistory();

//   const handleSubmit = (e) => {
//     e.preventDefault();

axiosWithAuth()
  .post(`/api/cards`, formState) //<-----------------------   formState change to whatever React 1 decides

  .then((res) => {
    console.log(res);
    history.push("/MainPage");
  })
  .catch((err) => console.log(err));
//   };

//   return (

//  Form for new How-To card

//

//   )

//   export default CreateCard;
