import React, { useState } from 'react'
import './LoginSignup.css';
import {MdAlternateEmail} from 'react-icons/md';
import {FaUserAlt} from 'react-icons/fa';
import {GrView} from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../../services/api';

const MdEmail = MdAlternateEmail as unknown as React.FC;
const UserAlt = FaUserAlt as unknown as React.FC;
const View = GrView as unknown as React.FC;
const LoginSignup = () => {
    const [action, setAction] = useState("Login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            let res;
            if(action == "Login"){
                res = await login(email, password);
            }else{
                res = await register(name, email, password);
            }
            localStorage.setItem("token", res.token);
            navigate("/todos");
        } catch (err) {
            alert("Echec de la connexion");
            console.error(err);
        }
    }

  return (
    <div className='container'>
        <form onSubmit={handleSubmit} className='login-form'>
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                {action==="Login"?
                    <div></div> : 
                    <div className="input">
                        <span className="icon"><UserAlt /></span>
                        <input type="text" placeholder='Name' 
                            value={name} onChange={(e) => setName(e.target.value)} 
                        />
                    </div>
                }
                
                <div className="input">
                    <span className="icon"><MdEmail /></span>
                    <input type="email" placeholder='Email'
                        value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="input">
                    <span className="icon"><View /></span>
                    <input type="password" placeholder='Password' 
                        value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type='submit' className='submitb'>{action}</button>

            </div>
            {
                action==="Sign Up"? <div></div> :
                <div className='forgot-password'>
                    Lost Password?
                    <span>Click Here !</span>
                </div>
            }
            
            <div className="submit-container">
                <div className={action==="Login"?"submit gray": "submit"}
                    onClick={() => {setAction("Sign Up")}}>S'inscrire
                </div>
                <div className={action==="Sign Up"?"submit gray": "submit"}
                    onClick={() => {setAction("Login")}}>Se connecter
                </div>
            </div>
        </form>
    </div>
  )
}

export default LoginSignup