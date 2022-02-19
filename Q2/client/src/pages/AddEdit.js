import React, {useState, useEffect} from 'react';
import {useNavigate, useParams, Link,} from 'react-router-dom';
import './AddEdit.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const initialState={
    bookings: "",       
};

const AddEdit = () => {
    //define state
    const [state, setState]= useState(initialState);

    const navigate = useNavigate();

    const {id}= useParams();

    useEffect(()=>{
        axios
        .get(`http://localhost:5000/api/get/${id}`)
        .then((resp)=> setState({ ...resp.data[0]}));
    }, [id]);

    const handleSubmit= (e)=>{
        e.preventDefault();
        if(!bookings){
            toast.error("Please Enter Bookings");
        }else{
            if(!id){
                axios.post("http://localhost:5000/api/post",{
                bookings,                                
            }).then(()=>{
                setState({bookings: ""});
            }).catch((err)=>toast.error(err.response.data));
            toast.success("Bike Bookings Added Successfully!");            
            }else{
                axios.put(`http://localhost:5000/api/update/${id}`,{
                bookings,                               
            }).then(()=>{
                setState({bookings: ""});
            }).catch((err)=>toast.error(err.response.data));
            toast.success("Bike Bookings Updated Successfully!");            
            }
            setTimeout(()=> navigate("/"),500);
        }
    };
    
    const handelInputChange= (e)=>{
        const {name, value}=e.target;
        setState({ ...state, [name]: value});        
    };

    
    //to avoid using state.bookings
    const {bookings}=state;
  return (
    <div style={{marginTop: "100px"}}>
        <form style={{
            margin: "auto",
            padding: "15px",
            maxWidth: "400px",
            alignContent: "center"
        }}
        onSubmit={handleSubmit}
        >
        <label htmlFor='name'>Bike Bookings</label>
        <input
        type="text"
        id="bookings"
        name="bookings"
        placeholder="Enter Bike Bookings e.g [1,4],[2,5],[7,9]"   
        value={bookings || ""}     
        onChange={handelInputChange}         
        />      
       
        <input type="submit" value={id ? "Update" : "Save"}/>       
        <Link to="/">
            <input type="button" value="Go Back"/>
        </Link>

        </form>
        
    </div>
  )
}

export default AddEdit