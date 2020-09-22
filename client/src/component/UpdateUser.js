import axios from "axios";
import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import "../App.css";
import { useParams, useHistory } from "react-router-dom";

const userSettings = {
  username: "",
  password: "",
};

const UpdateUser = (props) => {
  const [updateUser, setUpdateUser] = useState(userSettings);

  const { id } = useParams();
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    axiosWithAuth()
      .put(`/api/users/update/${id}`, updateUser)
      .then((res) => {
        setUpdateUser(res.data);
        history.push("/login");
        console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleChange = (event) => {
    setUpdateUser({ ...updateUser, [event.target.name]: event.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="formUpdate">
      <label htmlFor="Name">New Username:</label>
      <input
        className="name-input"
        id="username"
        type="text"
        name="username"
        placeholder="Please Enter a New Username"
        value={updateUser.username}
        onChange={handleChange}
      />
      <label htmlFor="Name">New Password:</label>
      <input
        className="species-input"
        id="password"
        type="text"
        name="password"
        placeholder="Please Enter a New Password"
        value={updateUser.password}
        onChange={handleChange}
      />

      <button className="submit-button" type="submit">
        Update!
      </button>
    </form>
  );
};

export default UpdateUser;
