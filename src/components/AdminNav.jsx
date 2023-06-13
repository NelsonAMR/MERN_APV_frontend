import React from "react";
import { Link } from "react-router-dom";

function AdminNav() {
  return (
    <nav className="flex gap-3">
      <Link to="/admin/perfil" className="font-bold uppercase text-gray-500">
        Perfil
      </Link>
      <Link
        to="/admin/cambiar-pass"
        className="font-bold uppercase text-gray-500"
      >
        Cambiar Password
      </Link>
    </nav>
  );
}

export default AdminNav;
