import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
// import { ToastContainer, toast } from 'react-toastify';

export default function ShoeList(){

    const navigate = useNavigate();

    const [data,setData] = useState([])

    useEffect(()=>{
        let url = 'http://localhost:8000/list-contact'
        fetch (url).then((response)=>{
            return response.json()
        }).then((data)=>{
            console.log(data)
                setData(data)
        }).catch((error)=>{
            console.log(error)
        })
    },[])


    const DeleteContact=async(id) =>{
        // console.log(id)
        let result = await fetch('http://localhost:8000/delete-contact/'+id,{
            method:"DELETE"
        });
        result = await result.json()
        if(result){
           window.location.reload()
        }
    }



    const UpdateContact=(id)=>{
        navigate("/edit/"+id)
    }


    return(
        <><h1>Contact List</h1>
          <table className="table table-bodered">
            
                <thead>
                    <tr>
                        <th>S. No</th>
                        <th>Mobile</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {data.map((item,index)=>{
                        return(
                            <tr key={index}>
                                <td>{index}</td>
                                <td>{item.mobile}</td>
                                <td>{item.email}</td>
                               
                                <td>
                                    <button onClick={()=>{DeleteContact(item._id)}} className="btn btn-outline-danger" >Delete</button>
                                    <button className="btn btn-outline-success" onClick={()=>{UpdateContact(item._id)}} >Edit</button>
                                </td>
                            </tr>
                        )
                })}
                </tbody>
          </table>
        </>
    )
}
