import { useSelector, useDispatch } from 'react-redux';
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

function CompanyForm({cancel, edit, initialState}) {
  const { userName } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth)
  const picture = useRef(edit ? url+initialState.logo : null)
  const [newCompany, setNewCompany] = useState(initialState || emptyState);
  const [errors, setErrors] = useState({})
  const dispatch = useDispatch();
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
          navigate(`/company/${data.name}`)
      } else {
          setErrors(data)
          console.error('Error updating profile:', data);
      }
      
  };


  return (
    <div className="shadow-md rounded-md bg-white p-4 xl:px-80 lg:px-52 md:px-40 sm:px-25 pt-20">
      <div className='flex  mb-3'>
        <h2 className="text-lg font-bold mb-4 flex-1 ">Company</h2>
      </div>
      <form onSubmit={handleCompany} className='bg-zinc-100 shadow p-4'>
      <div className="mb-4 flex-inline">
      <label htmlFor="logo" className="block text-sm font-medium mb-2">
      Company logo
      </label>
      {picture.current &&
      <div className="flex justify-center">
      <img
      src={picture.current}
      alt="user pic"
      className="w-36 h-36 rounded-full object-cover"
      />
      </div>}
      <input
      type="file"
      id="logo"
      name="logo"
      onChange={handleFileChange}
      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 inline  sm:text-sm border rounded-md p-2"
      accept="image/png, image/jpeg, image/jpg" 
      />
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
