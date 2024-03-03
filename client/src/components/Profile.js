import moment from 'moment';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { url } from '../utils/backend';
import UserProfile from './profileComponents/UserProfile';
import Experience from './profileComponents/Experience';
import Education from './profileComponents/Education';
import Loading from '../utils/Loading';
import AddButton from '../utils/AddButton';
import EditButton from '../utils/EditButton';

function Profile() {
    const { ready, profile, education, experience } = useSelector((state) => state.user)
    const [editProfile, setEditProfile] = useState(false);
    const [editExperience, setEditExperience] = useState(false);
    const [newEducation, setNewEducation] = useState({});
    const [newExperience, setNewExperience] = useState({});
    const [editEducation, setEditEducation] = useState(false);
    const [edit, setEdit] = useState(false);

    // loading screen while loading data
    if (!ready) {
        return <Loading/>
    }
      return (
    <div className="container mx-auto p-4 mb-4 space-y-4 lg:px-40 md:px-30 sm:px-25">
    {editProfile ? (
        <UserProfile cancel={() => setEditProfile(false)}/>): 
     editExperience ? (<Experience cancel={() => {setEditExperience(false)
                                                    setNewExperience({})} }
                                    edit={edit} initialState={newExperience}/> ):
     editEducation ? (<Education cancel={() => {setEditEducation(false)
                                                setNewEducation({})}}
                                    edit={edit} initialState={newEducation}/>): 
    (
    <>
        <EditButton act={() => setEditProfile(true)} location="text-right"/>
      <div className="flex justify-center">
        <img
          src={url + profile.profile_pic}
          alt="user pic"
          className="w-48 h-48 rounded-full object-cover"
        />
      </div>

      <div className='flex justify-center'>
          <h2 className="text-3xl flex-1 font-bold text-center">{`${profile.first_name} ${profile.last_name}`}</h2>
      </div>
      <div className='border border-indigo-100 p-4 bg-white shadow'>
        <div className='shadow py-3 ps-2'>
          <h3 className='text-base font-bold inline pe-2'>Email:</h3>
          <p className='inline '>{ profile.email} </p>
        </div>
        <div className='shadow py-3 ps-2'>
          <h3 className='text-base font-bold inline pe-2'>Phone Number:</h3>
        { profile.phone_number? 
          <p className='inline '>{profile.phone_number} </p>
        : 'No phone number added'}
        </div>
        { profile.position && (
        <div className='shadow py-3 ps-2'>
          <h3 className='text-base font-bold inline pe-2'>Position:</h3>
          <p className='inline '>{profile.position} </p>
        </div>)}

       <div className='shadow py-3 ps-2'>
        <h3 className='text-base font-bold  flex-1'>Bio</h3>
        <p className='md:ps-3 p-4'>{profile?.bio ? profile.bio : 'No bio added yet'} </p>
      </div>
        <div className='shadow py-3 ps-2 text-center'>
         { profile.resume ? <a href={`${url}${profile.resume}`} 
                        target="_blank"
                        rel="noreferrer">
             <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Download Cv</button></a>:
             'No CV added for this User'}
        </div>
      </div>
        <div className="border border-indigo-100 p-4 pb-8 bg-white shadow">
        <div className='flex  mb-3'>
          <h3 className="text-base font-bold  flex-1">Experience</h3>
          <AddButton  act={() => {setEditExperience(true)
                                    setNewExperience({})
                                    setEdit(false)}}/>
        </div>
        <ul className="space-y-2">
          {experience?.length > 0  ?
            experience.map((experienceItem) => (
          <li key={experienceItem.pk} className='space-x-2 shadow p-4'>
            <div className='flex'>
            <p className='flex-1'>{experienceItem.company_name} - {experienceItem.title}</p>
            <EditButton act={() => {setEditExperience(true)
                                    setNewExperience(experienceItem)
                                    setEdit(true)}}/>
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
        <div className="border border-indigo-100 p-4 pb-8 bg-white shadow">
        <div className='flex'>
            <h3 className="text-base font-bold mb-2 flex-1">Education</h3>
        <AddButton act={() => {setEditEducation(true)
                               setNewEducation({})
                               setEdit(false)}}/>
        </div>
        <ul className="space-y-2">
          {education?.length > 0  ?
            education.map((educationItem) => (
          <li key={educationItem.pk} className='space-x-2 shadow p-4'>
            <div className='flex'>
            <p className='flex-1'>{educationItem.institution} - {educationItem.title}</p>
            <EditButton act={() => {setEditEducation(true)
                                    setNewEducation(educationItem)
                                    setEdit(true)}}/>
            </div>
                <p>{moment(educationItem.start).format('YYYY-MM')} - {moment(educationItem.end).format('YYYY-MM')}</p>
            <p>Description:</p>
             <p className='px-2'> {educationItem?.description}</p>
            { educationItem.activites && (
            <>
                <p>Activies:</p>
                 <p className='px-2'> {educationItem?.activites}</p>
            </>
            )}
          </li>
            )):
              'No education added'
          }
        </ul>
      </div>
    </>)} 
    </div>
    
      )

}

export default Profile;
