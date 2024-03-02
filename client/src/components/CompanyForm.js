import { useSelector } from 'react-redux';
import { useState, useRef} from 'react';
import { url } from '../utils/backend';
import { useNavigate } from 'react-router-dom';

const emptyState = {
    name: '',
    industry: '',
    address: '',
    about: '',
    logo: null,
}

function CompanyForm({cancel, edit, initialState, handleNewCompany, returnCompany, jobs}) {
  const { userName } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth)
  const picture = useRef(edit ? url+initialState.logo : null)
  const [newCompany, setNewCompany] = useState(initialState || emptyState);
  const [errors, setErrors] = useState({})
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewCompany({ ...newCompany, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) { 
      setNewCompany({ ...newCompany, logo: file})
      const objectUrl = URL.createObjectURL(file);
      
      picture.current = objectUrl
      return () => URL.revokeObjectURL(objectUrl)
    }
  }
  const handleCompany = async(event) => {
    event.preventDefault();
    let company = { ...newCompany };
    let method = 'POST';
    if (edit === true) {
      method = 'PUT';
      if (company.logo === initialState.logo) company.logo = null
    } else {
      company['user_username'] = userName
    }
    const formData = new FormData();
    for (const key in company) {
      if (!company[key]) {
          continue
      } else if (key !== 'logo') { 
        formData.append(key, company[key]);
      } 
      if (key === 'logo') {
          formData.append('logo', company.logo, company.logo.name);
      } 
    }
    const response = await fetch(`${url}/api/company/set/`, {
      method: method,
      body: formData, 
      headers: { 
          'Authorization': 'Token ' + token,
      },
    })
      const data = await response.json()
      if (response.status === 201) {
          setNewCompany(emptyState);
          if (edit) {
            returnCompany(newCompany)
            handleNewCompany({...newCompany, jobs});
            cancel();
          } else {
            navigate(`/company/${data.name}`)
          }
      } else {
          setErrors(data)
          console.error('Error updating profile:', data);
      }
      
  };


  return (
    <div className="shadow-md rounded-md p-4 xl:px-80 lg:px-52 md:px-40 sm:px-25 pt-20">
      <div className='flex  mb-3'>
        <h2 className="text-lg font-bold mb-4 flex-1 ">Company</h2>
      </div>
      <form onSubmit={handleCompany} className='bg-white border border-indigo-100 p-4'>
      <p className='block text-sm font-medium mb-2'>Company logo</p>
        <div className="flex items-center justify-center w-full">
            <label htmlFor="logo" className="flex flex-col items-center justify-center w-full sm:w-6/12  h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-100  hover:bg-gray-500 ">
      {picture.current ? (
          <img
          src={picture.current}
          alt="user pic"
          className="w-40 h-40 rounded-full object-cover"
          />) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
        </div>)}
      <input
      type="file"
      id="logo"
      name="logo"
      onChange={handleFileChange}
      className="hidden shadow-sm focus:ring-indigo-500 focus:border-indigo-500  sm:text-sm border rounded-md p-2"
      accept="image/png, image/jpeg, image/jpg" 
      />
        <input id="dropzone-file" type="file" className="hidden" />
    </label>
</div>
        <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium mb-2">
        Company name
        </label>
        <input
        type="text"
        id="name"
        name="name"
        value={newCompany.name}
        onChange={handleInputChange}
        className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500  block w-full sm:text-sm border rounded-md p-2
                        ${errors?.name ? 'border-red-500': ''}`}
        required
        />
        {errors?.name && <ul className='text-red-500'> {errors.name.map((err, idx) => 
          <li key={idx}>{err}</li> )}
          </ul>
        }

        </div>
        <div className="mb-4">
        <label htmlFor="address" className="block text-sm font-medium mb-2">
        Address 
        </label>
        <input
        type="text"
        id="address"
        name="address"
        value={newCompany.address}
        onChange={handleInputChange}
        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500  block w-full sm:text-sm border rounded-md p-2"
        required
        />
        </div>
        <div className="mb-4">
        <label htmlFor="industry" className="block text-sm font-medium mb-2">
        Industry 
        </label>
        <input
        type="text"
        id="industry"
        name="industry"
        value={newCompany.industry}
        onChange={handleInputChange}
        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500  block w-full sm:text-sm border rounded-md p-2"
        required
        />
        </div>
        <div className="mb-4">
          <label htmlFor="about" className="block text-sm font-medium mb-2">
            Company description
          </label>
          <textarea
            type="text"
            id="about"
            name="about"
            value={newCompany.about? newCompany.about: ""}
            onChange={handleInputChange}
            rows='5'
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500  block w-full sm:text-sm border rounded-md p-2"
          />
        </div>

      <div className='text-center'>
           <button
              type="submit"
              className=" inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Update
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

export default CompanyForm;
