import React, {useState, useEffect} from 'react';
import {useParams, Link,} from 'react-router-dom';
import axios from 'axios';
import "./View.css";

const View = () => {
    const [user, setUser] = useState({});

    const {id}=useParams();

    useEffect(()=>{
        axios
        .get(`http://localhost:5000/api/get/${id}`)
        .then((resp)=> setUser({ ...resp.data[0]}));
    }, [id]);

  return (
    <div style={{marginTop: "150px"}}>
       <div className='card'>
           <div className='card-header'>
               <p>Bike Bookings</p>
           </div>
           <div className='container'>
               <strong>ID:</strong>
               <span>{id}</span>
               <br/>
               <br/>
               <strong>Bookings:</strong>
               <span>{user.bookings}</span>
               <br/>
               <br/>
               <strong>Availability:</strong>
               <span>{user.availability}</span>
               <br/>
               <br/>               
               <strong>Last Updated:</strong>
               <span>{user.updated_at}</span>
               <br/>
               <br/>
               <Link to="/">
                   <button className="btn btn-edit">Go Back</button>
               </Link>
           </div>
       </div>
    </div>
  )
}

export default View