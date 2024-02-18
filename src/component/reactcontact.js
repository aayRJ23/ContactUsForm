import React, { useState } from "react"

const Reactcontact = () => {

    const [formStatus, setFormStatus] = useState('Send')

    const [user , setUser ]= useState({
        name : "",
        email : "",
        phone : "",
        message : ""
    });

    const getUserData = (e) => {
        const { name, value } = e.target;
        
        setUser({
          ...user,
          [name]: value,
        });
    };
     
    const postData = async (e) => {
        e.preventDefault();

        const {name , email , phone , message }= user;

        if(name && email && phone && message)
        {
            setFormStatus("Sending....")

            const res = await fetch('https://contact-form-69ae2-default-rtdb.firebaseio.com/contactdb.json',
            {
                method:"POST",
                headers:{
                    "Content-type":"application/json",
                },
                body : JSON.stringify({
                    name,
                    email,
                    phone ,
                    message ,
                })
            });

            if(res)
            {
                setUser({
                    name : "",
                    email : "",
                    phone : "",
                    message : "",
                });
                setFormStatus("Send")
                alert("Data Stored Successfully");
            }
        }
        else
        {
            alert("Please fill all the fields");
        } 
    }
    
    return (

      <div className="container mt-5">

        <h2 className="mb-3 " style={{textAlign: "center"}}>React Contact Form</h2>

        <form method="POST">

          <div className="mb-3">
            <label className="form-label" htmlFor="name">
              Name
            </label>
            <input className="form-control" type="text" name="name" 
            required placeholder="Enter your name " autoComplete="off"
            value={user.name}
            onChange={getUserData} />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="email">
            Email
            </label>
            <input className="form-control" type="email" name="email" 
            required placeholder="Enter your email " autoComplete="off"
            value={user.email}
            onChange={getUserData}
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="phone">
            Phone Number
            </label>
            <input className="form-control" type="number" name="phone" 
            required placeholder="Enter your phone number " autoComplete="off"
            value={user.phone}
            onChange={getUserData}
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="message">
            Message
            </label>
            <textarea className="form-control" name="message"
            required placeholder="Enter your message " autoComplete="off"
            value={user.message}
            onChange={getUserData}
             />
          </div>

          <button className="btn btn-danger" type="submit" onClick={postData}>
            {formStatus}
          </button>
          
        </form>

      </div>
    )
  }

  export default Reactcontact