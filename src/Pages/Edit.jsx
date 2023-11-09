import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

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

      <h3>Item Name</h3>
      <input
        onChange={(e) => {
          setNewItemName(e.target.value);
        }}
      />

      <h3>Manufacturer</h3>
      <input
        onChange={(e) => {
          setNewMaker(e.target.value);
        }}
      />

      <h3>Quantity</h3>
      <input
        type="number"
        onChange={(e) => {
          setNewQuantity(e.target.value);
        }}
      />

      <button onClick={updateItem}>Save</button>
      <button onClick={() => navigate("/")}>Back</button>
    </div>
  );
}

export default Edit;