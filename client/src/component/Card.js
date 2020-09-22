// import React, {useState, useEffect} from 'react';
// import {useHistory, useParams} from 'react-router-dom';
// import axiosWithAuth from '../Utils/axiosWithAuth';
// import styled from 'styled-components';

//     so sad....

const { id } = useParams();
const history = useHistory();

useEffect(() => {
  axiosWithAuth()
    .get(`/api/cards/${id}`)
    //    cards can be 'users' depending on the shape that back-end decides--------------------------
    .then((res) => {
      //console.log(res.data)
      setState(res.data);
    })
    .catch((err) => console.log(err));
}, [id]);

const handlesubmit = (e) => {
  e.preventDefault();

  axiosWithAuth()
    .put(`/api/cards/${id}`, state)
    .then((res) => {
      console.log(res.data);
      history.push("/MainPage");
    })
    .catch((err) => console.log({ err }));
};
