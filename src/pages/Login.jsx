import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";
import clientAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [alerta, setalerta] = useState({});
  const navigate = useNavigate();

  const { setAuth } = useAuth();

  const { msg } = alerta;
  const { email, password } = form;

  const handleChange = (event) => {
    const { value, name } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if ([email, password].includes("")) {
      return setalerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
    }

    try {
      const { data } = await clientAxios.post("/veterinarios/login", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      setAuth(data);

      navigate("/admin");
    } catch (error) {
      setalerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  return (
    <Fragment>
      <div>
        <h1 className="text-indigo-600 font-black text-5xl">
          Inicia Sesion y Administra tus{" "}
          <span className="text-black">Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}

        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="uppercase text-gray-600 text-xl font-bold block">
              Email
            </label>
            <input
              type="email"
              placeholder="correo@correo.com"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 text-xl font-bold block">
              Password
            </label>
            <input
              type="text"
              placeholder="Tu password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </div>

          <input
            type="submit"
            value="Iniciar Sesion"
            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
          />
        </form>

        <nav className="mt-10 lg:flex lg:gap-5">
          <Link
            to="/registrar"
            className="block text-center my-5 text-gray-500"
          >
            ¿No tienes cuenta?
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

export default Login;
