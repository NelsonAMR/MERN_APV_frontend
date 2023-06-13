import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clientAxios from "../config/axios";

function OlvidePassword() {
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleChange = (event) => setEmail(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email) {
      return setAlerta({ msg: "El email es obligatorio", error: true });
    }

    try {
      const { data } = await clientAxios.post("/veterinarios/recuperar", {
        email,
      });

      setAlerta({ msg: data.msg });
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
          Recupera tu Acceso y no Pierdas {""}
          <span className="text-black">tus Pacientes</span>
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
              value={email}
              onChange={handleChange}
            />
          </div>

          <input
            type="submit"
            value="Enviar Instrucciones"
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
            ¿No tienes cuenta?
          </Link>
        </nav>
      </div>
    </Fragment>
  );
}

export default OlvidePassword;
