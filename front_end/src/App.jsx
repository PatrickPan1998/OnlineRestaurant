import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Login from './pages/Login';
import Menus from './pages/Menus';
import { Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  return (
      <Routes>
        <Route path = "/" element={<Login />}/>
        <Route path="/items" element={<Menus />} />
      </Routes>
  )
}

export default App;
