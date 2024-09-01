  import React, { useEffect, useState } from 'react';
  import axios from 'axios';
  import { useParams } from 'react-router-dom';
  import { useNavigate } from 'react-router-dom';
  import { Link } from 'react-router-dom';
  import PaymentModal from './PaymentModal';

  const Detail = (props) => {
    const [person, setPerson] = useState({});
    const [showModal, setShowModal] = useState(false);
    const { id } = useParams();
    const { people, setPeople } = props;
    const navigate = useNavigate();

    useEffect(() => {
      axios.get('http://localhost:8000/api/people/' + id)
        .then(res => {
          console.log(res.data);
          setPerson(res.data);
        })
        .catch(err => console.log(err));
    }, [id]);

    const deletePerson = (personId) => {
      axios.delete(`http://localhost:8000/api/people/${personId}`)
        .then(res => {
          navigate('/');
        })
        .catch(err => console.log(err));
    };

    useEffect(() => {
      axios.get('http://localhost:8000/api/people')
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, [setPeople]);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    return (
      <div className="container mt-5">
        <div className="container mb-4">
          <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm ">
            <div className="container-fluid">
              <a className="navbar-brand fw-bold fs-3" href="#">Phone Shop</a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link to="/" className="nav-link active fs-5 glow-button" aria-current="page">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/people/smartphone" className="nav-link fs-5 glow-button">Smartphones</Link>
                  </li>
                </ul>
                <Link to="/people" className="btn btn-primary btn-lg mx-3 glow-button">Upload Product</Link>
              </div>
            </div>
          </nav>
        </div>

        <div className="card my-4 p-5 mb-4 shadow-lg">
          <div className="card-body d-flex flex-column flex-md-row align-items-center">
            <div className="flex-grow-1">
              <h1 className="card-title display-3">Phone Shop</h1>
              <p className="card-text fs-4"><strong>Seller:</strong> {person.seller}</p>
              <p className="card-text fs-4"><strong>Type:</strong> {person.phoneName}</p>
              <p className="card-text fs-4"><strong>Price:</strong> {person.price}</p>
              <p className="card-text fs-4"><strong>Gb:</strong> {person.gb}</p>
              <p className="card-text fs-4"><strong>Description:</strong> {person.description}</p>
              <p className="card-text fs-4"><strong>Category:</strong> {person.category}</p>
              <div className="mt-4">
                <Link className="btn btn-primary btn-lg me-3 animated-button glow-button" to={`/people/edit/${person._id}`}>Update Product</Link>
                <button className="btn btn-danger btn-lg animated-button glow-button" onClick={() => deletePerson(person._id)}>Delete Product</button>
                <button className="btn btn-success btn-lg animated-button glow-button" onClick={handleShow}>Buy Now</button>
              </div>
            </div>
            <div className="ms-4 mt-4 mt-md-0">
              <img
                className="img-fluid rounded border glow-button"
                style={{ width: '400px', height: '450px' }}
                src={person.img}
                alt="Product"
              />
            </div>
          </div>
        </div>

        <PaymentModal show={showModal} handleClose={handleClose} productPrice={person.price} />
      </div>
    );
  };

  export default Detail;
