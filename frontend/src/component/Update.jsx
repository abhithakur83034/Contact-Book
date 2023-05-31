import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from "react-router-dom";
import classNames from "classnames";


export default function Update() {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const [result, setResult] = useState({});



  const params = useParams();
  // console.log(id)
  const navigate = useNavigate();

  useEffect(() => {
    contactDetails();
  }, []);

  const contactDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8000/updatecontact/${params.id}`);
      console.log(response)
      if (response.ok) {
        const result = await response.json();
        console.log(result)
        setResult(result);
        setValue("name", result.name);
        setValue("mobile", result.mobile);
        setValue("email", result.email);
        setValue("website", result.website);
      } else {
        throw new Error("Error retrieving contact details: " + response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };
  


  const onSubmit = async (data) => {
    try {
      const response = await fetch(`http://localhost:8000/updatecontact/${params.id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(data)
      });
      const result = await response.json();
      console.log(result);
      navigate('/show');
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-4"></div>

          <div className="col-sm-4">
            <div className="card">
              <div className="card-title"><h1>Update Contact</h1></div>
              <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <p>Name: <br />
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      defaultValue={result.name}
                      {...register('name')}
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
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      defaultValue={result.email}
                      {...register('email')}
                    />
                  </p>
                  <p>Website: <br />
                    <input
                      type="text"
                      name="website"
                      className="form-control"
                      defaultValue={result.website}
                      {...register('website')}
                    />
                  </p>

                  <input className="btn btn-outline-success" type="submit" value="Update Contact" />
                </form>
              </div>
            </div>
          </div>

          <div className="col-sm-4"></div>
        </div>
      </div>
    </>
  );
}
