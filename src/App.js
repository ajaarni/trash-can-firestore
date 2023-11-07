import { collection, getDocs, addDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "./firebase";
import {Routes, Route} from "react-router-dom"
import Home from "./Pages/Home"
import Edit from "./Pages/Edit"

function App() {
  return(
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/edit" element={<Edit/>}/>
    </Routes>
  );
}

export default App;
