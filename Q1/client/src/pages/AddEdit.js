import React, {useState, useEffect} from 'react';
import {useNavigate, useParams, Link,} from 'react-router-dom';
import './AddEdit.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const initialState={
    darray: "",       
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
        if(!darray){
            toast.error("Please Enter The Discharge Elements");
        }else{
            if(!id){
                axios.post("http://localhost:5000/api/post",{
                darray,                                
            }).then(()=>{
                setState({darray: ""});
            }).catch((err)=>toast.error(err.response.data));
            toast.success("Vehicle Discharge Elements Added Successfully!");            
            }else{
                axios.put(`http://localhost:5000/api/update/${id}`,{
                darray,                               
            }).then(()=>{
                setState({darray: ""});
            }).catch((err)=>toast.error(err.response.data));
            toast.success("Vehicle Discharge Elements Updated Successfully!");            
            }
            setTimeout(()=> navigate("/"),500);
        }
    };
    
    const handelInputChange= (e)=>{
        const {name, value}=e.target;
        setState({ ...state, [name]: value});        
    };

    
    //to avoid using state.darray
    const {darray}=state;
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
        <label htmlFor='name'>Vehicle Discharge Elements</label>
        <input
        type="text"
        id="darray"
        name="darray"
        placeholder="Enter Discharge Elements e.g 2,3,4,1,5"   
        value={darray || ""}     
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