import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";

function PersonList() {
  const [people, setPeople] = useState([]);
  const [user, setUser] = useState(localStorage.getItem("user"));
  const navigate = useNavigate();

  const userdata = JSON.parse(user);
  console.log(userdata);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/people")
      .then((res) => {
        console.log(res.data);
        setPeople(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="full-page p-4 ">
      <div className="container ">
        <nav className="navbar navbar-expand-lg bg-body-tertiary  ">
          <div className="container-fluid      ">
            <a className="navbar-brand" href="#">
              Phone shop
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link
                    to="/"
                    className="nav-link active glow-button"
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/people/smartphone"
                    className="nav-link glow-button"
                  >
                    Smartphones
                  </Link>
                </li>
              </ul>
              <div className="d-flex">
                <Link to="/people" className="btn btn-primary mx-3 glow-button">
                  Upload product
                </Link>
                <Logout setUser={setUser} />
              </div>
              <h5 className="nav-item mx-5   ">
                {`${userdata.firstName} ${userdata.lastName}`}
              </h5>
            </div>
          </div>
        </nav>
        <div className="row mb-4  "></div>
        <div className="row row-cols- row-cols-md-3 g-4  ">
          {people.map((person) => (
            <div key={person._id} className="col">
              <div className="card shadow rounded ">
                <img
                  src={person.img}
                  className="img-fluid rounded-start "
                  alt={person.phoneName}
                  style={{ height: "330px", objectFit: "cover", width: "100%" }}
                />

                <div className="card-body">
                  <h5 className="card-title">{person.phoneName}</h5>
                  <p className="card-text">{person.price}</p>
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <Link
                    to={`/people/${person._id}`}
                    className="btn btn-outline-primary glow-button"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PersonList;
