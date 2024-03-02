import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom'
import { url } from '../utils/backend';
import Loading from '../utils/Loading';
import PaginateItems from '../utils/PaginateItems';
import SearchCompanyMap from './paginationComponents/SearchCompanyMap';
import SearchJobsMap from './paginationComponents/SearchJobsMap';
import SearchUsersMap from './paginationComponents/SearchUsersMap';

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
                    <div className='bg-white border border-indigo-100 text-center shadow py-4'>
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
                    {users ? (
                        <PaginateItems itemsPerPage={10} items={searchResults.users}
                                       ListItems={SearchUsersMap} />
                    ) : 'No Results found'}
                    </ul>
                </> ) : result === 'job' ?(
                <>
                    <h3 className="font-bold text-lg">Jobs</h3>
                    <ul className="">
                    {jobs ? (
                        <PaginateItems itemsPerPage={10} items={searchResults.jobs.filter(job => job.open)}
                                       ListItems={SearchJobsMap} />
                        ) : 'No Results found'}
                    </ul>
                </>       
                ): result === 'company' ? (
                <>
                    <h3 className="font-bold text-lg">Companies</h3>
                    <ul className="">
                    {companies ? (
                        <PaginateItems itemsPerPage={10} items={searchResults.companies}
                                       ListItems={SearchCompanyMap} />
                        ) : 'No Results found'}
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
