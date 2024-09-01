import React, { useState } from 'react'
import axios from 'axios';
import PersonList from '../components/PersonList';




const Main = (props) => {
    const [people, setPeople] = useState([]);

    const [user,setUser] = useState(localStorage.getItem('user'))
    
    const removeFromDom = personId => {
        setPeople(people.filter(person => person._id !== personId));
    }

    return (
        <div>
            <PersonList people={people} user={user}  setPeople={setPeople} removeFromDom={removeFromDom} />
           
        </div>
    );
}
export default Main;