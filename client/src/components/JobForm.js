import { useSelector, useDispatch } from 'react-redux';
import { useState, useRef} from 'react';
import { url } from '../utils/backend';
import { useNavigate } from 'react-router-dom';
import { updateCompany } from '../redux/actionCreator';

const emptyState = {
    position: '',
    description: '',
    salary: '',
    currency: '',
    experience: '',
}

function JobForm({cancel, pk}) {
  const { token } = useSelector((state) => state.auth)
  const { companies } = useSelector((state) => state.user)
  const [newJob, setNewJob] = useState(emptyState);
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewJob({ ...newJob, [name]: value });
  };


  const handleJob = async(event) => {
    event.preventDefault();
    let job = { ...newJob };

    let method = 'POST';
    job = Object.entries(job).reduce((a,[k,v]) => (v ? (a[k]=v, a) : a), {})
    job['company_id'] = pk
    const response = await fetch(`${url}/api/company/job/set/`, {
      method: method,
      headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token,
         },
      body: JSON.stringify(job)
    })
      const data = await response.json()
      if (response.status === 201) {
          const newCompanies = [...companies].map((company) => {
            if (company.pk === data.company_id) {
              let jobList = [...company.jobs]
              jobList.unshift(data)
              //company.jobs = jobList
              return {...company, jobs: jobList}
            }
            return company
          })
          dispatch(updateCompany(newCompanies))
          setNewJob(emptyState);
          cancel()
      } else {
          console.error('Error updating profile:', data);
      }
  };


  return (
    <div className=" p-4 xl:px-80 lg:px-52 md:px-40 sm:px-25 pt-20">
      <div className='flex  mb-3'>
        <h2 className="text-lg font-bold mb-4 flex-1 ">New position</h2>
      </div>
      <form onSubmit={handleJob} className='bg-white border border-indigo-100 shadow p-4'>
        <div className="mb-4">
        <label htmlFor="position" className="block text-sm font-medium mb-2">
        position*
        </label>
        <input
        type="text"
        id="position"
        name="position"
        position="position"
        value={newJob.position}
        onChange={handleInputChange}
        className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500  block w-full sm:text-sm border rounded-md p-2'
        required
        />

        </div>
        <div className='flex justify-between space-x-4'>
        <div className="mb-4 flex-1">
        <label htmlFor="salary" className="block text-sm font-medium mb-2">
        Salary
        </label>
        <input
        type="number"
        id="salary"
        name="salary"
        value={newJob.salary}
        onChange={handleInputChange}
        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500  block w-full sm:text-sm border rounded-md p-2"
        />
        </div>
        <div className="mb-4">
        <label htmlFor="currency" className="block text-sm font-medium mb-2">
        Currency
        </label>
        <input
        type="text"
        id="currency"
        name="currency"
        value={newJob.currency}
        onChange={handleInputChange}
        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500  block w-full sm:text-sm border rounded-md p-2"
        />
        </div>
        </div>
        <div className="mb-4">
        <label htmlFor="experience" className="block text-sm font-medium mb-2">
        Required Experience*
        </label>
        <input
        type="text"
        id="experience"
        name="experience"
        value={newJob.experience}
        onChange={handleInputChange}
        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500  block w-full sm:text-sm border rounded-md p-2"
        required
        />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium mb-2">
            Company description*
          </label>
          <textarea
            type="text"
            id="description"
            name="description"
            value={newJob.description}
            onChange={handleInputChange}
            rows='5'
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500  block w-full sm:text-sm border rounded-md p-2"
            required
          />
        </div>

      <div className='text-center'>
           <button
              type="submit"
              className=" inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Post
            </button>
           <button
              type="button"
              onClick={cancel}
              className=" inline-flex  items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
            Cancel
            </button>
      </div>
      </form>
    </div>
  )
}

export default JobForm;
