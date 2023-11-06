import { collection, getDocs, addDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "./firebase";

function App() {
  const [newItemName, setNewItemName] = useState("");
  const [newMaker, setNewMaker] = useState("");
  const [newQuantity, setQuantity] = useState(0);

  const [inventory, setInventory] = useState([]);
  const inventoryRef = collection(db, "inventory");

  const createItem = async () => {
    await addDoc(inventoryRef, {
      itemname: newItemName,
      manufacturer: newMaker,
      quantity: newQuantity,
    });
  };

  useEffect(() => {
    const getInventory = async () => {
      const items = await getDocs(inventoryRef);
      setInventory(items.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getInventory();
  }, []);

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

      <button type="submit" onClick={createItem}>
        Add Inventory
      </button>

      {inventory.map((inventory) => {
        return (
          <div>
            <h1> Item: {inventory.itemname}</h1>
            <h2> Make: {inventory.manufacturer}</h2>
            <h3> Quantity: {inventory.quantity}</h3>
          </div>
        );
      })}
    </div>
  );
}

export default App;
