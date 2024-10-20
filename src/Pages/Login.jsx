import qec from "../Assets/qec.jpg";
import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "../utilis/baseUrl";
import LoginValidator from "../Validators/LoginValidator";
import { NavLink, useNavigate } from "react-router-dom";

const initialFormData = {
  email: "",
  password: "",
};

const intialFormErr = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormdata] = useState(initialFormData);
  const [formErr, setFormErr] = useState(intialFormErr);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormdata((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = LoginValidator({
      email: formData.email,
      password: formData.password,
    });

    if (error.email || error.password) {
      setFormErr(error);
    } else {
      try {
        setLoading(true);

        // api request

        const requestBody = {
          email: formData.email,
          password: formData.password,
        };

        const response = await axios.post("/auth/signin", requestBody);
        const data = response.data;

        window.localStorage.setItem("loginData", JSON.stringify(data.data));

        toast.success(data.message, {
          position: "top-right",
          autoClose: true,
        });

        setFormdata(initialFormData);

        setFormErr(intialFormErr);

        setLoading(false);

        navigate("/");
      } catch (error) {
        setLoading(false);

        const response = error.response;
        const data = response?.data;
        toast.error(data.message, {
          position: "top-right",
          autoClose: true,
        });
        // console.log(err.message);
      }
    }
    console.log(formData);
  };

  return (
    <div>
      <div className="flex items-center justify-center min-h-full bg-gray-100 px-4 py-14 pb-32">
        <div className="flex flex-col bg-purple-100 items-center justify-center py-6 px-4 md:px-8 w-full sm:w-[50%] md:w-[400px] rounded-lg shadow-md">
          <img src={qec} alt="qec" className="w-24 mix-blend-multiply" />
          <h1 className="text-2xl md:text-4xl font-bold text-purple-950 py-2">
            Login
          </h1>
          <form onSubmit={handleSubmit} className="w-full">
            {/* email */}
            <div className="flex flex-col py-1">
              <label className="text-purple-950 font-medium mb-1">Email</label>
              <input
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                type="text"
                name="email"
                placeholder="example@xyz.com"
                value={formData.email}
                onChange={handleChange}
              />
              {formErr.email && (
                <p className="text-xs text-red-600">{formErr.email}</p>
              )}
            </div>

            {/* password */}
            <div className="flex flex-col py-1">
              <label className="text-purple-950 font-medium mb-1">
                Password
              </label>
              <input
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                type="password"
                name="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
              />
              {formErr.password && (
                <p className="text-xs text-red-600">{formErr.password}</p>
              )}
            </div>

            <div>
              <p className="text-sm text-slate-600">
                If you doesn't have an account ?{" "}
                <NavLink className="text-x text-purple-500" to="/signup">
                  Sign Up
                </NavLink>
              </p>
            </div>

            {/* login Button */}

            <div className="py-4">
              <input
                className="w-full p-2 border border-black rounded-md cursor-pointer text-white font-bold bg-purple-950 hover:bg-slate-800 transition-colors"
                type="submit"
                value={`${loading ? "Signing.." : "Login"}`}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
