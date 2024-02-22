import { useSelector, useDispatch } from 'react-redux';
import { useState, useRef} from 'react';
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { updateProfile } from '../../redux/actionCreator'; 
import { url } from '../../utils/backend';

const emptyState = {
    first_name: '',
    last_name: '',
    profile_pic: null,
    bio: '',
    resume: null,
    phone_number: '',
}

function UserProfile({cancel}) {
  const { profile } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth)
  const picture = useRef(url+profile.profile_pic)
  const [newProfile, setNewProfile] = useState(profile || emptyState);
  const dispatch = useDispatch();

  const handleResumeChange = (event) => {
      const file = event.target.files[0];
      if (file) {
          setNewProfile({ ...newProfile, resume: file });
      }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProfile({ ...newProfile, [name]: value });
  };
  const handlePhone = (val) => {
    setNewProfile({ ...newProfile, phone_number: val});
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) { 
      setNewProfile({ ...newProfile, profile_pic: file})
      const objectUrl = URL.createObjectURL(file);
      
      picture.current = objectUrl
      return () => URL.revokeObjectURL(objectUrl)
    }
  }

  const handleUpdateProfile = (event) => {
    event.preventDefault();
    let userProfile = { ...newProfile };
    if (profile.profile_pic === userProfile.profile_pic) userProfile.profile_pic = null
    if (profile.resume === userProfile.resume) userProfile.resume = null
    //userProfile = Object.entries(userProfile).reduce((a,[k,v]) => (v ? (a[k]=v, a) : a), {})
    const formData = new FormData();
    for (const key in userProfile) {
      if (!userProfile[key]) {
          continue
      } else if (key !== 'profile_pic') { 
        formData.append(key, userProfile[key]);
      } 
      if (key === 'profile_pic') {
          formData.append('profile_pic', userProfile.profile_pic, userProfile.profile_pic.name);
      } 
    }
    fetch(`${url}/api/user/set-profile/`, {
      method: 'PUT',
      body: formData, 
      headers: { 
          'Authorization': 'Token ' + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(updateProfile(data));
        setNewProfile(emptyState);
      })
      .catch((error) => console.error('Error updating profile:', error));
    cancel()
  };


  return (
    <div className="shadow-md rounded-md bg-white p-4">
      <div className='flex  mb-3'>
        <h2 className="text-lg font-bold mb-4 flex-1 ">UserProfile</h2>
      </div>
      <form onSubmit={handleUpdateProfile}>
      <div className="mb-4 flex-inline">
      <label htmlFor="profile_pic" className="block text-sm font-medium mb-2">
      Profile Picture
      </label>
      <div className="flex justify-center">
      <img
      src={picture.current}
      alt="user pic"
      className="w-36 h-36 rounded-full object-cover"
      />
      </div>
      <input
      type="file"
      id="profile_pic"
      name="profile_pic"
      onChange={handleFileChange}
      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 inline  sm:text-sm border rounded-md p-2"
      accept="image/png, image/jpeg image/jpg" 
      />
      </div>
        <div className="mb-4">
          <label htmlFor="first_name" className="block text-sm font-medium mb-2">
            First Name
          </label>
          <input
            type="text"
            id="first_name"
            namee="first_name"
            value={newProfile.first_name}
            onChange={handleInputChange}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border rounded-md p-2"
            required
          />
        </div>
        <div className="mb-4">
        <label htmlFor="last_name" className="block text-sm font-medium mb-2">
        Last Name
        </label>
        <textarea
        type="text"
        id="last_name"
        name="last_name"
        value={newProfile.last_name}
        onChange={handleInputChange}
        rows='5'
        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500  block w-full sm:text-sm border rounded-md p-2"
        required
        />
        </div>
        <div className="mb-4">
          <label htmlFor="bio" className="block text-sm font-medium mb-2">
            Bio
          </label>
          <textarea
            type="text"
            id="bio"
            name="bio"
            value={newProfile.bio? newProfile.bio: ""}
            onChange={handleInputChange}
            rows='5'
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500  block w-full sm:text-sm border rounded-md p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="resume" className="block text-sm font-medium mb-2">
            Resume
          </label>
          <input
            type="file"
            id="resume"
            name="resume"
            onChange={handleResumeChange}
            onClick={e => (e.target.value = null)}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500  block w-full sm:text-sm border rounded-md p-2"
            accept=".pdf, .docx" 
         />
        </div>
        <div className="mb-4">
         <PhoneInput
          placeholder="Enter phone number"
          value={newProfile.phone_number? newProfile.phone_number: ""}
          onChange={value => handlePhone(value)}
        />
        </div>
      <div className='text-center'>
           <button
              type="submit"
              className=" inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Update
            </button>
           <button
              type="button"
              onClick={cancel}
              className=" inline-flex  items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
            Cancel
            </button>
      </div>
      </form>
    </div>
  )
}

export default UserProfile;
