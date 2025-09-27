import React from "react";
import { useState, useContext } from "react";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!fullName) newErrors.fullName = "Full Name is required";
    if (!email) newErrors.email = "Email is required";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) newErrors.email = "Invalid email address";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const res = await API.post("/auth/register", { fullName, email, password });
      login(res.data);
      navigate("/profile");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-teal-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-xl w-96 border-t-4 border-teal-500">
        <h2 className="text-3xl font-bold text-center text-teal-700 mb-6">Register</h2>
        <input type="text" placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} className="w-full mb-4 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent" />
        {errors.fullName && <p className="text-red-500 text-xs italic -mt-3 mb-2">{errors.fullName}</p>}
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full mb-4 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent" />
        {errors.email && <p className="text-red-500 text-xs italic -mt-3 mb-2">{errors.email}</p>}
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full mb-4 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent" />
        {errors.password && <p className="text-red-500 text-xs italic -mt-3 mb-2">{errors.password}</p>}
        <button type="submit" className="w-full bg-teal-600 text-white p-3 rounded-md hover:bg-teal-700 transition-colors duration-300 cursor-pointer">Register</button>
        <p className="text-center text-gray-700 mt-4">Have an account? <Link to="/login" className="text-teal-600 hover:underline">Login</Link></p>

      </form>
    </div>
  );
}

export default RegisterPage;