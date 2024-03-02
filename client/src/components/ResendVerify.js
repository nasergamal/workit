const { useState } = require("react");
const { useNavigate} = require("react-router-dom");
const { url } = require("../utils/backend");


function ResendVerify() {
    const [email, setEmail] = useState('')
    const navigate = useNavigate()
    const handleSubmit = async(e) => {
        e.preventDefault()
        const res = await fetch(`${url}/auth/signup/resend-email/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email})
        });
        const data = await res.json()
        if (res.status === 200) {
            navigate('/');
        console.log(data)
        } else {
          console.log(data)
        }
    }

    return (
    <div className="container mx-auto max-w-md mt-10 p-4 bg-white shadow border border-indigo-100">
      <h1 className="text-3xl font-bold text-center mb-4">Request Verifcation</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <p className='mb-2'>Enter your email address below, and we'll resend you your verifcation email.</p>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md sm:text-sm border border-gray-300 p-2.5'
          />

        <button
          type="submit"
          className=" mx-auto mt-4 flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Send mail
        </button>
        </div>
      </form>
    </div>
    )
    }

export default ResendVerify;

