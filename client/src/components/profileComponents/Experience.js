import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { updateExperience } from '../../redux/actionCreator'; 
import { url } from '../../utils/backend';
import DeleteConfirm from '../../utils/DeleteConfirm';

function Experience({cancel, edit, initialState}) {
  const { experience } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth)
  const [newExperience, setNewExperience] = useState(initialState || {
    title: '',
    company_name: '',
    description: '',
    start: '',
    end: '',
  });
  const [remove, setRemove] = useState(false);
  const dispatch = useDispatch();

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
        dispatch(updateExperience([data, ...experience]));
          setNewExperience({
          title: '',
          company_name: '',
          description: '',
          start: '',
          end: '',
        });
      })
      .catch((error) => console.error('Error adding experience:', error));
    cancel()
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
          start: '',
          end: '',
        });
      })
      .catch((error) => console.error('Error updating experience:', error));
    cancel()
  };

  
  const handleDeleteExperience = () => {
    const id = newExperience.pk;
    fetch(`${url}/api/user/set-experience/`, {
      method: 'DELETE',
      headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + token,
      },
        body: JSON.stringify({pk: id}),
    })
      .then((response) => {
        if (response.status === 204) {
            const updatedExperiences = experience.filter((exp) => (exp.pk !== id));
            dispatch(updateExperience(updatedExperiences));
            setNewExperience({
              title: '',
              company_name: '',
              description: '',
              start: '',
              end: '',
            });
        } else {
            console.error('Error Deleting experience')
        }
     })
      .catch((error) => console.error('Error Deleting experience:', error));
    cancel()
  };

  return (
    <div className="shadow-md rounded-md bg-white p-4">
      {edit && remove && <DeleteConfirm 
                            setDelete={() => setRemove(false)}
                            handleRemove={() => handleDeleteExperience()} />}
      <div className='flex  mb-3'>
      <h2 className="text-lg font-bold mb-4 flex-1 ">Experience</h2>
      { edit && (
      <button
              type="button"
              onClick={() => setRemove(true)}
              className="w-auto items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
            Delete
        </button>)}
    </div>
      {/* Add experience form */}
      <form onSubmit={edit ? handleUpdateExperience : handleAddExperience}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Job Title*
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
            Company Name*
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
            Description*
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
          <label htmlFor="start" className="block text-sm font-medium mb-2">
            From*
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
          <label htmlFor="end" className="block text-sm font-medium mb-2">
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
            {edit ? 'Update' : 'Add'}
            </button>
           <button
              type="button"
              onClick={cancel}
              className="inline-flex  items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
            Cancel
            </button>
      </div>
      </form>
    </div>
  )
}

export default Experience;
