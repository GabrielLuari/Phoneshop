import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Smartphone() {
    const [people, setPeople] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8000/api/people")
            .then(res => {
                console.log(res.data);
                setPeople(res.data);
            })
            .catch(err => console.log(err));
          
    }, []);

    const deletePerson = (personId) => {
        axios.delete(`http://localhost:8000/api/people/smartphone/${personId}`)
            .then(res => {
                setPeople(people.filter(person => person._id !== personId));
            })
            .catch(err => console.log(err));
    }

    return (
       
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {people.map((person) => (
                    <div key={person._id} className="col">
                        <div className="card shadow rounded">
                        <img src={person.img} className="img-fluid rounded-start" alt={person.phoneName} style={{ height: '330px', objectFit: 'cover', width: '100%' }} />
                            
                            <div className="card-body">
                                <h5 className="card-title">{person.phoneName}</h5>
                                <p className="card-text">{person.price}</p>
                            </div>
                            <div className="card-footer d-flex justify-content-between">
                                <Link to={`/people/${person._id}`} className="btn btn-outline-primary glow-button">View profile</Link>
                      
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        
    );
}


export default Smartphone   