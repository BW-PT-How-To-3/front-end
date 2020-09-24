import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";
import { TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";

/*
BuergerForm => NewCard
HomePage => Homepage
OrderCard.js => HowToCards

UserHowToCards => this will house HowTocards
*/

const formSchema = yup.object().shape({
  title: yup.string().required("A title is required."),
  instructions: yup.string(),
});

function NewCard(props) {
  const [userInput, setUserInput] = useState({
    title: "",
    instructions: "",
  });

  //   const [data, setData] = useState(userInput);

  const [errorState, setErrorState] = useState({
    title: "",
    instructions: "",
  });

  //   useEffect(() => {
  //     formSchema.isValid(userInput).then((valid) => {
  //       setButtonDisabled(!valid);
  //     });
  //   }, [userInput]);

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

    //reset form once submitted
    setUserInput({
      title: "",
      instructions: "",
    });

    axios
      .post(`https://reqres.in/api/users`, userInput)
      .then((res) => props.addCard(res.data))
      .catch((err) => console.log(err.res));
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
      <form onSubmit={submitHandler}>
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

        <label htmlFor="instructions"></label>
        <br />
        <TextField
          id="standard-basic"
          label="Describe your How-To"
          type="text"
          name="instructions"
          value={userInput.instructions}
          onChange={changeHandler}
          fullWidth
        />

        <button>Create HowTo</button>
        <Link to="/">
          <button>Cancel</button>
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
