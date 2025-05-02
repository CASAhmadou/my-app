import React from 'react'
import { useNavigate } from 'react-router-dom'
import LoginSignup from '../components/users/LoginSignup';


const Login = () => {
    const navigate = useNavigate();
  return (
    <div>
        <LoginSignup />
    </div>
  )
}

export default Login