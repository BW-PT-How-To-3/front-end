import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";
import { TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";
// import styled from "styled-components";

const formSchema = yup.object().shape({
  title: yup.string().required("A title is required."),
  post: yup.string(),
});

function NewCard(props) {
  //styles
  document.body.style =
    "background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);";

  const [userInput, setUserInput] = useState({
    title: "",
    post: "",
    author: "persona",
  });

  //   const [data, setData] = useState(userInput);

  const [errorState, setErrorState] = useState({
    title: "",
    post: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  useEffect(() => {
    formSchema.isValid(userInput).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [userInput]);

  const validator = (e) => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setErrorState({
          ...errorState,
          [e.target.name]: "",
        });
      })
      .catch((err) => {
        setErrorState({
          ...errorState,
          [e.target.name]: err.errors[0],
        });
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    axiosWithAuth()
      // axios needs to be invoked as  function
      .post(`/api/howto/new`, userInput)
      .then((res) => props.addCard(res.data))
      .catch((err) => console.log(err.res))
      .finally(() => {
        //reset form once submitted
        // needs to be reset blank AFTER call success newCard
        // .finally dedicated to action after axious regardless of submission or not
        setUserInput({
          title: "",
          post: "",
        });
      });

    console.log("Your How-To has been created.");
  };

  const changeHandler = (e) => {
    e.persist();
    validator(e);
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  return (
    <div>
      <form onSubmit={submitHandler} className="form">
        <label htmlFor="title"></label>
        <br />
        <TextField
          id="standard-basic"
          label="Title"
          type="text"
          name="title"
          value={userInput.title}
          onChange={changeHandler}
          fullWidth
          // required
          helperText={
            errorState.title.length > 0 ? (
              <p className="error">{errorState.title}</p>
            ) : null
          }
        />
        <br />

        <label htmlFor="post"></label>
        <br />
        <TextField
          id="standard-basic"
          label="Describe your How-To"
          type="text"
          name="post"
          value={userInput.post}
          onChange={changeHandler}
          fullWidth
        />

        <button disabled={buttonDisabled} className="card-btn">
          Create HowTo
        </button>
        <Link to="/">
          <button className="card-btn">Cancel</button>
        </Link>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      </form>
      <p>
        Once submitted you can view your HowTo card(s){" "}
        <Link to="/my-how-tos">Here</Link>
      </p>
    </div>
  );
}

export default NewCard;
