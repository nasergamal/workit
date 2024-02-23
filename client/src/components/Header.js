import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import SearchBar from './SearchBar';
import { LogoutUser, unsetProfile, setProfile } from '../redux/actionCreator';
import { url } from '../utils/backend';

const Header = () => {
    const {isAuthenticated, token} = useSelector((state) => state.auth)
    const {ready, userName, profile} = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleMenuToggle = () => {
    setIsOpen(!isOpen);
    };


    const prepareProfile = async () => {
            const response = await fetch(`${url}/api/user/me/`, {
        method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token,
            },
        })
        if (response.status === 200) {
            let userData = await response.json();
            //delete userData.profile.username
            const payload = {
                userName: userData.username,
                email: userData.email,
                profile: userData.profile,
                education: userData.education ? userData.education : {},
                experience: userData.experience? userData.experience : {},
            }
            dispatch(setProfile(payload)) 
        } else {
          console.log(response);
            }
    }

    useEffect(() => {
        if (isAuthenticated && !ready) {
            prepareProfile();
        } else if (!isAuthenticated && ready) {
            dispatch(unsetProfile())
        }
    }, [isAuthenticated])

    const logoutHandler = async () => {
        await fetch(`${url}/auth/logout/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
      localStorage.removeItem('authTokens')
      dispatch(LogoutUser());
      dispatch(unsetProfile());
      navigate('/')
  }
      
  return (
    <header className="bg-gray-800 text-white px-4 py-5 items-center">
      <nav className="space-x-1 flex flex-grow justify-between items-center">
      <Link to='/' className="text-2xl font-bold ">Workit</Link>
      <SearchBar />
      <div className='space-x-5 md:space-x-10 inline-flex'>
        <Link to='/' className="hover:text-gray-200">Home</Link>
        <Link to='/' className="hover:text-gray-200">About</Link>
        {isAuthenticated ? 
            <div className="relative text-left">
      <button
        onClick={handleMenuToggle}
        type="button"
        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Me
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className=" text-center absolute z-10 right-0 mt-2 w-56 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <Link
            to="/profile"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            role="menuitem"
            tabIndex="-1"
            id="menu-item-0"
          >
            <div className="flex justify-center">
            <img
                src={url + '/' +profile.profile_pic}
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover"
            />
            </div>
            {userName}<br/>
            View Profile
          </Link>
          <p
            onClick={logoutHandler}
            className="block px-4 py-2 text-sm text-red-500 hover:bg-red-100"
            role="menuitem"
            tabIndex="-1"
            id="menu-item-1"
          >
            Logout
          </p>
        </div>
      )}
    </div>:
            <Link to='/login' className='hover:text-gray-200'>Login</Link>
        }
      </div>
      </nav>
    </header>
  );
};

export default Header;
