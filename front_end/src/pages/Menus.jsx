import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

const Menus=()=>{
    const [menus, setMenus] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchMenus=async()=>{
            try {
                const res=await API.get("items/menus");
                setMenus(res.data);
            } catch (err) {
                setError(err.response?.data.message || "Failed to load menus");
            }
        };
        fetchMenus();
    },[]);
    const handleMenuClick=(menuId)=>{
        navigate(`\menus\${menuId}`);
    };
    return (
        <div className="menus-container">
        <h2>Menus</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <ul>
          {menus.map((menu) => (
            <li key={menu.id} onClick={() => handleMenuClick(menu.id)} style={{ cursor: "pointer" }}>
              {menu.name}
            </li>
          ))}
        </ul>
      </div>
    );
};
export default Menus;