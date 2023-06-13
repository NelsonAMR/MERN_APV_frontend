import React from "react";
import usePacientes from "../hooks/usePacientes";

function Paciente({ paciente }) {
  const { email, fecha, nombre, propietario, sintomas, _id } = paciente;

  const { setEdicion, eliminarPaciente } = usePacientes();

  const formatDate = (fecha) => {
    const newDate = new Date(fecha);

    return new Intl.DateTimeFormat("es-MX", { dateStyle: "long" }).format(
      newDate
    );
  };

  return (
    <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl text-indigo-700">
      <p className="font-bold uppercase my-2">
        Nombre:{" "}
        <span className="font-normal normal-case text-black">{nombre}</span>
      </p>

      <p className="font-bold uppercase my-2">
        Propietario:{" "}
        <span className="font-normal normal-case text-black">
          {propietario}
        </span>
      </p>

      <p className="font-bold uppercase my-2">
        Email:{" "}
        <span className="font-normal normal-case text-black">{email}</span>
      </p>

      <p className="font-bold uppercase my-2">
        Fecha:{" "}
        <span className="font-normal normal-case text-black">
          {formatDate(fecha)}
        </span>
      </p>

      <p className="font-bold uppercase my-2">
        Sintomas:{" "}
        <span className="font-normal normal-case text-black">{sintomas}</span>
      </p>

      <div
        className="flex justify-between my-5"
        onClick={() => setEdicion(paciente)}
      >
        <button className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold uppercase">
          Editar
        </button>

        <button
          className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold uppercase"
          onClick={() => eliminarPaciente(_id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default Paciente;
