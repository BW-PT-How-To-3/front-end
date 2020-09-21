import React, { useState, useEffect } from 'react';
import * as yup from 'yup'; 
import axios from 'axios';
import { TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';

//comp
import PasswordToggle from './PasswordToggle';

const formSchema = yup.object().shape({
    email: yup.string()
            .required('Required'),
    username: yup.string()
            .required('Required'),
    password: yup.string()
            .required('Required')
            .test('len', 'Password must be more than 5 characters long.', val => val.length > 5),
    legal: yup.boolean()
            .oneOf([true], "Must agree to Terms of Use and Privacy Policy.")
});


function Signup(){

    const styles = {
        links: {
            textDecoration: 'none',
            color: '#4FD1C5',
            cursor: 'pointer'
        }
    }

    const [passwordInputType, ToggleIcon] = PasswordToggle();

    const [data, setData] = useState([]);

    const [userInput, setUserInput] = useState({
        email: '',
        username:'',
        password: '',
        legal: false
    });

    const [errorState, setErrorState] = useState({
        email: '',
        username: '',
        password: '',
        legal: ''
    });

    const [buttonDisabled, setButtonDisabled] = useState(true);
    useEffect(() => {
        formSchema.isValid(userInput).then(valid => {
          setButtonDisabled(!valid);
        });
    }, [userInput]);

    const validator = (e) => {
        yup
            .reach(formSchema, e.target.name)
            .validate(e.target.value)
            .then(valid => {
                setErrorState({
                    ...errorState,
                    [e.target.name]: ''
                });
            })
            .catch(err => {
                setErrorState({
                    ...errorState,
                    [e.target.name]: err.errors[0]
                });
            });
    };

    const submitHandler = e => {
        e.preventDefault();

        //reset form once submitted
        setUserInput({
            email: '',
            username: '',
            password: '',
            legal: false
        });

        axios
            .post(`https://reqres.in/api/users`, userInput)
            .then( res => setData(res))
            .catch(err => console.log(err.res))
        console.log('login successful')
    };

    const changeHandler = e => {
        e.persist();
        validator(e);
        let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setUserInput({...userInput, [e.target.name]: value});
    };

    return (
        <div className="signup-div">
            <div>
                <div className="form-info">
                    <h1 className="app-bar">Get started with your account</h1>
                    {/* <p>Find your next project. Engange your followers. <br/>Build your brand.
                        Do it all with ToDo List.
                    </p> */}
                    <p className="member-login">Already have an account? <Link to="/" style={styles.links}>Log in</Link></p>
                    <div className="form-input-login">
                        <form onSubmit={submitHandler}>

                                <label htmlFor="email"></label><br/>
                                <TextField
                                    id="standard-basic" 
                                    label="Email"
                                    type="text"
                                    name="email"
                                    value={userInput.email}
                                    onChange={changeHandler}
                                    fullWidth
                                    // required
                                    helperText={errorState.email.length > 0 ? (<p className="error">{errorState.email}</p>) : null}
                                /><br/>
                            
                                <label htmlFor="username"></label><br/>
                                <TextField
                                    id="standard-basic"
                                    label="Username"
                                    type="text"
                                    name="username"
                                    value={userInput.username}
                                    onChange={changeHandler}
                                    fullWidth
                                    helperText={errorState.username.length > 0 ? (<p className="error helperText">{errorState.username}</p>) : null}
                                /><br/>

                                <label htmlFor="password"></label><br/>
                                <TextField
                                    id="standard-basic"
                                    label="Password"
                                    type={passwordInputType}
                                    name="password"
                                    value={userInput.password}
                                    onChange={changeHandler}
                                    fullWidth
                                    helperText={errorState.password.length > 0 ? (<p className="error">{errorState.password}</p>) : null && errorState.password > 0 ? (<p className="error">{errorState.password}</p>) : null}
                                    
                                />
                                <span className="password-icon-signup">{ToggleIcon}</span>
                            
                            <div className="legal">
                                <label htmlFor="legal">
                                    <input
                                            type="checkbox"
                                            id="legal"
                                            name="legal"
                                            checked={userInput.legal}
                                            onChange={changeHandler}
                                    />
                                    I agree to the <span style={styles.links}>Terms of Use</span> and <span style={styles.links}>Privacy Policy</span>.
                                </label>
                            </div>
                            <button disabled={buttonDisabled} className="signup-btn">GET STARTED!</button>
                            {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
                        </form>
                    </div>
                </div>
            </div>
            <div className="form-graphics">
                <p>Find your next project.<br/>Engange your followers.<br/>
                    Do it all with <span>HowTo</span>.
                </p>
            </div>
        </div>
    )
}

export default Signup;