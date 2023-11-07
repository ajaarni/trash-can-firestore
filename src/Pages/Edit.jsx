import React from "react";
import { useNavigate } from "react-router-dom";

function Edit() {
  const navigate = useNavigate();
  return (
    <div>
      <p>On this page will be a form that will update the database based on the item loaded</p>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Back 
      </button>
    </div>
  );
}

export default Edit;
