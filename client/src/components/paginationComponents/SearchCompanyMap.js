import { Link } from "react-router-dom";
import { url } from "../../utils/backend";

function SearchCompanyMap({items}) {
    return (
    <>
    {items.map((item) => (
    <Link to={`/company/${item.name}`}>
    <li key={item.pk} className='space-x-5 mb-4 p-4 bg-white border border-indigo-100 shadow'>
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
    </Link> ))}
    </>
    )

}

export default SearchCompanyMap;
