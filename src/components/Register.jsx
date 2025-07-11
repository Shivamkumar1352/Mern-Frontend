import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Register.css";
const Register = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState();
  const API_URL = import.meta.env.VITE_API_URL
  const handleSubmit = (e)=>{
    e.preventDefault();
    try {
      const url = `${API_URL}/api/users/register`;
      const response = axios.post(url,user);
      console.log(response.data);
      setError("data saved successfully");
    } catch (err) {
      console.log(err.response?.data || err);
      setError("something went wrong");
    }
  }

  return (
    <div className="register-container">
      <h1>Registration Form</h1>
      {error}
      <form className="register-form">
        <p>
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="Enter first name"
            onChange={(e)=>setUser({...user,firstName: e.target.value})}
          />
        </p>
        <p>
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Enter last name"
            onChange={(e)=>setUser({...user,lastName: e.target.value})}
          />
        </p>
        <p>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter email"
            onChange={(e)=>setUser({...user,email: e.target.value})}
          />
        </p>
        <p>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            onChange={(e)=>setUser({...user,password:e.target.value})}
          />
        </p>
        <button onClick={handleSubmit}>Register</button>
      </form>
      <hr />
      <Link to="/login">Login here...</Link>
    </div>
  );
};

export default Register;


// import React, { useRef} from "react";
// import "./Register.css";
// const Register = () => {
//   const firstName = useRef()
//   const lastName = useRef()
//   const email = useRef()
//   const password = useRef()
//   const handleSubmit = ()=>{
//     const user = {
//       firstName: firstName.current.value,
//       lastName: lastName.current.value,
//       email: email.current.value

//     }
//     console.log(user);
//   }

//   return (
//     <div className="register-container">
//       <h1>Registration Form</h1>
//       <form className="register-form">
//         <p>
//           <input
//             type="text"
//             placeholder="Enter first name"
//             ref={firstName}
//           />
//         </p>
//         <p>
//           <input
//             type="text"
//             placeholder="Enter last name"
//             ref={lastName}
//           />
//         </p>
//         <p>
//           <input
//             type="email"
//             placeholder="Enter email"
//             ref={email}
//           />
//         </p>
//         <p>
//           <input
//             type="password"
//             placeholder="Enter password"
//             ref={password}
//           />
//         </p>
//         <button onClick={handleSubmit}>Register</button>
//       </form>
//     </div>
//   );
// };

// export default Register;
