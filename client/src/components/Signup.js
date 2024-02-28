import React, { useState } from 'react';
import { url } from '../utils/backend';
import toast, { Toaster } from 'react-hot-toast';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [errors, setErrors] = useState(null)//{username: '', email: '', password1: '', password2: ''});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    const res = await fetch(`${url}/auth/registration/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, email, password1, password2, first_name: firstName, last_name: lastName})
    });
    if (res.status === 204 || res.status === 201) {
       toast(`Confirmation Email has been sent to ${email}. please verify you account to contiue`)
    }  else {
        const data = await res.json();
        setErrors(data);
    }
        
  }
        
    return (
    <div className="container mx-auto max-w-md mt-10">
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md sm:text-sm border border-gray-300 p-2.5
                ${errors?.password1 ? 'border-red-500': ''}`}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md sm:text-sm border border-gray-300 p-2.5
                ${errors?.email ? 'border-red-500': ''}`}
          />
        {errors?.email && <ul className='text-red-500'> {errors.email.map((err, idx) => 
            <li key={idx}>{err}</li> )}
            </ul>
        }

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
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
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
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md sm:text-sm border border-gray-300 p-2.5
            ${password2 && password2 !== password1 ? 'border-red-500': ''}`}
          />
          {password2 && password2 !== password1 && <ul><li className='text-red-500'>Passwords doesn't match</li></ul> }
        </div>

        <div>
          <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            autoComplete="firstname"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md sm:text-sm border border-gray-300 p-2.5'
          />
        </div>
        
        <div>
          <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            autoComplete="lastname"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md sm:text-sm border border-gray-300 p-2.5'
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Sign up
        </button>
      </form>
    </div>
  );
}

export default Signup;
