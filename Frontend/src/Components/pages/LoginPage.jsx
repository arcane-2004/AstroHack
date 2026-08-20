import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import axios from "axios"

import { Shell, BirthWheel, Field, ProgressSteps, } from "../AuthShell";
export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.email.trim()) e.email = "Enter your email.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "That email doesn't look right.";
    if (!form.password) e.password = "Enter a password.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const data = {
        email: form.email,
        password: form.password,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        data,
        {
          withCredentials: true,
        }
      );

      localStorage.setItem("token", response.data.token);
      console.log(response.data);

    } catch (error) {
      console.error(error.response?.data || error.message);
    }
    // real auth call goes here
    navigate("/success", { state: { mode: "login" } });
  };

  return (
    <Shell>
      <BirthWheel time="" filled={false} />
      <h1 className="headline">Chart your beginning.</h1>
      <p className="subcopy">Log back in to see your natal chart.</p>

      <div className="tabs" role="tablist">
        <Link to="/login" className="tab tab-active">Log in</Link>
        <Link to="/signup" className="tab">Sign up</Link>
      </div>

      <form className="form" onSubmit={handleSubmit} noValidate>
        <Field label="Email" error={errors.email}>
          <Mail size={16} className="field-icon" />
          <input type="email" placeholder="you@example.com" value={form.email} onChange={update("email")} className="input" />
        </Field>

        <Field label="Password" error={errors.password}>
          <Lock size={16} className="field-icon" />
          <input type={showPassword ? "text" : "password"} placeholder="Your password" value={form.password} onChange={update("password")} className="input" />
          <button type="button" className="eye-btn" onClick={() => setShowPassword((s) => !s)} aria-label={showPassword ? "Hide password" : "Show password"}>
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </Field>

        <button type="submit" className="submit-btn">
          Log in <ArrowRight size={16} />
        </button>
      </form>

      <p className="switch-line">
        New here? <Link to="/signup" className="link-btn">Sign up</Link>
      </p>
    </Shell>
  );
}
