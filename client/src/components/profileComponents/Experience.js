import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { updateExperience } from '../../redux/actionCreator'; 
import { url } from '../../utils/backend'
function Experience() {
  const location = useLocation()
  const { edit, initialState } = location.state
  const { experience } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth)
  const [newExperience, setNewExperience] = useState(initialState || {
    title: '',
    company_name: '',
    description: '',
    start: '',
    end: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewExperience({ ...newExperience, [name]: value });
  };

  const handleAddExperience = (event) => {
    event.preventDefault();
      const { end, ...exp } = newExperience;
      const times = {start: moment(newExperience.start).format('YYYY-MM-DD hh:mm')};
      if (end && end.length > 0) {
          times.end = moment(newExperience.end).format('YYYY-MM-DD hh:mm')
      }

    fetch(`${url}/api/user/set-experience/`, {
      method: 'POST',
      headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + token,
      },
      body: JSON.stringify({...exp, ...times}),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(updateExperience([...experience, data]));
          setNewExperience({
          title: '',
          company_name: '',
          description: '',
          start_date: '',
          end_date: '',
        });
      })
      .catch((error) => console.error('Error adding experience:', error));
    navigate('/profile');
  };

  const handleUpdateExperience = (event) => {
    event.preventDefault();
    const { end, ...exp } = newExperience;
    const times = {start: moment(newExperience.start).format('YYYY-MM-DD hh:mm')};
    if (end && end.length > 0) {
        times.end = moment(newExperience.end).format('YYYY-MM-DD hh:mm')
    }
    fetch(`${url}/api/user/set-experience/`, {
      method: 'PUT',
      headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + token,
      },
      body: JSON.stringify({...exp, ...times}),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedExperiences = experience.map((exp) => (exp.pk === data.pk ? data : exp));
        dispatch(updateExperience(updatedExperiences));
        setNewExperience({
          title: '',
          company_name: '',
          description: '',
          start_date: '',
          end_date: '',
        });
      })
      .catch((error) => console.error('Error updating experience:', error));
    navigate('/profile');
  };
/*
  const handleCancelEdit = () => {
    setIsEdit(false);
    setNewExperience({
      title: '',
      company_name: '',
      description: '',
      start_date: '',
      end_date: '',
    });
  };
*/
  return (
    <div className="shadow-md rounded-md bg-white p-4">
      <h2 className="text-lg font-bold mb-4">Experience</h2>

      {/* Add experience form */}
      <form onSubmit={edit ? handleUpdateExperience : handleAddExperience}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Job Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={newExperience.title}
            onChange={handleInputChange}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border rounded-md p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="company_name" className="block text-sm font-medium mb-2">
            Company Name
          </label>
          <input
            type="text"
            id="company_name"
            name="company_name"
            value={newExperience.company_name}
            onChange={handleInputChange}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500  block w-full sm:text-sm border rounded-md p-2"
            required
         />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium mb-2">
            Description
          </label>
          <textarea
            type="text"
            id="description"
            name="description"
            value={newExperience.description}
            onChange={handleInputChange}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500  block w-full sm:text-sm border rounded-md p-2"
            required
         />
      </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium mb-2">
            From
          </label>
          <input
            type="date"
            id="start"
            name="start"
            value={newExperience.start && moment(newExperience.start).format('YYYY-MM-DD')}
            onChange={handleInputChange}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border rounded-md p-2"
            required
         />
      </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium mb-2">
            To
          </label>
          <input
            type="date"
            id="end"
            name="end"
            value={newExperience.end && moment(newExperience.end).format('YYYY-MM-DD')}
            onChange={handleInputChange}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border rounded-md p-2"
         />
      </div>
      <div className='text-center'>
           <button
              type="submit"
              className=" inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            {edit ? 'Change' : 'Add'}
            </button>
          <Link to='/profile' className='inline-flex'>
           <button
              type="button"
              className="w-full inline-flex  items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
            Cancel
            </button>
          </Link>
      </div>
      </form>
    </div>
  )
}

export default Experience;
