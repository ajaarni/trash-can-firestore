import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "./firebase";

function App() {
  const [inventorys, setInventory] = useState([]);
  const inventoryRef = collection(db, "inventory");

  useEffect(() => {
    const getInventory = async () => {
      const items = await getDocs(inventoryRef);
      setInventory(items.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getInventory();
  }, []);

  return (
    <div className="App">
      {inventorys.map((inventory) => {
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
