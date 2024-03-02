import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { url } from "../utils/backend";
import Loading from "../utils/Loading";
import { updateProfile } from "../redux/actionCreator";
import toast, { Toaster } from 'react-hot-toast';
import JobApplications from "./JobApplications";


function Job() {
    const {companies, profile, ready} = useSelector((state) => state.user) 
    const [job, setJob] = useState({});
    const {id} = useParams();
    const { token } = useSelector((state) => state.auth)
    const [rdy, setRdy] = useState(false);
    const [appliedUsers, setAppliedUsers] = useState([]);
    const [show ,setShow] = useState(false);
    const dispatch = useDispatch();
    let owned;
    
    useEffect(() => {
        const fetchJob = async() => {
          const response = await fetch(`${url}/api/company/job/get/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token,
                },
          })
          if (response.status === 200 ) {
              let jobData = await response.json();
              setJob(jobData)
              setRdy(true)
          }
        }
        fetchJob()
    }, []) 
    if (companies) {
        owned = companies.map(company => company.pk)
    }

    const applied = async() => {
        const response = await fetch(`${url}/api/company/job/apply/get/${job.pk}`, {
            headers: {
                'Authorization': 'Token ' + token,
            },
        })
        const data = await response.json()
        if (response.status === 200) {
            setAppliedUsers(data);
            setShow(true);
        }
    }

    const apply = async() => {
        const response = await fetch(`${url}/api/company/job/apply/${job.pk}`, {
            headers: {
                'Authorization': 'Token ' + token,
            },
        })
        if (response.status === 200) {

            const profileJobs = [...profile.job_set]
            profileJobs.push(job.pk)
            dispatch(updateProfile({...profile, job_set: profileJobs}))
        }
    }
    const closePosition = async() => {
        const closeJob = {...job}
        closeJob.open = false
        const response = await fetch(`${url}/api/company/job/close/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token,
                },
            body: JSON.stringify({company_id: job.company_id})
          })
        if (response.status === 200) {
            setJob(closeJob);
            toast(`Position Closed`)
        }
    }

    if (!rdy || !ready) {
        return (
         <Loading />
        )
    }

    return (
    <div className="container mx-auto p-4  mt-20 space-y-4 lg:px-52 md:px-25 sm:px-8">
    <Toaster />
    {show ? (<JobApplications cancel={() => setShow(false)} applicants={appliedUsers} />):(
        <>
        <div className='flex  mb-3'>
          <h3 className="text-base font-bold  flex-1">Job Details</h3>
        </div>
        <div className='p-4 shadow bg-white border border-indigo-100 space-y-4'>
            <div className=' py-2  items-end '>
                <div className=' inline-flex items-center'>
                    <h5 className='text-lg'>Position: </h5>
                    <p>{job.position}</p>
                </div>
                <p className="float-end ">Posted: {moment(job.created).format('YYYY-MM-DD')}</p>
            </div>
            <div className="flex items-center">
                <h5 className="text-lg">Company: </h5>
                <Link to={`/company/${job.company_name}`} className='text-indigo-500 hover:text-indigo-600 hover:underline '>{job.company_name} </Link>
            </div>
            <div className="flex items-center">
            <h5 className="text-lg">Expected Salary: </h5>
            <p>{job.salary ? `$${job.salary}`: "Classified"}</p>
            </div>
            <div className="flex items-center">
            <h5 className="text-lg">Estimated experience: </h5>
            <p>{job.experience} </p>
            </div>
        </div>
        <div className='p-4 shadow bg-white border border-indigo-100 space-y-4'>
            <div className="  "> 
            <h5 className="text-lg">Job Description:</h5>
            <p>{job.description} </p>
            </div>
            {job.requirement && (
            <>
              <h5 className="text-lg">Job Requirement:</h5>
              <p>{job.requirement} </p>
            </>)}
        <div className='py-3 flex justify-around'>
        { owned.includes(job.company_id) ? (
            <>
                    { job.open ? (
                    <button 
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                        onClick={closePosition}
                        >Close Position
                    </button>) : (
                    <button
                        className='bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded'
                        disabled
                        >Position Closed
                    </button> ) }
                    <button 
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                        onClick={applied}
                        >view Applicants
                    </button>
            </>):
            <>
            {profile.job_set.includes(job.pk) ? (
            <button
                className='bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded'
                disabled
                >Applied
            </button> ) : job.open ? (
            <button 
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                onClick={apply}
                >Apply
            </button>) : (
            <button
                className='bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded'
                >Position Closed
            </button> ) }
            </>
        }
        </div>
        </div>
        </>)}
      </div>
    
      )

}

export default Job;
