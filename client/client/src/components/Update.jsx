import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {
    const { id } = useParams();
    const [seller, setSeller] = useState(""); 
    const [phoneName, setPhoneName] = useState(""); 
    const [price, setPrice] = useState("");
    const [gb, setGb] = useState("");
    const [img, setImg] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/people/${id}`)
            .then(res => {
                setSeller(res.data.seller);
                setPhoneName(res.data.phoneName);
                setPrice(res.data.price);
                setGb(res.data.gb);
                setDescription(res.data.description);
                setCategory(res.data.category);
                setImg(res.data.img);
            })
            .catch(err => console.log(err));
    }, [id]);

    const updatePerson = (e) => {
        e.preventDefault();
        const updateData = {
            seller,
            phoneName, 
            price,
            gb,
            img,
            description,
            category,
        };
        console.log('Update Data:', updateData); 

        axios.put(`http://localhost:8000/api/people/${id}`, updateData)
            .then(res => {
                console.log(res);
                navigate("/");
            })
            .catch(err => {
                console.error('Error:', err);
                if (err.response) {
                    console.error('Response data:', err.response.data); 
                }
            });
    };

    return (
        <div className="container mt-5 ">
            <div className="row justify-content-center ">
                <div className="col-md-8 col-lg-6 ">
                    <div className="card shadow-lg p-4  text-primary-emphasis bg-info-subtle">
                        <h1 className="text-center mb-4">Update List</h1>
                        <form onSubmit={updatePerson}>
                            <div className="form-group ">
                                <label htmlFor="seller">Seller Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="seller"
                                    name="seller"
                                    value={seller}
                                    onChange={(e) => setSeller(e.target.value)}
                                />
                            </div>
                            <div className="form-group ">
                                <label htmlFor="phoneName">Phone Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="phoneName"
                                    name="phoneName"
                                    value={phoneName}
                                    onChange={(e) => setPhoneName(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="price">Price</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="price"
                                    name="price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="img">Image URL</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="img" 
                                    name="img"
                                    value={img} 
                                    onChange={(e) => setImg(e.target.value)} 
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="gb">GB</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="gb"
                                    name="gb"
                                    value={gb}
                                    onChange={(e) => setGb(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    name="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="category">Category</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="category"
                                    name="category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary btn-block glow-button  ">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Update;
