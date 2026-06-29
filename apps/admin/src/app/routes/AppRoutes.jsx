import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Admin from "../../pages/Admin";
import Login from "../../pages/Login";
import Home from "../../pages/Home";
import Gerenciamento from "../../pages/Gerenciamento";
import Teste from "../../pages/Teste";

function AppRoutes() {
  const [user, setUser] = useState(null); // Estado do usuário

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/gerenciamento" element={<Gerenciamento />} />
        <Route path="/teste" element={<Teste />} />
        <Route path="/" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
