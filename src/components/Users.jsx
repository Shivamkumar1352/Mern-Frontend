import axios from 'axios';
import React from 'react'
import { useEffect, useState } from 'react'
export default function Users() {
  const [users,setUsers]=useState([]);
  const[error,setError]=useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchUsers = async () =>{
    try{
      setError("Loading...");
      const url = `${API_URL}/api/users/showusers`;
      const result = await axios.get(url);
      console.log(result.data)
      setUsers(result.data);
      setError()
    }catch(err){
      console.log(err);
      setError("something went wrong");
    }
  };
  useEffect(()=>{
    fetchUsers()
  },[])

  const handleDelete = async (id) =>{
    try {
      const url = `${API_URL}/api/users/${id}`
      const result = await axios.delete(url);
      setError("User Deleted Successfully");
      fetchUsers();
    } catch (err) {
      console.log(err);
      setError("something went wrong");
    }
  };
  return (
    <div>
      <h2>User List</h2>
      <button>Add new User</button>
      {error}
      {users.map((user)=>(
        <li>
          {user.firstName}-<button>Update</button>-<button onClick={()=>handleDelete(user._id)}>Delete</button>
        </li>
      ))}
    </div>
  )
}
