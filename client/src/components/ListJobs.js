import moment from "moment"
import { Link } from "react-router-dom"
import { url } from "../utils/backend"

function ListJobs({items}) {

    return (
            <div className="space-y-4 w-full  sm:w-9/12 lg:w-7/12" >
            <h3 className="font-bold text-lg">New items</h3>
            <ul className="">
            {items ? (items.map((job) => (
                <li key={job.pk} className='space-x-5 mb-4 border border-indigo-100 shadow p-4 bg-white'>
                  <div className='flex'>
                    <div className="flex basis-2/12 lg:basis-1/12 lg:pe-2  pe-1 me-2 border-black border-e">
                        <Link to={`/company/${job.company_name}`} className='w-fit'>
                            <img
                                src={url + job.company_logo}
                                alt="logo"
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <p className='text-pretty'>{job.company_name}</p>
                        </Link>
                    </div>
                <Link className="w-full" to={`/company/${job.company_name}/job/${job.pk}`}>
                    <div className='md:flex'>
                    <p className='flex-1 pb-4'>Position: {job.position} </p>
                    <p className="float-end">Posted: {moment(job.created).format('YYYY-MM-DD')}</p>
                    </div>
                    <div className="md:flex items-center">
                        <h5 className="text-base ">Expected salary: </h5>
                        <p>{job.salary ? `${job.currency ? job.currency : ''} ${job.salary}`: "Classified"}</p>
                    </div>
                    <div className="md:inline-flex items-center">
                        <h5 className="text-base">Estimated experience: </h5>
                        <p>{job.experience}</p>
                    </div>
                </Link>
                </div>
                </li>
                ))) : 'No jobs posted'}
            </ul>
      </div>

    )
}

export default ListJobs;
