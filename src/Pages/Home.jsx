import React from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const [newItemName, setNewItemName] = useState("");
  const [newMaker, setNewMaker] = useState("");
  const [newQuantity, setQuantity] = useState(0);

  const [inventory, setInventory] = useState([]);
  const inventoryRef = collection(db, "inventory");

  const createItem = async () => {
    await addDoc(inventoryRef, {
      itemname: newItemName,
      manufacturer: newMaker,
      quantity: Number(newQuantity),
    });
  };

  const updateItem = async (id, quantity) => {
    const itemDoc = doc(db, "inventory", id);
    const newFeilds = { quantity: quantity + 1 };
    await updateDoc(itemDoc, newFeilds);
  };

  const deleteItem = async (id) => {
    const itemDoc = doc(db, "inventory", id);
    await deleteDoc(itemDoc)
  };

  useEffect(() => {
    const getInventory = async () => {
      const items = await getDocs(inventoryRef);
      setInventory(items.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getInventory();
  }, [inventoryRef]);

  return (
    <div className="App">
      <input
        placeholder="Item Name"
        onChange={(e) => {
          setNewItemName(e.target.value);
        }}
      />
      <input
        placeholder="Manufacturer"
        onChange={(e) => {
          setNewMaker(e.target.value);
        }}
      />
      <input
        type="number"
        placeholder="Quantity"
        onChange={(e) => {
          setQuantity(e.target.value);
        }}
      />

      <button type="button" onClick={createItem}>
        Add Inventory
      </button>

      {inventory.map((inventory) => {
        return (
          <div>
            <h1> Item: {inventory.itemname}</h1>
            <h3> Make: {inventory.manufacturer}</h3>
            <p> Quantity: {inventory.quantity}</p>
            <button
              onClick={() => {
                updateItem(inventory.id, inventory.quantity);
              }}
            >
              {" "}
              Increase Item Quantity
            </button>
            <button
              onClick={() => {
                navigate("/edit");
              }}
            >
              Edit Item
            </button>
            <button
              onClick={() => {
                deleteItem(inventory.id);
              }}
            >
              {" "}
              Delete Item
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
