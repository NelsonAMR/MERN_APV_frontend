import React, { useState, useEffect } from "react";
import Alerta from "./Alerta";
import usePacientes from "../hooks/usePacientes";

function Form() {
  const [data, setData] = useState({
    nombre: "",
    propietario: "",
    email: "",
    fecha: "",
    sintomas: "",
    id: "",
  });
  const { nombre, propietario, email, fecha, sintomas } = data;
  const [alerta, setAlerta] = useState({});

  const { guardarPaciente, paciente } = usePacientes();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if ([nombre, sintomas, email, fecha, propietario].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });

      return;
    }

    guardarPaciente({ nombre, propietario, email, fecha, sintomas });
    setAlerta({ msg: "Guardado correctamente" });
    setData({
      nombre: "",
      propietario: "",
      email: "",
      fecha: "",
      sintomas: "",
    });
  };

  useEffect(() => {
    if (paciente) {
      setData({ ...data, ...paciente });
    }
  }, [paciente]);

  return (
    <>
      <h2 className="font-black text-3xl text-center">
        Administrador de Pacientes
      </h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Añade tus pacientes y{" "}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>
      {alerta.msg && <Alerta alerta={alerta} />}
      <form
        className="bg-white py-10 px-5 mb-10 md_mb-0 shadow-md rounded-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-5">
          <label htmlFor="nombre" className="text-gray-700 font-bold uppercase">
            Nombre Mascota
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={nombre}
            placeholder="Nombre de la mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            onChange={handleChange}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="propietario"
            className="text-gray-700 font-bold uppercase"
          >
            Nombre Propietario
          </label>
          <input
            type="text"
            value={propietario}
            id="propietario"
            name="propietario"
            placeholder="Nombre del propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            onChange={handleChange}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="text-gray-700 font-bold uppercase">
            Email Propietario
          </label>
          <input
            type="email"
            value={email}
            id="email"
            name="email"
            placeholder="Email del propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            onChange={handleChange}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="fecha" className="text-gray-700 font-bold uppercase">
            Fecha Alta
          </label>
          <input
            type="date"
            id="fecha"
            name="fecha"
            value={fecha}
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            onChange={handleChange}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="sintomas"
            className="text-gray-700 font-bold uppercase"
          >
            Sintomas
          </label>
          <textarea
            placeholder="Describe los sintomas"
            id="sintomas"
            value={sintomas}
            name="sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            onChange={handleChange}
          />
        </div>

        <input
          type="submit"
          value={`${paciente._id ? "Guardar Cambios" : "Agregar Paciente"}`}
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors rounded-md"
        />
      </form>
    </>
  );
}

export default Form;
