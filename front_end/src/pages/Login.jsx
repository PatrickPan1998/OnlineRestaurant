import React, {useState} from "react";
import API from "../api";
import {useNavigate} from "react-router-dom"
const Login=()=>{
    const [form,setForm]=useState({email:"",password:""});
    const [error,setError]=useState("");
    const navigate=useNavigate();

    const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value});
    };
    const handleSubmit=async(e)=>{
        e.preventDefault();
        setError("");
        try {
            const res=await API.post("/user/login",form);
            const token=res.data.token;
            localStorage.setItem("token",token);
            console.log(token);
            navigate("/items");
        } catch (err) {
            setError(err.response?.data?.message||"Login failed");
        }
    };
    return(
        <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          <button type="submit">Login</button>
        </form>
        {error && <p style={{color: "red"}}>{error}</p>}
      </div>
    );
};
export default Login;