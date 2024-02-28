import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { url } from "../utils/backend";
import Loading from "../utils/Loading";
import EditButton from "../utils/EditButton";
import AddButton from "../utils/AddButton";
import CompanyForm from "./CompanyForm";
import JobForm from "./JobForm";


function Company() {
    const { userName } = useSelector((state) => state.user) 
    const { token } = useSelector((state) => state.auth)
    const { companyName } = useParams();
    const [company, setCompany] = useState({});
    const [show, setShow] = useState(false) //separate panel for jobs
    const [ready, setReady] = useState(false)
    const [editCompany, setEditCompany] = useState(false) // if user is owner add edit button
    const [edit, setEdit] = useState(false) // to render either the company profile or editing format
    const [ add, setAdd ] = useState(false)
    const [newCompany, setNewCompany] = useState({})
    useEffect(() => {
   /*     if (userName === company.username) {
            setEditCompany(true)
        }*/
        const fetchCompany = async() => {
          const response = await fetch(`${url}/api/company/get/${companyName}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token,
                },
          })
          if (response.status === 200 ) {
              let companyData = await response.json();
              setCompany(companyData)
              const {jobs, ...cmp} = company;
              setNewCompany(cmp);
              setReady(true)
          }
        }
        fetchCompany()
    }, []) 

    useEffect(() => {
        if (userName === company.user_username) {
            setEditCompany(true)
        }
    }, [company])


    if (!ready) {
        return <Loading />
    }

    return (
    <>
        {edit ? <CompanyForm cancel={() => setEdit(false)}  edit={true} initialState={newCompany}/> : add ? (
                <JobForm cancel={() => setAdd(false)} pk={company.pk} />) :  (
    <div className="container mx-auto p-4 pt-20 space-y-4 lg:px-40 md:px-30 sm:px-25">
      <div className=" justify-center p-4 shadow bg-zinc-100">
        <img
          src={url + company.logo}
          alt="company logo"
          className="w-48 h-48 rounded-full object-cover"
        />
        {editCompany &&
            <div className="float-end">
                <EditButton act={() => setEdit(true)}/>
            </div>
        }
          <h2 className="text-3xl font-bold">{company.name}</h2>
          <h4 className="text-lg ">{company.industry} - {company.address} </h4>
      </div>
      <div className=" shadow bg-zinc-100 p-4">
        <h3 className="text-2xl font-bold">About</h3>
        {company.about}
      </div>
        <div className="border-b p-4 pb-8  shadowi bg-zinc-100">
        <div className='flex  mb-3'>
          <h3 className="text-base font-bold  flex-1">Jobs</h3>
            {editCompany &&
            <div className="float-end">
                <AddButton act={() => setAdd(true)}/>
            </div>
        }

        </div>
        <ul className="space-y-2">
          {company.jobs?.length > 0  ?
            company.jobs.map((job) => (
          <li key={job.pk} className=' shadow p-4 pb-8 bg-white space-y-2'>
            <div className='flex'>
            <p className='flex-1 pb-2'>Position: {job.position} </p>
            <p>Posted: {moment(job.created).format('YYYY-MM-DD')}</p>
            </div>
            <div className="flex items-end">
                <h5 className="text-base pe-2">Expected salary: </h5>
                <p>{job.salary ? `${job.currency ? job.currency : ''} ${job.salary}`: "  Classified"}</p>
            </div>
            <div className="inline-flex items-end">
                <h5 className="text-base pe-2">Estimated experience: </h5>
                <p>{job.experience} </p>
            </div>
            <div className="">Application: {job.open? 'open': 'closed'}
            <Link to={`/company/${job.company_name}/job/${job.pk}`} className='float-right bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>view
            </Link></div>
            </li>
            )): 'No Jobs posted'}
        </ul>
      </div>
    </div>
        )}
    </>
      )


}

export default Company
