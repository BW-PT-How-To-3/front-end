import React, { useState, useEffect } from "react";
// import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const user = {
  username: "",
  password: "",
};

function DeleteUser(props) {
  const [userData, setUserData] = useState(user);
  console.log(userData);

  const handleClick = (id) => {
    axiosWithAuth()
      .delete(`/api/users/delete/${id}`)
      .then((res) => {
        userData.filter((users) => {
          users.id !== id;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  ////
  useEffect(() => {}, []);

  return <div></div>;
}
export default DeleteUser;
