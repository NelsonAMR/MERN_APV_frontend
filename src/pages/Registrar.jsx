import React, { Fragment, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clientAxios from "../config/axios";

function Registrar() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    passwordRep: "",
  });

  const [alerta, setAlerta] = useState({});

  const { nombre, email, password, passwordRep } = form;

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if ([nombre, email, password, passwordRep].includes("")) {
      setAlerta({ msg: "Hay campos vacios", error: true });
      return;
    }

    if (password !== passwordRep) {
      setAlerta({ msg: "Passwords diferentes", error: true });
      return;
    }

    if (password.length < 6) {
      setAlerta({ msg: "Password demasiado corto", error: true });
      return;
    }

    setAlerta({});

    try {
      const url = `/veterinarios`;
      await clientAxios.post(url, { nombre, email, password });
      setAlerta({
        msg: "Creado Correctamente",
        error: false,
      });
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <Fragment>
      <div>
        <h1 className="text-indigo-600 font-black text-5xl">
          Crea tu cuenta y administra {""}
          <span className="text-black">tus Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="uppercase text-gray-600 text-xl font-bold block">
              Nombre
            </label>
            <input
              type="text"
              placeholder="Tu nombre"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={nombre}
              name="nombre"
              onChange={handleChange}
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 text-xl font-bold block">
              Email
            </label>
            <input
              type="email"
              placeholder="correo@correo.com"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={email}
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 text-xl font-bold block">
              Password
            </label>
            <input
              type="password"
              placeholder="Tu password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={password}
              name="password"
              onChange={handleChange}
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 text-xl font-bold block">
              Repetir Password
            </label>
            <input
              type="password"
              placeholder="Repite tu password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={passwordRep}
              name="passwordRep"
              onChange={handleChange}
            />
          </div>
          <input
            type="submit"
            value="Crear Cuenta"
            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
          />
        </form>

        <nav className="mt-10 lg:flex lg:gap-5">
          <Link to="/" className="block text-center my-5 text-gray-500">
            ¿Ya tienes cuenta?
          </Link>
          <Link
            to="/olvide-password"
            className="block text-center my-5 text-gray-500"
          >
            Olvide mi Password
          </Link>
        </nav>
      </div>
    </Fragment>
  );
}

export default Registrar;
