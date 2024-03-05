import React, { useState } from 'react';
import { url } from '../utils/backend';
import toast, { Toaster } from 'react-hot-toast';

const emptyState = {
    username: '',
    email: '',
    password1: '',
    password2: '',
    first_name: '',
    last_name: '',
}
function Signup() {
  const [user, setUser] = useState(emptyState)
  const [errors, setErrors] = useState(null)
  const handleSubmit = async(e) => {
    e.preventDefault();
    const res = await fetch(`${url}/auth/signup/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    if (res.status === 204 || res.status === 201) {
       toast(`Confirmation Email has been sent to ${user.email}. please verify you account to contiue`)
       setUser(emptyState)
       
    }  else {
        const data = await res.json();
        setErrors(data);
    }
        
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

        
    return (
    <div className="container mx-auto max-w-md mt-10 mb-4 p-4 bg-white shadow border border-indigo-100">
    <Toaster />
      <h1 className="text-3xl font-bold text-center mb-4">Sign Up</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            autoComplete="username"
            required
            value={user.username}
            onChange={handleInputChange}
            className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md sm:text-sm border border-gray-300 p-2.5
                ${errors?.username ? 'border-red-500': ''}`}
          />
          {errors?.username && <ul className='text-red-500'> {errors.username.map((err, idx) => 
            <li key={idx}>{err}</li> )}
            </ul>
          }
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            required
            value={user.email}
            onChange={handleInputChange}
            className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md sm:text-sm border border-gray-300 p-2.5
                ${errors?.email ? 'border-red-500': ''}`}
          />
        {errors?.email && <ul className='text-red-500'> {errors.email.map((err, idx) => 
            <li key={idx}>{err}</li> )}
            </ul>
        }

        </div>
        <div>
          <label htmlFor="password1" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password1"
            name="password1"
            autoComplete="current-password"
            required
            value={user.password1}
            onChange={handleInputChange}
            className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md sm:text-sm border border-gray-300 p-2.5
                 ${errors?.password1 ? 'border-red-500': ''}`}
          />
          {errors?.password1 && <ul className='text-red-500'> {errors.password1.map((err, idx) => 
            <li key={idx}>{err}</li> )}
            </ul>
        }
        </div>
        <div>
          <label htmlFor="password2" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            id="password2"
            name="password2"
            autoComplete="current-password"
            required
            value={user.password2}
            onChange={handleInputChange}
            className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md sm:text-sm border border-gray-300 p-2.5
            ${user.password2 && user.password2 !== user.password1 ? 'border-red-500': ''}`}
          />
          {user.password2 && user.password2 !== user.password1 && <ul><li className='text-red-500'>Passwords doesn't match</li></ul> }
        </div>

        <div>
          <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            autoComplete="first_name"
            required
            value={user.first_name}
            onChange={handleInputChange}
            className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md sm:text-sm border border-gray-300 p-2.5'
          />
        </div>
        
        <div>
          <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            autoComplete="last_name"
            required
            value={user.last_name}
            onChange={handleInputChange}
            className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md sm:text-sm border border-gray-300 p-2.5'
          />
        </div>
        <button
          type="submit"
          className="mx-auto flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Sign up
        </button>
      </form>
    </div>
  );
}

export default Signup;
