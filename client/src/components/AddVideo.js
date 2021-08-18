import React, { useState } from "react";
import Form from "./Form";
import Search from "./Search";

const AddVideo = ({ search, handleSearch }) => {
  const [showForm, setShowForm] = useState(false);
  
  const handleForm = () => {
    setShowForm(true);
  };

  const removeForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="addVideo-container d-flex">
      <div className="add-video text-center">
        <button
          className="btn btn-transparent add-btn"
          onClick={() => handleForm()}
        >
          Add Video
        </button>

        {showForm && (
          <Form removeForm={removeForm} />
        )}
      </div>
      <Search search={search} handleSearch={handleSearch} />
    </div>
  );
};

export default AddVideo;

