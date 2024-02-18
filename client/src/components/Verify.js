const { useState, useEffect } = require("react");
const { useParams, Link } = require("react-router-dom");
const { url } = require("../utils/backend");


function Verify() {
    const [isVerified, setIsVerified] = useState(false);
    const [loading, setLoading] = useState(false);
    const { id } = useParams()
    useEffect(() => {
    const confirm = async() => {
        setLoading(true)
        const res = await fetch(`${url}/auth/registration/verify-email/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ key: id })
        });
        if (res.status === 200) {
            setIsVerified(true);
            setLoading(false);
        } else {
        }
    }
        confirm();
    }, []);
    if (loading) {
        return (
        <div className="pt-10 text-center text-black font-bold">
            <p>Verifing your email</p>
        </div>
        );
    }

    if (isVerified) {
        return (
      <div className="pt-10 text-center text-emerald-500 font-bold">
        <p>Email verified successfully!</p>
        <Link to='/login' className="underline text-blue-600 hover:text-blue-800">Login</Link>
      </div>
    );
  }
     return (
        <div className="pt-10 text-center text-red-500 font-bold">
         <p>Something went wrong</p>
        </div>
     )
}
    

export default Verify;
