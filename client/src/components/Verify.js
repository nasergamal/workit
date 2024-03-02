const { useState, useEffect } = require("react");
const { useParams, Link } = require("react-router-dom");
const { url } = require("../utils/backend");
const { default: ResendVerify } = require("./ResendVerify");


function Verify() {
    const [isVerified, setIsVerified] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resend, setResend] = useState(false);
    const { id } = useParams()
    useEffect(() => {
    const confirm = async() => {
        setLoading(true)
        console.log(`${url}/auth/signup/verify-email/`)
        const res = await fetch(`${url}/auth/signup/verify-email/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ key: id }),
    });
        if (res.status === 200) {
            setIsVerified(true);
            setLoading(false);
        } else {
            setLoading(false);
        }
    }
        confirm();
    }, []);
    if (resend) {
        return (<ResendVerify/>)
    }
    if (loading) {
        return (
        <div className="pt-10 text-center text-black font-bold">
            <p>Verifing your email</p>
        </div>
        );
    }

    if (isVerified) {
        return (
      <div className="pt-10 text-center text-emerald-500 font-bold h-screen bg-white shadow border border-indigo-100">
        <p>Email verified successfully!</p>
        <Link to='/login' className="underline text-blue-600 hover:text-blue-800">Login</Link>
      </div>
    );
  }
     return (
        <div className="pt-10 text-center text-red-500 font-bold h-screen bg-white shadow border border-indigo-100">
         <p>Email verification links invalid</p>
         <p className="text-black font-normal">Request a new Link?</p>
        <button
          type="button"
          onClick={() => setResend(true)}
          className="mx-auto flex mt-4 justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Request
        </button>
        </div>
     )
}
    

export default Verify;
