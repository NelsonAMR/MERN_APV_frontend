import React, { useState } from "react";
import ListPacientes from "../components/ListPacientes";
import Form from "../components/Form";

function AdministrarPacientes() {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="flex flex-col md:flex-row">
      <button
        className="bg-indigo-600 text-white font-bold uppercase p-3 mx-10 rounded-md mb-10 md:hidden"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Ocultar Formulario" : "Mostrar Formulario"}
      </button>
      <div
        className={`${
          showForm ? "block" : "hidden"
        } md:w-1/2 lg:w-2/5 md:block`}
      >
        <Form />
      </div>
      <div className="md:w-1/2 lg:w-3/5">
        <ListPacientes />
      </div>
    </div>
  );
}

export default AdministrarPacientes;
