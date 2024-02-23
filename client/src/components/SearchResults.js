import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom'
import { url } from '../utils/backend';
import Loading from '../utils/Loading';
import toast, { Toaster } from 'react-hot-toast';

function SearchResults() {
    const [searchParams] = useSearchParams();
    const [ready, setReady] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const {token} = useSelector((state) => state.auth)
    const param = searchParams.get('q')
    useEffect(() => {
        //const param = searchParams.get('q');
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
            .then((data) => {
                setSearchResults(data)
                setReady(true)
            })
            .catch((error) => console.error('Error fetching search results:', error));
        } else {
         
        }
    }, [param])

    if (!ready) {
        return (
        <div>
            <Toaster />
            <Loading />
        </div>
        )
    }
    return (
        <div className="pt-20 space-y-4 xl:px-80 lg:px-52 md:px-40 sm:px-25 px-10" >
            <h3 className="font-bold text-lg">People</h3>
            <ul className="">
              {searchResults?.length > 0  ?
                searchResults.map((item) => (
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
             </Link>

                )):
                  'No Results found'
              }
            </ul>
        </div>
    )

}

export default SearchResults;
