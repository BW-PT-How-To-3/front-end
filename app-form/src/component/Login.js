import React, { useState, useEffect } from 'react';
import * as yup from 'yup'; 
import axios from 'axios';

const formSchema = yup.object().shape({
    username: yup.string()
            .required('Username is a required field.'),
    password: yup.string()
            .required('Password is a required field.')
})

function Login() {

    const [userInput, setUserInput] = useState({
        username: '',
        password: ''
    });

     //state for dislaying user info
     const [data, setData] = useState([]);

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

        //reset form once submitted
        setUserInput({
            username: '',
            password: ''
        });

        //ensure user data is being returned
        axios
            .post('https://reqres.in/api/users', userInput)
            .then( res => setData(res))
            .catch( err => console.log(err.res))

        console.log('login successful')
    };

    const changeHandler = e => {
        e.persist();
        validator(e);

        setUserInput({...userInput, [e.target.name]: e.target.value});
    };

    return(
        <div>
            <form onSubmit={submitHandler}>
                <h1>Log In</h1>
                <p>Log in using your username and password</p>

                <div className="form-input">
                    <label htmlFor="username">
                        Username
                        {errorState.username.length > 0 ? (<p className="error">{errorState.username}</p>) : null}
                    </label><br/>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={userInput.username}
                        onChange={changeHandler}
                        placeholder="username"
                    />

                    <label htmlFor="password">Password
                        {errorState.password.length > 0 ? (<p className="error">{errorState.password}</p>) : null}
                    </label><br/>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={userInput.password}
                        onChange={changeHandler}
                        placeholder="password"
                    />
                </div>
                <button disabled={buttonDisabled}>Log In</button>
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </form>
            <p>Don't have an account?</p>
        </div>
    )
}

export default Login;