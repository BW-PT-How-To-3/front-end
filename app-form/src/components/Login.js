import React, { useState } from 'react';

function Login() {

    const [userInput, setUserInput] = useState({
        name: '',
        password: ''
    });

    const submitHandler = e => {
        e.preventDefault();

        setUserInput({
            name: '',
            password: ''
        })
    }

    const changeHandler = e => {
        e.persist();
        // setUserInput({...userInput, [e.target.name]: value});
    }

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
                    </label>
                </div>
                <button>Log In</button>
            </form>
            <button>Sign Up</button>
        </div>
    )
}

export default Login;