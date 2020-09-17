import React, { useState, useEffect } from 'react';
import * as yup from 'yup'; 
import axios from 'axios';

const formSchema = yup.object().shape({
    username: yup.string()
            .required('Name is a required field.'),
    password: yup.string()
            .required('Password is a required field.')
})

function Login() {

    const [userInput, setUserInput] = useState({
        username: '',
        password: ''
    });

    const [buttonDisabled, setButtonDisabled] = useState(true);
    useEffect(() => {
        formSchema.isValid(userInput).then(valid => {
          setButtonDisabled(!valid);
        });
      }, [userInput]);

    const [errorState, setErrorState] = useState({
        username: '',
        password: ''
    });

    const validator = e => {
        yup
            .reach(formSchema, e.target.name)
            .validate(e.target.value)
            .then( valid => {
                setErrorState({
                    ...errorState,
                    [e.target.name]: ''
                });
            })
            .catch(err => {
                setErrorState({
                    ...errorState,
                    [e.target.name]: err.errors[0]
                })
            })
    }

    const submitHandler = e => {
        e.preventDefault();

        setUserInput({
            username: '',
            password: ''
        })
    };

    const changeHandler = e => {
        e.persist();
        validator(e);

        let value = e.target.value;
        setUserInput({...userInput, [e.target.name]: value});
    };

    return(
        <div>
            <form onSubmit={submitHandler}>
                <h1>Log In</h1>
                <p>Log in here using your username and password</p>

                <div className="form-input">
                    <label htmlFor="username">
                        {/* Username */}
                        <input
                            type="text"
                            name="username"
                            value={userInput.name}
                            onChange={changeHandler}
                            placeholder="username"
                        />
                        {errorState.username.length > 0 ? (<p className="error">{errorState.username}</p>) : null}
                    </label>

                    <label htmlFor="password">
                        {/* Password */}
                        <input
                            type="password"
                            name="password"
                            value={userInput.password}
                            onChange={changeHandler}
                            placeholder="password"
                        />
                        {errorState.password.length > 0 ? (<p className="error">{errorState.password}</p>) : null}
                    </label>
                </div>
                <button disabled={buttonDisabled}>Log In</button>
            </form>
            <button>Sign Up</button>
        </div>
    )
}

export default Login;