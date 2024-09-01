import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

function Login({ setUser, user }) {
  const navigate = useNavigate();
  const Login = async (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8000/api/login",
        {
          email: e.target.email.value,
          password: e.target.password.value,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        setUser(res.data.user._id);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      });
    navigate("/").catch((err) => console.log(err));
  };
 
  return (
    <div className="full-page">
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-6">
                <h2 className="mb-4 text-center text-white">Login</h2>
                <form onSubmit={Login}>
                    <div className="form-group mb-3">
                        <label htmlFor="email" className="text-white">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="form-control"
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="password" className="text-white">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="form-control"
                            placeholder="Password"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
            </div>
        </div>
    </div>
</div>
);
}



export default Login;