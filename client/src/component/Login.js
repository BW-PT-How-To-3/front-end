import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import PasswordToggle from "./PasswordToggle";
import axios from "axios";

const formSchema = yup.object().shape({
  username: yup.string().required("Username is a required field."),
  password: yup.string().required("Password is a required field."),
});
//
function Login() {

  document.body.style = 'background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);';
  
  const [passwordInputType, ToggleIcon] = PasswordToggle();

  const styles = {
    links: {
      textDecoration: "none",
      color: "#4FD1C5",
      cursor: "pointer",
    },
  };
  const history = useHistory();

  const [userInput, setUserInput] = useState({
    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");
    username: "",
    password: "",
  });

  //state for displaying user info
  // const [data, setData] = useState([]);

  const [buttonDisabled, setButtonDisabled] = useState(true);
  useEffect(() => {
    formSchema.isValid(userInput).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [userInput]);

  const [errorState, setErrorState] = useState({
    username: "",
    password: "",
  });

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
      username: "",
      password: "",
    });

    //ensure user data is being returned
    axios
      .post("https://how-to-hacks.herokuapp.com/api/users/login", userInput)
      .then((res) => {
        // axios with request to retrieve a token from the server
        console.log(res);
        window.localStorage.setItem("token", res.data.payload);
        //    // Alternatively-----------------------------------------
        // localStorage.setItem('token', res.data.token)
        // localStorage.setItem('id', res.data.id)

        history.push("/");
      })
      .catch((err) => console.log(err.res));
  };

  const changeHandler = (e) => {
    e.persist();
    validator(e);

    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  return (
    <div className="signup-div">
      <div>
        <div className="form-info">
          <h1 className="app-bar">Welcome back!</h1>
          <p className="member-login">
            Log in using your username and password
          </p>

          <form onSubmit={submitHandler} className="form-login">
            <div>
              <label htmlFor="username"></label>
              <br />
              <TextField
                id="standard-basic"
                label="Username"
                type="text"
                name="username"
                fullWidth
                value={userInput.username}
                onChange={changeHandler}
                helperText={
                  errorState.username.length > 0 ? (
                    <p className="error">{errorState.username}</p>
                  ) : null
                }
              />
              <br />

              <label htmlFor="password"></label>
              <br />

              <TextField
                type={passwordInputType}
                id="standard-basic"
                label="Password"
                name="password"
                fullWidth
                value={userInput.password}
                onChange={changeHandler}
                helperText={
                  errorState.password.length > 0 ? (
                    <p className="error">{errorState.password}</p>
                  ) : null
                }
              />
              <div>
                <span className="password-icon-login">{ToggleIcon}</span>
              </div>
            </div>
            <button disabled={buttonDisabled} className="login-btn">
              Log In
            </button>
            <p className="login-signup-here">
              Don't have an account?{" "}
              <Link to="/register" style={styles.links}>
                Sign Up
              </Link>
            </p>
            {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
          </form>
        </div>
      </div>
      <div className="form-graphics">
        <p>
          Find your next project.
          <br />
          Engage your followers.
          <br />
          Do it all with <span>HowTo</span>.
        </p>
      </div>
    </div>
  );
}
export default Login;
