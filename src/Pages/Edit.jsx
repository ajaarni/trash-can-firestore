import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import Swal from "sweetalert2";

function Edit() {
  const navigate = useNavigate();
  const { itemID } = useParams();
  const [data, setData] = useState({});
  const docRef = doc(db, "inventory", itemID);

  const [newItemName, setNewItemName] = useState("");
  const [newMaker, setNewMaker] = useState("");
  const [newQuantity, setNewQuantity] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const docSnap = await getDoc(docRef);
      setData(docSnap.data());
    };
    getData();
  }, [docRef]);

  const updateItem = async () => {
    const itemDoc = doc(db, "inventory", itemID);
    const newFields = {
      itemname: newItemName,
      manufacturer: newMaker,
      quantity: Number(newQuantity),
    };
    await updateDoc(itemDoc, newFields);
    navigate("/");
  };

  return (
    <div>
      <h1>Edit Item</h1>

      <h3>{data.itemname}</h3>
      <input
        placeholder="New Item Name"
        onChange={(e) => {
          setNewItemName(e.target.value);
        }}
      />

      <h3>{data.manufacturer}</h3>
      <input
        placeholder="New Make"
        onChange={(e) => {
          setNewMaker(e.target.value);
        }}
      />

      <h3>{data.quantity}</h3>
      <input
        type="number"
        placeholder="New Quantity"
        onChange={(e) => {
          setNewQuantity(e.target.value);
        }}
      />

      <button 
        onClick={() => {
          Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm",
          }).then((result) => {
            if (result.isConfirmed) {
              updateItem();
              Swal.fire({
                title: "Item Updated!",
                text:  data.itemname + " has been Updated.",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                
              });
            }
          });
        }}
      >Save</button>
      <button onClick={() => navigate("/")}>Back</button>
    </div>
  );
}

export default Edit;