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
    position: '',
    resume: null,
    phone_number: '',
}

function UserProfile({cancel}) {
  const { profile } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth)
  const picture = useRef(url+profile.profile_pic)
  const [newProfile, setNewProfile] = useState(profile || emptyState);
  const [errors, setErrors] = useState({})
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
      if (!userProfile[key] && key !== 'bio') {
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
      .then(async(response) => {
        const data = await response.json()
        if (response.status === 200){
            dispatch(updateProfile(data));
            setErrors({})
            setNewProfile(emptyState);
            cancel()
        } else {
            setErrors(data)
        }
      })
      .catch((error) => console.log('Error updating profile:', error));
  };


  return (
    <div className="shadow-md rounded-md bg-white p-4">
      <div className='flex  mb-3'>
        <h2 className="text-lg font-bold mb-4 flex-1 ">UserProfile</h2>
      </div>
      <form onSubmit={handleUpdateProfile}>
      <p className='block text-sm font-medium mb-2'>Profile Picture</p>
        <div className="flex items-center justify-center w-full">
            <label htmlFor="profile_pic" className="flex flex-col items-center justify-center w-full sm:w-6/12  h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-100  hover:bg-gray-500 ">
      {picture.current ? (
          <img
          src={picture.current}
          alt="user pic"
          className="w-40 h-40 rounded-full object-cover"
          />) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
        </div>)}
      <input
      type="file"
      id="profile_pic"
      name="profile_pic"
      onChange={handleFileChange}
      className="hidden"
      accept="image/png, image/jpeg, image/jpg" 
      />
    </label>
</div>
        <div className="mb-4">
          <label htmlFor="first_name" className="block text-sm font-medium mb-2">
            First Name*
          </label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={newProfile.first_name}
            onChange={handleInputChange}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border rounded-md p-2"
            required
          />
        </div>
        <div className="mb-4">
        <label htmlFor="last_name" className="block text-sm font-medium mb-2">
        Last Name*
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
            className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500  block w-full sm:text-sm border rounded-md p-2
                ${errors?.bio ? 'border-red-500': ''}`}
          />
          {errors?.bio && (<ul className='text-red-500'> {errors.bio.map((err, idx) => 
            <li key={idx}>{err}</li> )}
            </ul>)}
          
        </div>

        <div className="mb-4">
          <label htmlFor="position" className="block text-sm font-medium mb-2">
            Position
          </label>
          <input
            type="text"
            id="position"
            name="position"
            value={newProfile.position ? newProfile.position: ''}
            onChange={handleInputChange}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border rounded-md p-2"
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
            className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600"
            accept=".pdf, .docx" 
         />
        </div>
        <div className="mb-4">
         <PhoneInput
          placeholder="Enter phone number"
          value={newProfile.phone_number? newProfile.phone_number: ""}
          onChange={value => handlePhone(value)}
        />
          {errors?.phone_number && (<ul className='text-red-500'> {errors.phone_number.map((err, idx) => 
            <li key={idx}>{err}</li> )}
            </ul>)}
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
