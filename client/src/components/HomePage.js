import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { url } from '../utils/backend';
import Loading from '../utils/Loading';
import PaginateItems from '../utils/PaginateItems';
import ListJobs from './ListJobs';

const HomePage = () => {
  const [ jobs, setJobs] = useState([]);
  const { isAuthenticated } = useSelector((state) => state.auth)
  const [ready, setReady ] = useState(false)

  useEffect(() => {
      console.log(`${url}/api/company/job/get/all/`)
      const fetchJobs = async() => {
        const response = await fetch(`${url}/api/company/job/get/all/`, {
          method: 'GET',
          headers: {
                'Content-Type': 'application/json',
          },
        })
        const data = await response.json()
        if (response.status === 200) {
            console.log(data);
            setJobs(data);
            setReady(true);
        } else {
          console.error(data)
        }
    }
    fetchJobs().catch((error) => {
      console.log('Error:', error);
    })
  }, [])

  if (!ready) {
      return (
        <Loading />
      )
  }

  return (
    <section className=" min-h-screen py-8">
      <div className="container mx-auto max-w-7xl flex flex-col items-center space-y-8 md:space-y-16">
        <div className="w-full flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold text-gray-800">Workit</h1>
          <p className="mt-4 text-xl text-gray-600">
            Find the perfect job or hire the best talent.
          </p>
          {isAuthenticated || (
          <Link to='/signup'>
          <button className="mt-6 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none">
            Sign up
          </button></Link>)}
        </div>
        <PaginateItems ListItems={ListJobs} itemsPerPage={10} items={jobs.filter((job) => job.open)} />
      </div>
    </section>
  );
};

export default HomePage;
