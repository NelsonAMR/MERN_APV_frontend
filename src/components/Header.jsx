import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Header() {
  const { cerrarSesion } = useAuth();

  return (
    <header className="p-10 bg-indigo-600">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <h1 className="font-bold text-xl text-center text-indigo-200 mb-5 lg:mb-0">
          Administrador de pacientes de{" "}
          <span className="text-white font-black">Veterinaria</span>
        </h1>

        <nav className="flex gap-4 flex-col lg:flex-row items-center">
          <Link to="/admin" className="text-white uppercase font-bold text-sm">
            Pacientes
          </Link>
          <Link
            to="/admin/perfil"
            className="text-white  text-sm font-bold uppercase"
          >
            Perfil
          </Link>

          <button
            className="text-white  text-sm font-bold uppercase"
            type="button"
            onClick={cerrarSesion}
          >
            Cerrar Sesion
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
