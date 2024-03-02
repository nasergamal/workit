import { url } from "../utils/backend";
import { Link } from 'react-router-dom';

function JobApplications({applicants, cancel}) {
    const count = applicants.length;
    return (
        <>
        <button 
            className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'
            onClick={cancel}
            >Return</button>
        {count > 0 ? (
            <>
            <h3 className="font-bold text-lg">{count} application{count > 1 && 's'}</h3>
            <ul className="">
            {applicants.map((user) => (
            <Link to={`/user/${user.username}`}>
            <li key={user.pk} className='space-x-5 mb-4 shadow p-4 bg-white border border-indigo-100'>
              <div className='inline-flex'>
                <div className="flex justify-start pe-2 me-2 border-black border-e">
                <img
                    src={url + '/' +user.profile_pic}
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover"
                />
              </div>
              <div className='='>
                 <p className=''>{user.first_name} {user.last_name}</p>
                 <p className=''> {user?.bio}</p>
              </div>
              </div>
            </li>
            </Link> ))}
            </ul>
            </>
        ) : (
         <div className='text-center shadow py-4 bg-white border border-indigo-100'>
                <h1 className='text-bold text-3xl'>no applicants </h1>
            </div>)}
        </>
    )
}


export default JobApplications;
