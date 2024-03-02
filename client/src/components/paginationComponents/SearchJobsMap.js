import moment from "moment"
import { Link } from "react-router-dom"

function SearchJobsMap({items}) {
    return (
    <>
        {items.map((job) => (
        <Link to={`/company/${job.company_name}/job/${job.pk}`}>
        <li key={job.pk} className='space-x-5 mb-4 p-4 bg-white border border-indigo-100 shadow'>
            <div className='flex'>
            <p className='flex-1 pb-4'>Position: {job.position} </p>
            <p>Posted: {moment(job.created).format('YYYY-MM-DD')}</p>
            </div>
            <div className="flex items-center">
                <h5 className="text-base ">Expected salary: </h5>
                <p>{job.salary ? `${job.currency ? job.currency : ''}${job.salary}`: "Classified"}</p>
            </div>
            <div className="inline-flex items-center">
                <h5 className="text-base ">Estimated experience: </h5>
                <p>{job.experience}</p>
            </div>
        </li>
        </Link> ))}
        </>
    )
}

export default SearchJobsMap;
