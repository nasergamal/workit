import moment from "moment"
import { Link } from "react-router-dom"

function CompanyJobsListing({items}) {
    return (
        <>
        {items.map((job) => (
          <li key={job.pk} className=' shadow p-4 pb-8 bg-zinc-100 border space-y-2'>
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
            ))}
        </>
    )

}

export default CompanyJobsListing;
