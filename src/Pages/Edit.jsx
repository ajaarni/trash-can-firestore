import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

function Edit() {
  const navigate = useNavigate();
  const docID = useParams();
  const [data, setData] = useState([]);
  const docRef = doc(db, "inventory", docID.itemID);
  const [newItemName, setNewItemName] = useState("");
  const [newMaker, setNewMaker] = useState("");
  const [newQuantity, setNewQuantity] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const docSnap = await getDoc(docRef);
      setData(docSnap.data());
    };
    getData();
  }, []);

  const updateItem = async (itemname, maker, quantity) => {
    const itemDoc = doc(db, "inventory", docRef);
    const newFeilds = {
      itemname: newItemName,
      manufacturer: newMaker,
      quantity: newQuantity,
    };
    await updateDoc(itemDoc, newFeilds);
  };

  return (
    <div>
      <h1>Edit Item</h1>

      <input
        onChange={(e) => {
          setNewItemName(e.target.value);
        }}
        placeholder={data.itemname}
      />
      <input
        onChange={(e) => {
          setNewMaker(e.target.value);
        }}
        placeholder={data.manufacturer}
      />
      <input
        onChange={(e) => {
          setNewQuantity(e.target.value);
        }}
        placeholder={data.quantity}
      />

      <button
        // onClick={updateItem(docID.itemID, data.itemname, data.manufacturer, data.quantity)}
      >
        Save
      </button>

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
