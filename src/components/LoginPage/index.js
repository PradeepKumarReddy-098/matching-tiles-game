import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './index.css'

const LoginPage = () =>{
    const [username,setUsername] = useState("");
    const navigate = useNavigate()

    const submitUsername = (e) => {
        e.preventDefault()
        localStorage.setItem("username",username)
        navigate('/')
    }

    return(
        <div className='login-container'>
            <h1>React Tiles</h1>
            <form className='login-form' onSubmit={submitUsername}>
                <h2>Enter Your Name</h2>
                <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} className='uservalue'  />
                <button type='submit'>Play</button>
            </form>
        </div>
    )
}

export default LoginPage