import React from 'react'

const Register = () => {
  return (
    <>
    <h1>Registration Form</h1>
    <form action="">
       <p>fisrt name:<input type="text" name="firstName" id="firstName" /></p> 
       <p>last name:<input type="text" name="firstName" id="firsName" /></p> 
       <p>email:<input type="email" name="email" id="email" /></p>
       <p>password:<input type="password" name="password" id="password" /></p>
       <button>Register</button>

    </form>
    </>
  )
}

export default Register