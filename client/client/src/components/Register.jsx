import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Register( {setUser,user} ) {
  const navigate = useNavigate();

  const userdata = JSON.parse(user);
  console.log(userdata);
  
    const Register = async (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/register", {
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            email: e.target.email.value,
            password: e.target.password.value,
            confirmPassword: e.target.confirmPassword.value
    },{withCredentials:true})
    .then(res => {console.log(res); setUser(res.data.user._id) ; localStorage.setItem('user', JSON.stringify(res.data.user));})
     navigate('/')


}

  return (
<div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="text-center">Register</h2>
                    <form onSubmit={Register}>
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="firstName"
                                id="firstName"
                                placeholder="First Name"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="lastName"
                                id="lastName"
                                placeholder="Last Name"
                                required
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                id="email"
                                placeholder="Email"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                id="password"
                                placeholder="Password"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="confirmPassword"
                                id="confirmPassword"
                                placeholder="Confirm Password"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block glow-button">
                            Register
                        </button>
                        <Link to="/login" className="btn btn-primary mx-3 glow-button">log in</Link>
                       
                    </form>
                </div>
            </div>
           
        </div>
    );
};
export default Register
