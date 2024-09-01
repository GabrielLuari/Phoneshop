import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const PersonForm = () => {
  const [seller, setSeller] = useState("");
  const [phoneName, setPhoneName] = useState("");
  const [price, setPrice] = useState("");
  const [gb, setGb] = useState("");
  const [img, setImg] = useState(null);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [people, setPeople] = useState([]);
  const navigate = useNavigate();

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const personData = {
      seller,
      phoneName,
      price,
      img,
      gb,
      description,
      category,
    };

    console.log("Submitting:", personData);

    axios
      .post("http://localhost:8000/api/people", personData, {})
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setPeople([...people, res.data]);
        navigate("/");
      })
      .catch((err) => {
        console.error("Error response: ", err.response);
        console.error("Error message: ", err.message);
        alert(`Error: ${err.response?.data?.message || err.message}`);
      });
  };

  return (
    <form onSubmit={onSubmitHandler}>
  <div className="container bg-purple   ">
    <nav className="navbar navbar-expand-lg bg-body-tertiary bg-info-subtle ">
      <div className="container-fluid text-light-emphasis">
        <a className="navbar-brand " href="#">Phone shop</a>
        <button
          className="navbar-toggler  "
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon  "></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarNavDropdown ">
          <ul className="navbar-nav">
          <li className="nav-item">
                    <Link to="/" className="nav-link active fs-5 glow-button" aria-current="page">Home</Link>
                  </li>
            <li className="nav-item">
            <Link to="/people/smartphone" className="nav-link fs-5 glow-button">Smartphones</Link>
            </li>
          </ul>
          <Link to="/people" className="btn btn-primary mx-3">
            Upload product
          </Link>
        </div>
      </div>
    </nav>
     <div className="bg-info-subtle bg-info text-dark px-4 pb-4 text-info-emphasis ">
    <h1 className="my-4">Upload a phone</h1>
    <div className="row">
      <div className="col-md-6">
        <div className="mb-3 w-75 mx-auto">
          <label className="form-label">Seller Name</label>
          <input
            type="text"
            className="form-control rounded"
            onChange={(e) => setSeller(e.target.value)}
          />
        </div>
        <div className="mb-3 w-75 mx-auto">
          <label className="form-label">Phone Name</label>
          <input
            type="text"
            className="form-control rounded"
            onChange={(e) => setPhoneName(e.target.value)}
          />
        </div>
        <div className="mb-3 w-75 mx-auto">
          <label className="form-label">Price</label>
          <input
            type="text"
            className="form-control rounded"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="mb-3 w-75 mx-auto">
          <label className="form-label">ImgUrl</label>
          <input
            type="text"
            className="form-control rounded"
            onChange={(e) => setImg(e.target.value)}
            value={img}
          />
        </div>
        <div className="mb-3 w-75 mx-auto">
          <label className="form-label">GB</label>
          <input
            type="text"
            className="form-control rounded"
            onChange={(e) => setGb(e.target.value)}
          />
        </div>
        <div className="mb-3 w-75 mx-auto">
          <label className="form-label">Description</label>
          <input
            type="text"
            className="form-control rounded"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-3 w-75 mx-auto">
          <label className="form-label">Category</label>
          <input
            type="text"
            className="form-control rounded"
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </div>
      <div className="col-md-6  text-center d-flex align-items-center">
        <img src="https://img.freepik.com/free-vector/gradient-mobile-store-logo-design_23-2149697771.jpg" alt="" className="img-fluid" />
      </div>
    </div>
  </div>
  </div>
</form>

  );
};

export default PersonForm;
