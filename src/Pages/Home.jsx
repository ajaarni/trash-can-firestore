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
import Swal from "sweetalert2";

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
    setNewItemName("");
    setNewMaker("");
    setQuantity(0);
    Swal.fire({
      position: "top-end",
      title: "Inventory Added",
      text:
        "You have added " + newItemName + " to your inventor!",
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });
  };

  const updateItem = async (id, quantity) => {
    const itemDoc = doc(db, "inventory", id);
    const newFeilds = { quantity: quantity + 1 };
    await updateDoc(itemDoc, newFeilds);
  };

  const decrementItem = async (id, quantity) => {
    const itemDoc = doc(db, "inventory", id);
    const newFields = { quantity: quantity - 1 };
    await updateDoc(itemDoc, newFields);
  };

  const deleteItem = async (id) => {
    const itemDoc = doc(db, "inventory", id);
    await deleteDoc(itemDoc);
  };

  useEffect(() => {
    const getInventory = async () => {
      const items = await getDocs(inventoryRef);
      setInventory(items.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    // alert("Running getInventory()")
    getInventory();
  }, [] );

  return (
    <div className="App">
      <input
        placeholder="Item Name"
        value={newItemName}
        onChange={(e) => {
          setNewItemName(e.target.value);
        }}
      />
      <input
        placeholder="Manufacturer"
        value={newMaker}
        onChange={(e) => {
          setNewMaker(e.target.value);
        }}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={newQuantity}
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
                Swal.fire({
                  position: "top-end",
                  title: "Quantity Raised",
                  text:
                    "You have increased the quantity of " +
                    inventory.itemname +
                    " by 1 unit!",
                  icon: "success",
                  showConfirmButton: false,
                  timer: 1500,
                  timerProgressBar: true,
                });
              }}
            >
              Increase Item Quantity
            </button>
            <button
              onClick={() => {
                decrementItem(inventory.id, inventory.quantity);
                Swal.fire({
                  position: "top-end",
                  title: "Quantity Lowered",
                  text:
                    "You have lowered the quantity of " +
                    inventory.itemname +
                    " by 1 unit",
                  icon: "success",
                  showConfirmButton: false,
                  timer: 1500,
                  timerProgressBar: true,
                });
              }}
            >
              {" "}
              Decrease Item Quantity
            </button>
            <button
              onClick={() => {
                navigate("/edit/" + inventory.id);
              }}
            >
              Edit Item
            </button>
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
                    deleteItem(inventory.id);
                    Swal.fire({
                      title: "Deleted!",
                      text: inventory.itemname + " has been deleted.",
                      icon: "success",
                      showConfirmButton: false,
                      timer: 1500,
                      timerProgressBar: true,
                      
                    });
                  }
                });
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
