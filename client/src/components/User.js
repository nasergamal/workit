import moment from 'moment';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Profile from './Profile';
import { url } from '../utils/backend';
import Loading from '../utils/Loading';
import {useParams, useNavigate} from 'react-router-dom'

function User() {
    const { ready, profile } = useSelector((state) => state.user )

    const { token } = useSelector((state) => state.auth)
    const { username} = useParams();
    const [rdy, setRdy] = useState(false)
    const [userProfile, setUserProfile] = useState({})
    const [education, setEducation] = useState({})
    const [experience, setExperience] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        if (ready && username === profile.username) {
            navigate('/profile')
        }
        const prepareProfile = async () => {
                const response = await fetch(`${url}/api/user/get/${username}`, {
            method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + token,
                },
            })
            if (response.status === 200) {
                let userData = await response.json();
                //delete userData.userProfile.username
                setUserProfile(userData.profile);
                setEducation(userData.education);
                setExperience(userData.experience);
                setRdy(true)
            } else {
              console.log(response);
            }
        }
        prepareProfile()
    
    }, [ready])

    if (!rdy) {
        return <Loading/>
    }
      return (
    <div className="container mx-auto p-4  space-y-4 lg:px-40 md:px-30 sm:px-25">
      <div className="flex justify-center">
        <img
          src={url + userProfile.profile_pic}
          alt="user pic"
          className="w-48 h-48 rounded-full object-cover"
        />
      </div>

      <div className='flex justify-center'>
          <h2 className="text-3xl flex-1 font-bold text-center">{`${userProfile.first_name} ${userProfile.last_name}`}</h2>
      </div>
      <div className='border-b p-4 bg-white shadow border border-indigo-100'>
        <div className='shadow py-3 ps-2'>
          <h3 className='text-base font-bold inline pe-2'>Email:</h3>
          <p className='inline '>{userProfile.email} </p>
        </div>
        <div className='shadow py-3 ps-2'>
        { userProfile.phone_number? 
        <>
          <h3 className='text-base font-bold  inline'> Phone Number:</h3>
          <p className='inline '>{userProfile.phone_number} </p>
        </>
        : 'No phone number added'}
          </div>
       <div className='shadow py-3 ps-2'>
        <h3 className='text-base font-bold  flex-1'> Bio</h3>
        <p className='md:ps-3 p-4'>{userProfile?.bio ? userProfile.bio : 'No bio added yet'} </p>
      </div>
        <div className='shadow py-3 ps-2 text-center'>
         { userProfile.resume ? <a href={`${url}${userProfile.resume}`} 
                        target="_blank"
                        rel="noreferrer">
             <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Download Cv</button></a>:
             'No CV added for this User'}
        </div>
      </div>
        <div className="border-b p-4 pb-8 bg-white border border-indigo-100 shadow">
        <div className='flex  mb-3'>
          <h3 className="text-base font-bold  flex-1">Experience</h3>
        </div>
        <ul className="space-y-2">
          {experience?.length > 0  ?
            experience.map((experienceItem) => (
          <li key={experienceItem.pk} className='space-x-2 shadow p-4'>
            <div className='flex'>
            <p className='flex-1'>{experienceItem.company_name} - {experienceItem.title}</p>
            </div>
                <p>{moment(experienceItem.start).format('YYYY-MM')} - {experienceItem.end ? moment(experienceItem.end).format('YYYY-MM') : 'Present'}</p>
            <p>Description:</p>
             <p className='px-2'> {experienceItem?.description}</p>
          </li>
            )): 'No experience added'
          }
      </ul>
      </div>
      {/* Education */}
        <div className="border-b p-4 pb-8 bg-white border border-indigo-100 shadow">
        <div className='flex'>
            <h3 className="text-base font-bold mb-2 flex-1">Education</h3>
        </div>
        <ul className="space-y-2">
          {education?.length > 0  ?
            education.map((educationItem) => (
          <li key={educationItem.pk} className='space-x-2 shadow p-4'>
            <div className='flex'>
            <p className='flex-1'>{educationItem.institution} - {educationItem.title}</p>
            </div>
                <p>{moment(educationItem.start).format('YYYY-MM')} - {educationItem.end ? moment(educationItem.end).format('YYYY-MM') : 'Present'}</p>
            <p>Description:</p>
             <p className='px-2'> {educationItem?.description}</p>
          </li>
            )):
              'No education added'
          }
        </ul>
      </div>
    </div>
    
      )

}

export default User;
