import moment from 'moment';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { url } from '../utils/backend';
import Loading from '../utils/Loading';
import AddButton from '../utils/AddButton';
import EditButton from '../utils/EditButton';

function Profile() {
    const { ready, userName, email, profile, education, experience } = useSelector((state) => state.user)
    const [newProfile, setNewProfile] = useState(profile);
    const [newExperience, setNewExperience] = useState({});
    const [newEducation, setNewEducation] = useState({});
    const [editProfile, setEditProfile] = useState(false);
    const [editExperience, setEditExperince] = useState(false);
    const [editEDucation, setEditEducation] = useState(false);
    // data check remove later
    console.log(userName)
    console.log(email)
    console.log(profile)
    console.log(education)
    console.log(experience)

    // loading screen while loading data
    if (!ready) {
        return <Loading/>
    }


      return (
    <div className="container mx-auto p-4  space-y-4">
      {/* Profile picture */}
      <div className="flex justify-center">
        <img
          src={url + '/' +profile.profile_pic}
          alt="Profile Picture"
          className="w-48 h-48 rounded-full object-cover"
        />
      </div>

      {/* Name */}
          <h2 className="text-3xl font-bold text-center">{`${profile.first_name} ${profile.last_name}`}</h2>

      {/* Experience */}
        <div className="border-b p-4 pb-8 lg:mx-40 md:mx-30 sm:mx-25">
        <div className='flex  mb-3'>
          <h3 className="text-base font-bold  flex-1">Experience</h3>
          <Link to='/experience' state={{edit: false, initialState: ''}}> <AddButton location=' '/></Link>
        </div>
        <ul className="space-y-2">
          {experience?.length > 0  ?
            experience.map((experienceItem) => (
          <li key={experienceItem.pk} className='space-x-2 shadow p-4'>
            <div className='flex'>
            <p className='flex-1'>{experienceItem.company_name} - {experienceItem.title}</p>
            <Link to='/experience' className='text-right' state={{edit: true, initialState: experienceItem}}> <EditButton location=' '/></Link>
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
        <div className="border-b p-4 pb-8 lg:mx-40 md:mx-30 sm:mx-25">
        <div className='flex'>
            <h3 className="text-base font-bold mb-2 flex-1">Education</h3>
          <AddButton location=' ' />
        </div>
        <ul className="list-disc space-y-2">
          {education?.length > 0 ? 
            education.map((educationItem) => (
            <li key={educationItem.pk}>{educationItem.institution} - {educationItem.degree} ({educationItem.start} - {educationItem.end})</li>
            )):
              'No education added'
          }
        </ul>
      </div>

    </div>
      )

}

export default Profile;
