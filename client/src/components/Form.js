import React, { useState } from "react";

const Form = ({ removeForm }) => {
 const [user, setUser] = useState({ title: "", vidurl: "" });

 const handleSubmit = async (e) => {
   e.preventDefault();
   try {
     const body = user;
     const response = await fetch(`/api/v1/videos`, {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify(body)
     });
     setUser(response);
     window.location = "/";
   } catch (error) {
     console.error(error.message)
   }
 };

 const handleChange = (e) => {
   let nameValue = e.target.name;
   let inputValue = e.target.value;
   setUser(prevState => {
     return { ...prevState, [nameValue]: inputValue };
   });
 };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Title
            <input
              type="text"
              className="form-control"
              name="title"
              value={user.title}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            URL
            <input
              type="text"
              className="form-control"
              name="vidurl"
              value={user.vidurl}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <button className="btn btn-danger input" type="button" onClick={() => removeForm()}>
            CANCEL
          </button>
          <button className="btn btn-success input" type="submit">
            ADD
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
