import React from "react";
import usePacientes from "../hooks/usePacientes";
import Paciente from "./Paciente";

function ListPacientes() {
  const { pacientes } = usePacientes();
  return (
    <>
      {pacientes ? (
        <>
          <h2 className="font-black text-3xl text-center">
            Lista de pacientes
          </h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Administra tus{" "}
            <span className="text-indigo-600 font-bold">pacientes y citas</span>
          </p>

          {pacientes.map((paciente) => (
            <Paciente key={paciente._id} paciente={paciente} />
          ))}
        </>
      ) : (
        <>
          <h2 className="font-black text-3xl text-center">No hay pacientes</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Comienza agregando pacientes{" "}
            <span className="text-indigo-600 font-bold">y apareceran aqui</span>
          </p>
        </>
      )}
    </>
  );
}

export default ListPacientes;
