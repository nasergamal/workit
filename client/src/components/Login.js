import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { LoginUser, setProfile } from "../redux/actionCreator";
import { url } from '../utils/backend'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogin = async (e) => {
        e.preventDefault()
        
        const res = await fetch(`${url}/auth/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        body: JSON.stringify({email: email, password: password })
        });
        let data = await res.json();
        if (res.status === 200) {
            localStorage.setItem('authTokens', JSON.stringify(data.key));
            dispatch(LoginUser(data.key))
            navigate('/')
        } else {
            if (data?.non_field_errors[0] === "Unable to log in with provided credentials.") {
              setError('Email or password is invalid')
            } else {
              setError(data?.non_field_errors[0])
            }
        }
    }

    return (
    <div className="container mx-auto max-w-md mt-10">
      <h1 className="text-3xl font-bold text-center mb-4">Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md sm:text-sm border border-gray-300 p-2.5"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md sm:text-sm border border-gray-300 p-2.5"
          />
        </div>
        {error && (
          <div className="text-red-500 text-sm mt-2">{error}</div>
        )}
        <button
          type="submit"
          className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign in
        </button>
      </form>
    <p className="pt-10 text-center"> Not registerd? <Link to='/signup' className="underline text-blue-600 hover:text-blue-800"> Signup </Link></p>
    </div>
  );
}


export default Login;
