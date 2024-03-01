import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { url } from "../utils/backend";
import Loading from "../utils/Loading";
import EditButton from "../utils/EditButton";
import AddButton from "../utils/AddButton";
import CompanyForm from "./CompanyForm";
import JobForm from "./JobForm";
import CompanyJobsListing from "./paginationComponents/CompanyJobsListing";
import PaginateItems from "../utils/PaginateItems";


function Company() {
    const { userName } = useSelector((state) => state.user) 
    const { token } = useSelector((state) => state.auth)
    const { companyName } = useParams();
    const [company, setCompany] = useState({});
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
              const {jobs, ...cmp} = companyData;
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
    console.log(newCompany)


    if (!ready) {
        return <Loading />
    }

    return (
    <>
        {edit ? <CompanyForm cancel={() => setEdit(false)}  edit={true} initialState={newCompany}/> : add ? (
                <JobForm cancel={() => setAdd(false)} pk={company.pk} />) :  (
    <div className="container mx-auto p-4 pt-20 space-y-4 lg:px-40 md:px-30 sm:px-25">
      <div className=" justify-center p-4 shadow bg-white border border-indigo-100">
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
      <div className=" shadow bg-white border border-indigo-100 p-4">
        <h3 className="text-2xl font-bold">About</h3>
        {company.about}
      </div>
        <div className="border-b p-4 pb-8  bg-white border border-indigo-100">
        <div className='flex  mb-3'>
          <h3 className="text-base font-bold  flex-1">Jobs</h3>
            {editCompany &&
            <div className="float-end">
                <AddButton act={() => setAdd(true)}/>
            </div>
        }

        </div>
        <ul className="space-y-2">
            {company.jobs?.length > 0  ?(
            <PaginateItems ListItems={CompanyJobsListing} itemsPerPage={10} items={company.jobs} />) : (
            <div className='bg-zinc-100 text-center shadow py-4'>
                <h1 className='text-bold text-3xl'>No job posted yet</h1>
            </div>)}
        </ul>
      </div>
    </div>
        )}
    </>
      )


}

export default Company
