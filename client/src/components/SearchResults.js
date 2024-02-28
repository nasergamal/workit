import moment from 'moment';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom'
import { url } from '../utils/backend';
import Loading from '../utils/Loading';

function SearchResults() {
    const [searchParams] = useSearchParams();
    const [rdy, setRdy] = useState(false);
    const [users, setUsers] = useState(false);
    const [jobs, setJobs] = useState(false);
    const [companies, setCompanies] = useState(false);
    const [result, setResult] = useState('none')
    const [searchResults, setSearchResults] = useState({});
    const {token} = useSelector((state) => state.auth)
    const {ready} = useSelector((state) => state.user)
    const param = searchParams.get('q')
    useEffect(() => {
        setRdy(false)
        if (param) {
          const searchUrl = url + '/api/user/search/?q=' + param

          fetch(searchUrl, { 
            method: 'GET',
            headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + token,
                },
          })
            .then((response) => response.json())
            .then(async (data) => {
                setSearchResults(data);
            })
            .catch((error) => console.error('Error fetching search results:', error));
        } else {
         
        }
    }, [param])

    useEffect(() => { 
        if (Object.keys(searchResults).length > 0) {
            setUsers(searchResults.users.length > 0)
            setJobs(searchResults.jobs.length > 0)
            setCompanies(searchResults.companies.length > 0)
            if (searchResults.jobs.length > 0) {
                setResult('job')
            } else if (searchResults.companies.length > 0) {
                setResult('company')
            } else if (searchResults.users.length > 0) {
                setResult('user')
            } else {
                setResult('none')
            }
            setRdy(true)
        }
    }, [searchResults])

    if (!rdy || !ready) {
        return (
        <div>
            <Loading />
        </div>
        )
    }
    return (
        <div className="pt-20 space-y-4 xl:px-80 lg:px-52 md:px-40 sm:px-25 px-10" >
        {result === 'none' ? (
                    <div className='bg-zinc-100 text-center shadow py-4'>
                      <h1 className='text-bold text-3xl'>No match found</h1>
                    </div>) : (
            <>
            <div className='flex'>
            {jobs && (
                <button 
                className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'
                onClick={() => setResult('job')}
                >Jobs</button>)}
            {users && (
                <button className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'
                onClick={() => setResult('user')}
                >Users </button>)}
            {companies && (
                <button 
                className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'
                onClick={() => setResult('company')}
                >Companies</button>)}
            </div>
            {result === 'user' ? (
                <>
                    <h3 className="font-bold text-lg">People</h3>
                    <ul className="">
                    {users ? (searchResults.users.map((item) => (
                        <Link to={`/user/${item.username}`}>
                        <li key={item.pk} className='space-x-5 mb-4 shadow p-4 bg-zinc-100'>
                          <div className='inline-flex'>
                            <div className="flex justify-start pe-2 me-2 border-black border-e">
                            <img
                                src={url + '/' +item.profile_pic}
                                alt="Profile"
                                className="w-12 h-12 rounded-full object-cover"
                            />
                          </div>
                          <div className='='>
                             <p className=''>{item.first_name} {item.last_name}</p>
                             <p className=''> {item?.bio}</p>
                          </div>
                          </div>
                        </li>
                        </Link> ))) : 'No Results found'}
                    </ul>
                </> ) : result === 'job' ?(
                <>
                    <h3 className="font-bold text-lg">Jobs</h3>
                    <ul className="">
                    {jobs ? (searchResults.jobs.filter(job => job.open).map((job) => (
                        <Link to={`/company/${job.company_name}/job/${job.pk}`}>
                        <li key={job.pk} className='space-x-5 mb-4 shadow p-4 bg-zinc-100'>
                            <div className='flex'>
                            <p className='flex-1 pb-4'>Position: {job.position} </p>
                            <p>Posted: {moment(job.created).format('YYYY-MM-DD')}</p>
                            </div>
                            <div className="flex items-center">
                                <h5 className="text-base pe-2">Expected salary: </h5>
                                <p>{job.salary ? `${job.currency ? job.currency : ''} ${job.salary}`: "  Classified"}</p>
                            </div>
                            <div className="inline-flex items-center">
                                <h5 className="text-base pe-2">Estimated experience: </h5>
                                <p>{job.experience} </p>
                            </div>
                        </li>
                        </Link> ))) : 'No Results found'}
                    </ul>
                </>       
                ): result === 'company' ? (
                <>
                    <h3 className="font-bold text-lg">Companies</h3>
                    <ul className="">
                    {users ? (searchResults.companies.map((item) => (
                        <Link to={`/company/${item.name}`}>
                        <li key={item.pk} className='space-x-5 mb-4 shadow p-4 bg-zinc-100'>
                          <div className='inline-flex'>
                            <div className="flex justify-start pe-2 me-2 border-black border-e">
                            <img
                                src={url + '/' +item.logo}
                                alt="Profile"
                                className="w-12 h-12 rounded-full object-cover"
                            />
                          </div>
                          <div className='='>
                             <p className=''>{item.name}</p>
                             <p className=''> {item.industry}</p>
                          </div>
                          </div>
                        </li>
                        </Link> ))) : 'No Results found'}
                    </ul>
                </> ) : (
                    <div className='bg-zinc-100 text-center shadow py-4'>
                        <h1 className='text-bold text-3xl'>No match found</h1>
                    </div>)}

            </>)}
        </div>
    )

}

export default SearchResults;
