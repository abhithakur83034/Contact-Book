import React, { useState } from "react";
import classNames from "classnames";
import { useForm } from 'react-hook-form'
import {ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClockLoader } from "react-spinners";




export default function AddProduct(){
    const {register , handleSubmit ,reset, formState: { errors }  } = useForm();
    const [loading, setLoading] = useState(false)

// ...

const onSubmit = async (data) => {
  try {
    setLoading(true);
    const result = await fetch("http://localhost:8000/register", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
    const allData = await result.json();
    console.log(allData);

    

    // Display success message
    toast.success('Contact Added Successfully', {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    // Reset the form
    reset();
  } catch (error) {
    console.log(error);
    const errorName = error.response.data || "Unknown Error";
    toast.error(`An error occurred during adding contact: ${errorName}`, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  } finally {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }
};

    

       
    
    const date = new Date().toLocaleDateString()
    // console.log(date)
    let cDate = date
    return(
        <>
       <div className="container">
        <div className="row">
            <div className="col-sm-4"></div>

            <div className="col-sm-4">
                <div className="card">
                    <div className="card-title"><h1>Add Contact</h1></div>
           {loading ?
              <div className="spinn-container"
               style={{position:"absolute", top:"200px", left:"100px" }}>
                     <ClockLoader
                       color="#36d7b7"
                       size={98}
                       loading={loading}
                    
                       />
              </div>  :
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                        <ToastContainer/>
                            <p>Name: <br />
                                <input type="text"
                                name="name"
                                className={classNames("form-control", {"is-invalid": errors.name})}
                                placeholder="Enter Name"
                                {...register('name', { required: true }
                                )}
                                />
                            </p>
                            <p>Phone: <br />
                            <input
                                type="number"
                                name="mobile"
                                className={classNames("form-control", {"is-invalid": errors.mobile})}
                                placeholder="Enter Mobile"
                                {...register('mobile', {
                                  minLength: {
                                    value: 8,
                                    message: 'Phone number must be at least 8 digits',
                                  },
                                  maxLength: {
                                    value: 10,
                                    message: 'Phone number cannot exceed 10 digits',
                                  },
                                })}
                              />  {errors.mobile && <span>{errors.mobile.message}</span>}
                                                    
                            </p>

                            <p>Email: <br />
                                <input type="email"
                                name="email"
                                className={classNames("form-control", {"is-invalid": errors.email})}
                                placeholder="Enter Email"
                                {...register('email', { required: true })}
                                />
                            </p>
                            <p>Website: <br />
                                <input type="text"
                                name="website"
                                className={classNames("form-control", {"is-invalid": errors.website})}
                                placeholder="Enter Website"
                                {...register('website', { required: true })}
                                />
                            </p>
                            <p>Date: <br />
                                <input type="text"
                                name="date"
                                 className="form-control"
                                 {...register('date',{value:`${cDate}`})}
                                  />
                            </p>
                          <p>
                          <input type="radio"
                                name="gender"
                                {...register('gender')}
                                value="male" />
                                <label>Male</label>
                                <input type="radio"
                                name="gender" 
                                {...register('gender')}
                                value="female" />
                                <label>Female</label>
                                <input type="radio"
                                name="gender"
                                {...register('gender')}
                                value="other" />
                                <label>Other</label>
                          </p>

                            <input className="btn btn-outline-success" type="submit" value="Add Contact" />
                        </form>
                    </div>
                    }
                </div>
            </div>

            <div className="col-sm-4"></div>
        </div>
       </div>
        </>
    )
}