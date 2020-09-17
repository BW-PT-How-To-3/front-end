import React from 'react';

function Login() {

    return(
        <div>
            <form onSubmit={null}>
                <h1>Login</h1>
                <p>Login here using your username and password</p>

                <label htmlFor="username">
                    <input
                        type="text"
                        name="username"
                        value=""
                        onChange=""
                        placeholder="@username"
                    />
                </label>

                <label htmlFor="password">
                    <input
                        type="password"
                        name="password"
                        value=""
                        onChange=""
                    />
                </label>
            </form>
        </div>
    )
}

export default Login;