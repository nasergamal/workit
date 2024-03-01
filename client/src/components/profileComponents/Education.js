import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { updateEducation } from '../../redux/actionCreator'; 
import { url } from '../../utils/backend';
import DeleteConfirm from '../../utils/DeleteConfirm';

const emptyState = {
    study_field: '',
    activites: '',
    degree: '',
    institution: '',
    description: '',
    start: '',
    end: '',
}

function Education({cancel, edit, initialState}) {
  const { education } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth)
  const [newEducation, setNewEducation] = useState(initialState || emptyState);
  const [remove, setRemove] = useState(false);
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewEducation({ ...newEducation, [name]: value });
  };

  const handleAddEducation = (event) => {
    event.preventDefault();
    let exp = { ...newEducation };
    exp.start = moment(newEducation.start).format('YYYY-MM-DD hh:mm');
    exp.end = moment(newEducation.end).format('YYYY-MM-DD hh:mm');
    exp = Object.entries(exp).reduce((a,[k,v]) => (v ? (a[k]=v, a) : a), {})
    fetch(`${url}/api/user/set-education/`, {
      method: 'POST',
      headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + token,
      },
      body: JSON.stringify(exp),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(updateEducation([data, ...education]));
          setNewEducation(emptyState);
      })
      .catch((error) => console.error('Error adding education:', error));
      cancel()
  };

  const handleUpdateEducation = (event) => {
    event.preventDefault();
    let exp = { ...newEducation };
    exp.start = moment(newEducation.start).format('YYYY-MM-DD hh:mm');
    exp.end = moment(newEducation.end).format('YYYY-MM-DD hh:mm');
    exp = Object.entries(exp).reduce((a,[k,v]) => (v ? (a[k]=v, a) : a), {})
    fetch(`${url}/api/user/set-education/`, {
      method: 'PUT',
      headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + token,
      },
      body: JSON.stringify(exp),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedEducation = education.map((edu) => (edu.pk === data.pk ? data : exp));
        dispatch(updateEducation(updatedEducation));
        setNewEducation(emptyState);
      })
      .catch((error) => console.error('Error updating education:', error));
      cancel()
  };

  
  const handleDeleteEducation = (event) => {
    const id = newEducation.pk;
    fetch(`${url}/api/user/set-education/`, {
      method: 'DELETE',
      headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + token,
      },
        body: JSON.stringify({pk: id}),
    })
      .then((response) => {
        if (response.status === 204) {
            const updatedEducation = education.filter((exp) => (exp.pk !== id));
            dispatch(updateEducation(updatedEducation));
            setNewEducation(emptyState);
        } else {
            console.error('Error Deleting education')
        }
     })
      .catch((error) => console.error('Error Deleting education:', error));
      cancel()
  };

  return (
    <div className="shadow-md rounded-md bg-white p-4">
      {edit && remove && <DeleteConfirm 
                            setDelete={() => setRemove(false)}
                            handleRemove={() => handleDeleteEducation()} />}
      <div className='flex  mb-3'>
        <h2 className="text-lg font-bold mb-4 flex-1 ">Education</h2>
        <button
              type="button"
              onClick={() => setRemove(true)}
              className="w-auto items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
            Delete
        </button>
      </div>
      <form onSubmit={edit ? handleUpdateEducation : handleAddEducation}>
        <div className="mb-4">
          <label htmlFor="study_field" className="block text-sm font-medium mb-2">
            Field of Study
          </label>
          <input
            type="text"
            id="study_field"
            name="study_field"
            value={newEducation.study_field ? newEducation?.study_field : ""}
            onChange={handleInputChange}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="institution" className="block text-sm font-medium mb-2">
            Institute*
          </label>
          <input
            type="text"
            id="institution"
            name="institution"
            value={newEducation.institution}
            onChange={handleInputChange}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500  block w-full sm:text-sm border rounded-md p-2"
            required
         />
        </div>

        <div className="mb-4">
          <label htmlFor="degree" className="block text-sm font-medium mb-2">
            Degree
          </label>
          <input
            type="text"
            id="degree"
            name="degree"
            value={newEducation.degree ? newEducation.degree : ""}
            onChange={handleInputChange}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500  block w-full sm:text-sm border rounded-md p-2"
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
            value={newEducation.description? newEducation.description: ""}
            onChange={handleInputChange}
            rows='5'
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500  block w-full sm:text-sm border rounded-md p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="activites" className="block text-sm font-medium mb-2">
            Activites
          </label>
          <textarea
            type="text"
            id="activites"
            name="activites"
            value={newEducation.activites? newEducation.activites: ""}
            onChange={handleInputChange}
            rows='5'
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500  block w-full sm:text-sm border rounded-md p-2"
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
            value={newEducation.start && moment(newEducation.start).format('YYYY-MM-DD')}
            onChange={handleInputChange}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border rounded-md p-2"
            required
         />
        </div>

        <div className="mb-4">
          <label htmlFor="end" className="block text-sm font-medium mb-2">
            To*
          </label>
          <input
            type="date"
            id="end"
            name="end"
            value={newEducation.end && moment(newEducation.end).format('YYYY-MM-DD')}
            onChange={handleInputChange}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border rounded-md p-2"
            required
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

export default Education;
