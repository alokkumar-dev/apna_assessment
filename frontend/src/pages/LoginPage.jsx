import React from "react";
import { useState, useContext } from "react";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [failedMsg, setFailedMsg] = useState()

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) newErrors.email = "Invalid email address";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const res = await API.post("/auth/login", { email, password });
      login(res.data);
      navigate("/profile");
    } catch (err) {
      setFailedMsg(err.response.data.message)
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-teal-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-xl w-96 border-t-4 border-teal-500">
        <h2 className="text-3xl font-bold text-center text-teal-700 mb-6">Login</h2>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full mb-4 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"/>
        {errors.email && <p className="text-red-500 text-xs italic -mt-3 mb-2">{errors.email}</p>}
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full mb-4 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"/>
        {errors.password && <p className="text-red-500 text-xs italic -mt-3 mb-2">{errors.password}</p>}
        <button type="submit" className="w-full bg-teal-600 text-white p-3 rounded-md hover:bg-teal-700 transition-colors duration-300 cursor-pointer">Login</button>
        {
          failedMsg && <h3 className="text-red-500 mt-3">{failedMsg}</h3>
        }
        {/* <p className="text-center text-gray-700 mt-4">Don't have an account? <Link to="/register" className="text-teal-600 hover:underline">Register</Link></p> */}
      </form>
    </div>
  );
}

export default LoginPage;